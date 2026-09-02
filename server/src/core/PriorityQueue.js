import dataGroup from "./QueueManager.js";

export class PriorityQueue {
    constructor(agingThresholdMs = 60000) {
        this.highQueue = [];
        this.lowQueue = [];
        this.agingThresholdMs = agingThresholdMs; // Bump low priority after 1 minute
    }

    enqueue(taskId, priority) {
        if (priority === 'high') {
            this.highQueue.push({ id: taskId, timestamp: Date.now() });
        } else {
            this.lowQueue.push({ id: taskId, timestamp: Date.now() });
        }
    }

    dequeue() {
        this.ageTasks(); // Promote starved tasks first

        if (this.highQueue.length > 0) {
            return this.highQueue.shift();
        }
        if (this.lowQueue.length > 0) {
            return this.lowQueue.shift();
        }
        return null; // Queue is empty
    }

    ageTasks() {
        const now = Date.now();
        //console.log(this.lowQueue[0]);
        while (

            this.lowQueue.length > 0 &&
            (now - dataGroup.getTask(this.lowQueue[0].id)?.createdAt
                > this.agingThresholdMs)
            ) {
            const starvedTask = this.lowQueue.shift(); // Remove from front of low
            this.highQueue.push(starvedTask);          // Add to back of high
        }
    }

    getSnapshot() {
        return [...this.highQueue, ...this.lowQueue];
    }
}

