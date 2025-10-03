import {Task} from "./Task";
import {LocalStorageRepo} from "../Infra/LocalStorageRepo";

export class Tasks extends Array<Task> {
}

export let tasks = new Tasks();
export default tasks;

const localStorageRepo = new LocalStorageRepo();

function refreshTasks() {
    tasks = new Tasks();
    localStorageRepo.getAll().forEach(task => tasks.push(task));
}


export function getTask(title: string): Task | undefined {
    refreshTasks();
    return tasks.find(task => task.title === title);
}

export function getTaskByUUID(uuid: string): Task | undefined {
    refreshTasks();
    return tasks.find(task => task.uuid === uuid);
}

export function getTasks(): Array<Task> {
    refreshTasks();
    return tasks;
}

export function DOMaddTask(task: Task) {
    tasks.push(task);
    localStorageRepo.save(task);
}

export function DOMremoveTask(task: Task) {
    tasks.splice(tasks.indexOf(task), 1);
    localStorageRepo.remove(task.uuid);
}

export function DOMupdateTask(task: Task) {
    const index = tasks.findIndex(t => t.uuid === task.uuid);
    if (index !== -1) {
        tasks[index] = task;
        localStorageRepo.save(task);
    }
}