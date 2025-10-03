import {Task} from "../../Domain/Task";
import {StateType} from "../../Domain/StateType";
import React, {useState} from "react";

export function TaskComponent({task, onDelete}: { task: Task, onDelete: (title: string) => void }) {
    const [localState, setLocalState] = useState<StateType>(task.state);
    const [editField, setEditField] = useState<null | 'title' | 'description' | 'deadline'>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    // Configuration des icônes et classes CSS pour chaque statut
    const getStatusConfig = (status: StateType) => {
        switch (status) {
            case StateType.TODO:
                return { icon: '⏳', class: 'todo', label: 'À faire' };
            case StateType.IN_PROGRESS:
                return { icon: '🔄', class: 'in-progress', label: 'En cours' };
            case StateType.DONE:
                return { icon: '✅', class: 'done', label: 'Terminée' };
            case StateType.ARCHIVED:
                return { icon: '📦', class: 'archived', label: 'Archivée' };
            default:
                return { icon: '⏳', class: 'todo', label: 'À faire' };
        }
    };

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

    function handleSave(field: 'title' | 'description' | 'deadline') {
        // À compléter par la logique métier
        setEditField(null);
    }

    function handleStatusChange(newStatus: StateType) {
        setLocalState(newStatus);
        setShowStatusDropdown(false);
    }

    const currentStatusConfig = getStatusConfig(localState);

    return (
        <tr className="task-row" key={task.uuid}>
            {/* Titre */}
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
                        <button className="icon-btn" onClick={() => handleSave('title')} title="Sauvegarder">
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
            {/* Description */}
            <td>
                {editField === 'description' ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <textarea
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="edit-input"
                            style={{resize: 'vertical', minHeight: '24px', width: '100%'}}
                        />
                        <button className="icon-btn" onClick={() => handleSave('description')} title="Sauvegarder">
                            <span style={{fontSize: '1em'}}>✔️</span>
                        </button>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{flex: 1}}>{task.description}</span>
                        <button className="icon-btn" onClick={() => handleEdit('description')} title="Modifier la description">
                            <span style={{fontSize: '1em', opacity: 0.7}}>✏️</span>
                        </button>
                    </div>
                )}
            </td>
            {/* Deadline */}
            <td>
                {editField === 'deadline' ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input
                            type="date"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="edit-input"
                            style={{width: '120px'}}
                        />
                        <button className="icon-btn" onClick={() => handleSave('deadline')} title="Sauvegarder">
                            <span style={{fontSize: '1em'}}>✔️</span>
                        </button>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{flex: 1}}>{task.deadlineDate ? task.deadlineDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "—"}</span>
                        <button className="icon-btn" onClick={() => handleEdit('deadline')} title="Modifier la date limite">
                            <span style={{fontSize: '1em', opacity: 0.7}}>✏️</span>
                        </button>
                    </div>
                )}
            </td>
            {/* Statut visuel avec badge coloré */}
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
                                const config = getStatusConfig(status);
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
            {/* Actions minimalistes */}
            <td style={{textAlign: 'center', width: '32px'}}>
                <button className="icon-btn delete" onClick={handleClickDelete} title="Supprimer">
                    <span style={{fontSize: '1em', opacity: 0.8}}>🗑️</span>
                </button>
            </td>
        </tr>
    );
}
