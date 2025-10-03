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
    if (!isTitleValid(title)) return false;
    if (!isDescriptionValid(description)) return false;
    if (!isDeadlineValid(deadlineDate)) return false;
    return !getTask(title);
}

export function isTitleValid(title: string): boolean {
    return title.trim().length >= 3;
}

export function isDescriptionValid(description?: string): boolean {
    if (!description || description.trim().length === 0) return true;
    return description.trim().length >= 3;
}

export function isDeadlineValid(deadlineDate?: Date): boolean {
    if (!deadlineDate) return true;
    return deadlineDate > new Date();
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

export function getValidationError(title: string, description?: string, deadlineDate?: Date): string | null {
    if (!isTitleValid(title)) {
        return `Le titre doit contenir au moins 3 caractères (actuellement: ${title.trim().length})`;
    }
    if (!isDescriptionValid(description)) {
        return `La description doit contenir au moins 3 caractères (actuellement: ${description?.trim().length || 0})`;
    }
    if (!isDeadlineValid(deadlineDate)) {
        return `La date limite doit être dans le futur (actuellement: ${deadlineDate?.toLocaleDateString('fr-FR') || 'non définie'})`;
    }
    if (getTask(title)) {
        return `Une tâche avec le titre "${title}" existe déjà`;
    }
    return null; // Aucune erreur
}
