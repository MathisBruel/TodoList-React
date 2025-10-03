import React, {useState} from "react";
import {CreationForms} from "./components/CreationForms";
import {ShowTodos} from "./components/ShowTodos";
import {getTasks} from "../Domain/Tasks";
import {createTask} from "../App/CreateTask";
import {removeTask} from "../App/RemoveTask";

function App() {
    const [tasks, setTasks] = useState(getTasks());

    // Rafraîchit la liste des tâches depuis le domaine
    const refreshTasks = () => {
        setTasks(getTasks());
    };

    // Callback métier pour la création
    const handleCreate = (title: string, description?: string, deadlineDate?: Date) => {
        createTask(title, description, deadlineDate);
        refreshTasks();
    };

    // Callback métier pour la suppression
    const handleDelete = (title: string) => {
        removeTask(title);
        refreshTasks();
    };

    // Callback métier pour la mise à jour
    const handleUpdate = () => {
        refreshTasks();
    };

    return (
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '32px 24px'}}>
            <CreationForms onCreate={handleCreate}/>
            <ShowTodos tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate}/>
        </div>
    )
}

export default App;