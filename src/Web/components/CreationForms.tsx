import React, {useState} from 'react';
import {isTitleValid, isDescriptionValid, isDeadlineValid} from "../../Domain/Task";

export function CreationForms({onCreate}: {
    onCreate: (title: string, description?: string, deadlineDate?: Date) => void
}) {
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        deadline?: string;
    }>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const title = (form.elements.namedItem('title') as HTMLInputElement)?.value;
        const descriptionRaw = (form.elements.namedItem('description') as HTMLTextAreaElement)?.value;
        const descriptionToSend = descriptionRaw === "" ? undefined : descriptionRaw;
        const deadlineRaw = (form.elements.namedItem('deadline') as HTMLInputElement)?.valueAsDate;
        const deadlineToSend = deadlineRaw === null ? undefined : deadlineRaw;

        // Validation des champs
        const newErrors: typeof errors = {};

        if (!isTitleValid(title)) {
            newErrors.title = `Le titre doit contenir au moins 3 caractères (actuellement: ${title.trim().length})`;
        }

        if (!isDescriptionValid(descriptionToSend)) {
            newErrors.description = `La description doit contenir au moins 3 caractères (actuellement: ${descriptionRaw?.trim().length || 0})`;
        }

        if (!isDeadlineValid(deadlineToSend)) {
            newErrors.deadline = `La date limite doit être dans le futur (actuellement: ${deadlineToSend?.toLocaleDateString('fr-FR') || 'non définie'})`;
        }

        setErrors(newErrors);

        // Si pas d'erreurs, créer la tâche
        if (Object.keys(newErrors).length === 0) {
            onCreate(title, descriptionToSend, deadlineToSend);
            // Réinitialiser le formulaire
            form.reset();
            form.querySelector<HTMLInputElement>('input[name="deadline"]')!.value = new Date().toISOString().split('T')[0];
        }
    }

    return (
        <div className="creation-forms">
            <h2 style={{marginBottom: '18px'}}>Créez une nouvelle Todo</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        placeholder="Titre"
                        style={{
                            borderColor: errors.title ? '#dc3545' : undefined,
                            borderWidth: errors.title ? '2px' : undefined
                        }}
                    />
                    {errors.title && (
                        <div style={{
                            color: '#dc3545',
                            fontSize: '12px',
                            marginTop: '4px'
                        }}>
                            {errors.title}
                        </div>
                    )}
                </div>

                <div className="form-field">
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        style={{
                            borderColor: errors.description ? '#dc3545' : undefined,
                            borderWidth: errors.description ? '2px' : undefined
                        }}
                    />
                    {errors.description && (
                        <div style={{
                            color: '#dc3545',
                            fontSize: '12px',
                            marginTop: '4px'
                        }}>
                            {errors.description}
                        </div>
                    )}
                </div>

                <div className="form-field">
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        placeholder="Date limite"
                        min={new Date().toISOString().split('T')[0]}
                        defaultValue={new Date().toISOString().split('T')[0]}
                        style={{
                            borderColor: errors.deadline ? '#dc3545' : undefined,
                            borderWidth: errors.deadline ? '2px' : undefined
                        }}
                    />
                    {errors.deadline && (
                        <div style={{
                            color: '#dc3545',
                            fontSize: '12px',
                            marginTop: '4px'
                        }}>
                            {errors.deadline}
                        </div>
                    )}
                </div>

                <button type="submit">Créer la tâche</button>
            </form>
        </div>
    )
}
