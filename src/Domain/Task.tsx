export interface Task {
    uuid: string;
    title: string;
    isDone: boolean;
    descritpion?: string;
    deadlineDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

