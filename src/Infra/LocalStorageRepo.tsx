import {Task} from '../Domain/Task';

export interface ITaskRepo {
    save(task: Task): void;

    getAll(): Task[];

    remove(id: string): void;
}

export class LocalStorageRepo implements ITaskRepo {
    save(task: Task): void {
        localStorage.setItem(task.uuid, JSON.stringify(task));
    }

    getAll(): Task[] {
        const tasks: Task[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            try {
                const item = localStorage.getItem(key);
                if (!item) continue;
                const parsed = JSON.parse(item);
                if (parsed && parsed.uuid) {
                    // Correction du type pour state et des dates
                    parsed.state = parsed.state as import('../Domain/StateType').StateType;
                    if (parsed.deadlineDate) parsed.deadlineDate = new Date(parsed.deadlineDate);
                    parsed.createdAt = new Date(parsed.createdAt);
                    parsed.updatedAt = new Date(parsed.updatedAt);
                    tasks.push(parsed as Task);
                }
            } catch (e) {
                continue;
            }
        }
        return tasks;
    }

    remove(uuid: string): void {
        localStorage.removeItem(uuid);
    }
}
