import {WorkerPool} from "./WorkerPool.js";
import {PriorityQueue} from "./PriorityQueue.js";

class QueueManager {
    constructor() {
        // this.socketManager = socketManager;
        this.activeUsers = new Set();//for active users uuid
        this.queue = new PriorityQueue();
        this.pool = new WorkerPool();
        this.allTasks = new Map(); // for taskId's with task object
        this.userTasksMap = new Map(); //for userId and taskId's key value pair
    }

    addTask(task) {
        this.allTasks.set(task.id, task);
        task.updateStatus('3. File added to queue');
        this.queue.enqueue(task.id, task.priority);
        //checks if userid exists in userTaskMap
        //if not exist create new set
        //then add taskId using existing userid
        if (!this.userTasksMap.has(task.userId)) {
            this.userTasksMap.set(task.userId, new Set());
        }
        this.userTasksMap.get(task.userId).add(task.id);
        this.processNext();
    }

    getUserTasks(userId) {
        const taskIds = this.userTasksMap.get(userId) || new Set();
        return Array.from(taskIds).map(id => this.allTasks.get(id));
    }

    getTask(taskId) {
            console.log('called getTask ' + taskId + ' ' +this.allTasks.get(taskId));
            return this.allTasks.get(taskId);
    }

    getAllTasksList() {
        return Array.from(this.allTasks.values());
    }

    registerUser(userId) {
        this.activeUsers.add(userId);
    }

    hasUser(userId) {
        return this.activeUsers.has(userId);
    }

    processNext() {
        console.log('processNext called')
        if (!this.pool.isAvailable()) return;

        const task = this.queue.dequeue();
        if (!task) return;

        const taskObj = this.getTask(task.id);
        taskObj.updateStatus('4. Waiting for processing');

        this.pool.runTask(taskObj, {
            onProgress: (id, percent) => {
                const t = taskObj;
                t.updateProgress(percent);
                t.updateStatus(`5. Processing... (${percent}%)`);
            },
            onComplete: (id, resultSum) => {
                const t = taskObj;
                t.resultSum = resultSum;
                t.updateStatus('6. Completed');

                // Alert specific user their file is ready
                // this.socketManager.emitToUser(t.userId, 'fileReady', t.toDTO());
                this.processNext(); // Keep the loop going
            },
            onError: (id, err) => {
                console.error(`Task ${id} Failed:`, err); // Actually look at the error!
                taskObj.updateStatus('Failed');
                this.processNext();
            }
        });
    }

    
}

const queueManager = new QueueManager();

export default queueManager;