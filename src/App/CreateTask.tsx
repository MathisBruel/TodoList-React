import {tasks} from '../Domain/Tasks';
import {CreateTask, isValid, Task} from '../Domain/Task';

export function createTask(title: string, description?: string, deadlineDate?: Date) : Task | undefined{
    if(!isValid(title, description, deadlineDate)) return undefined;
    const task : Task = CreateTask(title, description, deadlineDate);
    tasks.push(task);
    return task;
}
