import {Task} from "../Domain/Task";
import {StateType} from "../Domain/StateType";

export function editTitle(task: Task, newTitle: string): Task | undefined {
    if (!newTitle || newTitle.trim() === "") return undefined;
    task.title = newTitle;
    return task;
}

export function editDescription(task: Task, newDescription?: string): Task {
    task.description = newDescription;
    return task;
}

export function editDeadlineDate(task: Task, newDeadlineDate?: Date): Task {
    task.deadlineDate = newDeadlineDate;
    return task;
}

export function editStatus(task: Task, newStatus: StateType): Task {
    task.state = newStatus;
    return task;
}

