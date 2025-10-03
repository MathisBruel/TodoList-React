import {DOMaddTask, tasks} from '../Domain/Tasks';
import {DOMcreateTask, isValid, Task} from '../Domain/Task';

export function createTask(title: string, description?: string, deadlineDate?: Date): Task | undefined {
    if (!isValid(title, description, deadlineDate)) return undefined;
    const task: Task = DOMcreateTask(title, description, deadlineDate);
    DOMaddTask(task)
    return task;
}
