export enum StateType {
    TODO = "À faire",
    IN_PROGRESS = "En cours",
    DONE = "Terminée",
    ARCHIVED = "Archivée"
}

// Configuration visuelle pour chaque statut
export const StateConfig = {
    [StateType.TODO]: {
        icon: '⏳',
        class: 'todo',
        label: 'À faire'
    },
    [StateType.IN_PROGRESS]: {
        icon: '🔄',
        class: 'in-progress',
        label: 'En cours'
    },
    [StateType.DONE]: {
        icon: '✅',
        class: 'done',
        label: 'Terminée'
    },
    [StateType.ARCHIVED]: {
        icon: '📦',
        class: 'archived',
        label: 'Archivée'
    }
} as const;
