import tasks, {getTasks} from "../../Domain/Tasks";
import {TaskComponent} from "./TaskComponent";

export function ShowTodos() {
    console.log(tasks)
    return (
        <div className="show-todos">
            <h2>Liste des Todos</h2>

            <table>
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Date limite</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {getTasks().map(task => (
                        <TaskComponent key={task.uuid} task={task}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}