import React from 'react';

export function CreationForms({onCreate}: {
    onCreate: (title: string, description?: string, deadlineDate?: Date) => void
}) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const title = (form.elements.namedItem('title') as HTMLInputElement)?.value;
        const descriptionRaw = (form.elements.namedItem('description') as HTMLTextAreaElement)?.value;
        const descriptionToSend = descriptionRaw === "" ? undefined : descriptionRaw;
        const deadlineRaw = (form.elements.namedItem('deadline') as HTMLInputElement)?.valueAsDate;
        const deadlineToSend = deadlineRaw === null ? undefined : deadlineRaw;
        onCreate(title, descriptionToSend, deadlineToSend);
    }

    return (
        <div className="creation-forms">
            <h2 style={{marginBottom: '18px'}}>Créez une nouvelle Todo</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                <input type="text" id="title" name="title" required placeholder="Titre"/>
                <textarea id="description" name="description" placeholder="Description"/>
                <input type="date" id="deadline" name="deadline" placeholder="Date limite"/>
                <button type="submit">Créer la tâche</button>
            </form>
        </div>
    )
}
