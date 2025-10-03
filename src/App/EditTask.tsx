import {isDescriptionValid, isTitleValid, isValid, Task} from "../Domain/Task";
import {StateType} from "../Domain/StateType";
import {DOMupdateTask} from "../Domain/Tasks";

export function editTitle(task: Task, newTitle: string): Task | undefined {
    if (!isTitleValid(newTitle)) return undefined;
    task.title = newTitle;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

export function editDescription(task: Task, newDescription?: string): Task | undefined{
    if(!isDescriptionValid(newDescription)) return undefined;
    task.description = newDescription;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

export function editDeadlineDate(task: Task, newDeadlineDate?: Date): Task | undefined {
    // Permettre de définir ou supprimer la date (undefined est accepté)
    task.deadlineDate = newDeadlineDate;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}

export function editStatus(task: Task, newStatus: StateType): Task | undefined {
    if(!isValid(task.title, task.description, task.deadlineDate)) return undefined;
    task.state = newStatus;
    task.updatedAt = new Date();
    DOMupdateTask(task);
    return task;
}
