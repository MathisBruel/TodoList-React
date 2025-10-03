import {getTask, tasks} from '../Domain/Tasks';

/**
 * Supprime une tâche via la couche Domaine
 * @param title Titre de la tâche
 */
export function removeTask(title: string) {
    const task = getTask(title);
    tasks.splice(tasks.indexOf(task!), 1);
}
