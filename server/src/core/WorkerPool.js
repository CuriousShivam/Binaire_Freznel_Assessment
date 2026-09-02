import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
// Calculate the actual directory of WorkerPool.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class WorkerPool {
    constructor() {
        // Leave one core free for the main event loop
        this.maxWorkers = Math.max(1, os.cpus().length - 1);
        console.log("OS CPU's Length: ",os.cpus().length)
        this.activeWorkers = new Map();
    }

    isAvailable() {
        return this.activeWorkers.size < this.maxWorkers;
    }

    runTask(task, callbacks) {
        const workerPath = path.resolve(__dirname, '../workers/csvWorker.js');
        const worker = new Worker(workerPath, { workerData: { filePath: task.filePath } });

        this.activeWorkers.set(task.id, worker);

        worker.on('message', (msg) => {
            if (msg.type === 'progress') callbacks.onProgress(task.id, msg.value);
            if (msg.type === 'complete') {
                this.releaseWorker(task.id);
                callbacks.onComplete(task.id, msg.value);
            }
            // ADD THIS: Catch custom internal worker errors
            if (msg.type === 'error') {
                this.releaseWorker(task.id);
                callbacks.onError(task.id, msg.error);
            }
        });

        worker.on('error', (err) => {
            this.releaseWorker(task.id);
            callbacks.onError(task.id, err);
        });
    }

    releaseWorker(taskId) {
        this.activeWorkers.delete(taskId);
    }
}