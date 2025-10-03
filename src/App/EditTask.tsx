import {Task} from "../Domain/Task";
import {StateType} from "../Domain/StateType";
import {DOMupdateTask} from "../Domain/Tasks";

export function editTitle(task: Task, newTitle: string): Task | undefined {
    if (!newTitle || newTitle.trim() === "") return undefined;
    task.title = newTitle;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

export function editDescription(task: Task, newDescription?: string): Task {
    task.description = newDescription;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

export function editDeadlineDate(task: Task, newDeadlineDate?: Date): Task {
    task.deadlineDate = newDeadlineDate;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

export function editStatus(task: Task, newStatus: StateType): Task {
    task.state = newStatus;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

