export interface Task {
    uuid: string;
    title: string;
    isDone: boolean;
    descritpion?: string;
    deadlineDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function TaskComponent({ task }: { task: Task }) {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.descritpion}</p>
            <p>Status: {task.isDone ? "Done" : "Pending"}</p>
            <p>Created At: {task.createdAt.toLocaleString()}</p>
            {task.deadlineDate && <p>Deadline: {task.deadlineDate.toLocaleString()}</p>}
        </div>
    );
}

export function CreateTask(title: string, description?: string, deadlineDate?: Date): Task {
    return {
        uuid: crypto.randomUUID(),
        title,
        descritpion: description,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadlineDate
    };
}