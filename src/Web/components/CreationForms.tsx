import React from 'react';
import {createTask} from "../../App/CreateTask";

export function CreationForms() {
    return (
        <div className="creation-forms">
            <h2>Créez une nouvelle Todo</h2>

            <form className="create-task-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Titre</label>
                <input type="text" id="title" name="title" required />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" />
                <label htmlFor="deadline">Date limite</label>
                <input type="date" id="deadline" name="deadline" />
                <button type="submit">Créer la tâche</button>
            </form>
        </div>
    )
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement)?.value;
    const deadline = (form.elements.namedItem('deadline') as HTMLInputElement)?.valueAsDate;
    if (deadline)
        createTask(title, description, deadline);
    else createTask(title, description);
}