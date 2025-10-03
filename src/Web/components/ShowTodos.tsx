import React from "react";
import {TaskComponent} from "./TaskComponent";
import {Task} from "../../Domain/Task";

export function ShowTodos({tasks, onDelete}: {tasks: Task[], onDelete: (title: string) => void}) {
    return (
        <div className="table-container">
            <h2 style={{marginBottom: '18px'}}>Liste des Todos</h2>
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
                    {tasks.map(task => (
                        <TaskComponent key={task.uuid} task={task} onDelete={onDelete}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}