import { Task } from "./Task";

export class Tasks extends Array<Task> {}
export const tasks = new Tasks();
export default tasks;

export function getTask(title : string) : Task | undefined {
    return tasks.find(task => task.title === title);
}



