import fs from 'fs';

// Set your target size here (5KB = 5 * 1024 bytes)

function generateCsv(size) {

const TARGET_SIZE_BYTES = size * 1024;
const FILE_NAME = 'test_5kb.csv';

const stream = fs.createWriteStream(FILE_NAME);
let currentSizeBytes = 0;

console.log(`Generating ${TARGET_SIZE_BYTES} bytes of CSV data...`);

while (currentSizeBytes < TARGET_SIZE_BYTES) {
    // Generate a random number of columns (between 4 and 10) for this row to vary the rank
    const numCols = Math.floor(Math.random() * 7) + 4;
    const rowArray = [];

    for (let i = 0; i < numCols; i++) {
        // Randomly mix integers and floats
        if (Math.random() > 0.5) {
            rowArray.push(Math.floor(Math.random() * 10000));
        } else {
            rowArray.push((Math.random() * 1000).toFixed(4));
        }
    }

    const rowString = rowArray.join(',') + '\n';

    // Write to stream and track exact byte size
    stream.write(rowString);
    currentSizeBytes += Buffer.byteLength(rowString, 'utf8');
}

stream.end();
console.log(`✅ Success! Created ${FILE_NAME} at approximately ${currentSizeBytes} bytes.`);
}

export {generateCsv};