import { Task } from "./Task";
import {LocalStorageRepo} from "../Infra/LocalStorageRepo";

export class Tasks extends Array<Task> {}
export const tasks = new Tasks();
export default tasks;

const localStorageRepo = new LocalStorageRepo();

function refreshTasks() {
    localStorageRepo.getAll().forEach(task => tasks.push(task));
}

export function getTask(title : string) : Task | undefined {
    refreshTasks();
    return tasks.find(task => task.title === title);
}

export function getTasks() : Array<Task> {
    refreshTasks();
    return tasks;
}

export function addTask(task : Task) {
    tasks.push(task);
    localStorageRepo.save(task);
}

export function rmTask(task : Task) {
    tasks.splice(tasks.indexOf(task), 1);
    localStorageRepo.remove(task.uuid);
}



