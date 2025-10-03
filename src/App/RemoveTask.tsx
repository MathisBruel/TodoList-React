import {getTask, DOMremoveTask, tasks} from '../Domain/Tasks';

/**
 * Supprime une tâche via la couche Domaine
 * @param title Titre de la tâche
 */
export function removeTask(title: string) {
    const task = getTask(title);
    console.log(task);
    if (!task) return;
    DOMremoveTask(task)
}
