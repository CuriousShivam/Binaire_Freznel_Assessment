import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import readline from 'readline';

// We receive the absolute file path from the QueueManager
const { filePath } = workerData;

async function processCSV() {
    try {
        console.log('running ProcessCSV');
        // 1. Get total file size to calculate progress accurately
        const stats = fs.statSync(filePath);
        const totalBytes = stats.size;

        let bytesRead = 0;
        let totalSum = 0;
        let lastReportedProgress = 0;

        // 2. Create the read stream
        const fileStream = fs.createReadStream(filePath);

        // Track the bytes as they flow in from the hard drive
        fileStream.on('data', (chunk) => {
            bytesRead += chunk.length;
        });

        // 3. Process line-by-line using native readline
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Handles both Windows (\r\n) and Linux (\n) line endings
        });

        for await (const line of rl) {
            if (!line.trim()) continue; // Skip empty trailing lines

            // Split the row by commas (handles varying column sizes natively)
            const values = line.split(',');

            for (const val of values) {
                // parseFloat handles both integers and floats seamlessly
                const num = parseFloat(val);
                if (!isNaN(num)) {
                    totalSum += num;
                }
            }

            // 4. Calculate progress
            const currentProgress = Math.floor((bytesRead / totalBytes) * 100);

            // 🚨 CRITICAL OPTIMIZATION: Throttle IPC Messages
            // Sending a message to the main thread on every single line will lock up the CPU.
            // We only emit progress to the main thread if it has increased by at least 5%.
            if (currentProgress > lastReportedProgress) {
                if (currentProgress % 5 === 0 || currentProgress === 100) {
                    lastReportedProgress = currentProgress;
                    parentPort.postMessage({ type: 'progress', value: currentProgress });
                }
            }
        }

        // 5. Clean up and send final payload
        parentPort.postMessage({ type: 'complete', value: totalSum });

    } catch (error) {
        // Catch file read errors or missing files
        parentPort.postMessage({ type: 'error', error: error.message });
    }
}

// Start execution
processCSV();