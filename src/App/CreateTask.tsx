import {tasks} from '../Domain/Tasks';
import {CreateTask} from '../Domain/Task';

export function createTask(title: string, description?: string, deadlineDate?: Date) {
    const task = CreateTask(title, description, deadlineDate);
    tasks.push(task);
    return task;
}
