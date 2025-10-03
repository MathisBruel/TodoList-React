import {getTask} from "./Tasks";

export interface Task {
    uuid: string;
    title: string;
    isDone: boolean;
    description?: string;
    deadlineDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}


export function isValid(title: string, description?: string, deadlineDate?: Date): boolean {
    if (title.trim().length < 3) return false;
    if (description && description.trim().length < 3) return false;
    if (deadlineDate && deadlineDate < new Date()) return false;
    return !getTask(title);

}

export function DOMcreateTask(title: string, description?: string, deadlineDate?: Date): Task {
    return {
        uuid: crypto.randomUUID(),
        title,
        description,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadlineDate
    };
}