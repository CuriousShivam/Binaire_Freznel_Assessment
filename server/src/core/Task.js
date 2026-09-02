export class Task {
    constructor(id, userId, fileName, filePath, priority) {
        this.id = id;
        this.userId = userId;
        this.fileName = fileName;
        this.filePath = filePath;
        this.priority = priority; // 'high' or 'low'
        this.status = 'uploaded'; // 2. File uploaded
        this.progress = 0;
        this.resultSum = null;
        this.createdAt = Date.now();
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    updateProgress(percentage) {
        this.progress = percentage;
    }

    // Strips sensitive server paths before sending to clients
    toDTO() {
        return {
            id: this.id,
            userId: this.userId,
            fileName: this.fileName,
            priority: this.priority,
            status: this.status,
            progress: this.progress,
            resultSum: this.resultSum
        };
    }
}