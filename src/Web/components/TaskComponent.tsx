import {Task} from "../../Domain/Task";

export function TaskComponent({task}: { task: Task }) {
    return (
        <tr className="task-row">
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.deadlineDate ? task.deadlineDate.toLocaleString() : "—"}</td>
            <td>
                <button
                    className={`button${task.isDone ? ' done' : ''}`}
                    onClick={() => task.isDone = !task.isDone}
                >
                    {task.isDone ? "Terminé" : "En attente"}
                </button>
            </td>
            <td>
                <button className="button" onClick={() => alert("WIP ...")}>Modifier</button>
                <button className="button delete" onClick={() => alert("WIP ...")}>Supprimer</button>
            </td>
        </tr>
    );
}