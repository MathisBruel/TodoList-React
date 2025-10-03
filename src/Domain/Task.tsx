import {getTask} from "./Tasks";
import {StateType} from "./StateType";

export interface Task {
    uuid: string;
    title: string;
    state: StateType;
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
        state: StateType.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadlineDate
    };
}