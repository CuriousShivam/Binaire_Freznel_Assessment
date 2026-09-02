// import {PriorityQueue} from "./PriorityQueue.js";
// import {QueueManager} from "./QueueManager.js";
// import {WorkerPool} from "./WorkerPool.js";
//
// export class DataGroup {
//     constructor() {
//         // this.allTasks = new Map(); //for taskId's with task object
//         this.userTasksMap = new Map();//for userId and taskId's key value pair
//         this.activeUsers = new Set();//for active users uuid
//         this.priorityQueue = new PriorityQueue();//for priority queue(high and low priority tasks)
//         this.queueManager = new QueueManager();//for queue management
//         this.workerPool = new WorkerPool();//for worker management
//     }
//
//     // --- Task Methods ---
//     // addTask(task) {
//     //     this.allTasks.set(task.id, task);
//     //     task.updateStatus('3. File added to queue');
//     //     this.priorityQueue.enqueue(task.id, task.priority);
//     //
//     //     if (!this.userTasksMap.has(task.userId)) {
//     //         this.userTasksMap.set(task.userId, new Set());
//     //     }
//     //     this.userTasksMap.get(task.userId).add(task.id);
//     // this.broadcastState();
//     //this.processNext();
//     // }
//
//     // getTask(taskId) {
//     //     return this.allTasks.get(taskId);
//     // }
//
//     // getUserTasks(userId) {
//     //     const taskIds = this.userTasksMap.get(userId) || new Set();
//     //     return Array.from(taskIds).map(id => this.allTasks.get(id));
//     // }
//
//     // getAllTasksList() {
//     //     return Array.from(this.allTasks.values());
//     // }
//
//     // --- User Methods  ---
//     registerUser(userId) {
//         this.activeUsers.add(userId);
//     }
//
//     hasUser(userId) {
//         return this.activeUsers.has(userId);
//     }
// }
//
// const dataGroup = new DataGroup();
//
// export default dataGroup;