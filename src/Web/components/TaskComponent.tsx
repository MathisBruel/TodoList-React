import {Task} from "../../Domain/Task";

export function TaskComponent({task}: { task: Task }) {
    return (
        <>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
                <button onClick={() => task.isDone = !task.isDone}>
                    {task.isDone ? "Terminé" : "En attente"}
                </button>
            </td>
            <td>{task.createdAt.toLocaleString()}</td>
            {task.deadlineDate && (
                <td>{task.deadlineDate.toLocaleString()}</td>
            )}
            <td>
                <button onClick={() => alert("WIP ...")}>Modifier</button>
                <button onClick={() => alert("WIP ...")}>Supprimer</button>
            </td>

        </>
    );
}