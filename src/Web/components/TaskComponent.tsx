import {Task} from "../../Domain/Task";
import {StateType, StateConfig} from "../../Domain/StateType";
import React, {useState} from "react";
import {editDeadlineDate, editDescription, editTitle, editStatus} from "../../App/EditTask";
import {getTask} from "../../Domain/Tasks";
import {isTitleValid, isDescriptionValid} from "../../Domain/Task";

export function TaskComponent({task, onDelete, onUpdate}: {
    task: Task,
    onDelete: (title: string) => void,
    onUpdate: () => void
}) {
    const [localState, setLocalState] = useState<StateType>(task.state);
    const [editField, setEditField] = useState<null | 'title' | 'description' | 'deadline'>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    function handleClickDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        onDelete(task.title);
    }

    function handleEdit(field: 'title' | 'description' | 'deadline') {
        setEditField(field);
        if (field === 'deadline') {
            setEditValue(task.deadlineDate ? task.deadlineDate.toISOString().slice(0, 10) : "");
        } else {
            setEditValue((task as any)[field] ?? "");
        }
    }

    function handleSave(title: string, field: 'title' | 'description' | 'deadline') {
        const editedTask: Task | undefined = getTask(title)
        if (!editedTask) {
            alert('Erreur de sauvegarde : impossible de trouver la tâche à modifier');
            return;
        }

        let result: Task | undefined;
        let errorMessage = '';

        if (field === 'title') {
            if (!isTitleValid(editValue)) {
                errorMessage = `Le titre doit contenir au moins 3 caractères (actuellement: ${editValue.trim().length})`;
            } else {
                result = editTitle(editedTask, editValue);
            }
        } else if (field === 'description') {
            if (!isDescriptionValid(editValue)) {
                errorMessage = `La description doit contenir au moins 3 caractères (actuellement: ${editValue?.trim().length || 0})`;
            } else {
                result = editDescription(editedTask, editValue);
            }
        } else if (field === 'deadline') {
            result = editDeadlineDate(editedTask, editValue ? new Date(editValue) : undefined);
        }

        if (errorMessage) {
            alert(`Erreur de sauvegarde : ${errorMessage}`);
            return;
        }

        if (!result) {
            alert('Erreur de sauvegarde : une erreur inattendue s\'est produite');
            return;
        }

        setEditField(null);
        setEditValue("");
        onUpdate();
    }

    function handleStatusChange(newStatus: StateType) {
        const editedTask = getTask(task.title);
        if (!editedTask) {
            alert('Erreur de sauvegarde : impossible de trouver la tâche à modifier');
            return;
        }

        const result = editStatus(editedTask, newStatus);
        if (!result) {
            alert('Erreur de sauvegarde : impossible de changer le statut, vérifiez que la tâche est valide');
            return;
        }

        onUpdate();
        setLocalState(newStatus);
        setShowStatusDropdown(false);
    }

    const currentStatusConfig = StateConfig[localState];

    return (
        <tr className="task-row" key={task.uuid}>
            <td>
                {editField === 'title' ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input
                            type="text"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="edit-input"
                            style={{width: '100%'}}
                        />
                        <button className="icon-btn" onClick={() => handleSave(task.title, 'title')}
                                title="Sauvegarder">
                            <span style={{fontSize: '1em'}}>✔️</span>
                        </button>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{flex: 1}}>{task.title}</span>
                        <button className="icon-btn" onClick={() => handleEdit('title')} title="Modifier le titre">
                            <span style={{fontSize: '1em', opacity: 0.7}}>✏️</span>
                        </button>
                    </div>
                )}
            </td>
            <td>
                {editField === 'description' ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <textarea
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="edit-input"
                            style={{resize: 'vertical', minHeight: '24px', width: '100%'}}
                        />
                        <button className="icon-btn" onClick={() => handleSave(task.title, 'description')}
                                title="Sauvegarder">
                            <span style={{fontSize: '1em'}}>✔️</span>
                        </button>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{flex: 1}}>{task.description}</span>
                        <button className="icon-btn" onClick={() => handleEdit('description')}
                                title="Modifier la description">
                            <span style={{fontSize: '1em', opacity: 0.7}}>✏️</span>
                        </button>
                    </div>
                )}
            </td>
            <td>
                {editField === 'deadline' ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input
                            type="date"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="edit-input"
                            style={{width: '120px'}}
                            min={new Date().toISOString().slice(0, 10)}
                        />
                        <button className="icon-btn" onClick={() => handleSave(task.title, 'deadline')}
                                title="Sauvegarder">
                            <span style={{fontSize: '1em'}}>✔️</span>
                        </button>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{flex: 1}}>{task.deadlineDate ? task.deadlineDate.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }) : "—"}</span>
                        <button className="icon-btn" onClick={() => handleEdit('deadline')}
                                title="Modifier la date limite">
                            <span style={{fontSize: '1em', opacity: 0.7}}>✏️</span>
                        </button>
                    </div>
                )}
            </td>
            <td>
                <div className="status-dropdown">
                    <button
                        className={`status-badge ${currentStatusConfig.class}`}
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        onBlur={() => setTimeout(() => setShowStatusDropdown(false), 200)}
                        title="Changer le statut"
                    >
                        <span>{currentStatusConfig.icon}</span>
                        <span>{currentStatusConfig.label}</span>
                        <span style={{fontSize: '0.7em', opacity: 0.6}}>▼</span>
                    </button>
                    {showStatusDropdown && (
                        <div className="status-options">
                            {Object.values(StateType).map(status => {
                                const config = StateConfig[status];
                                return (
                                    <button
                                        key={status}
                                        className="status-option"
                                        onClick={() => handleStatusChange(status)}
                                    >
                                        <span>{config.icon}</span>
                                        <span>{config.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </td>
            <td style={{fontSize: '0.9em', color: '#666'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                    <span>{task.updatedAt.toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}</span>
                    <span style={{fontSize: '0.85em', opacity: 0.8}}>
                        {task.updatedAt.toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </td>
            <td style={{textAlign: 'center', width: '32px'}}>
                <button className="icon-btn delete" onClick={handleClickDelete} title="Supprimer">
                    <span style={{fontSize: '1em', opacity: 0.8}}>🗑️</span>
                </button>
            </td>
        </tr>
    );
}
