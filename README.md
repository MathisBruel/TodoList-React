# 📝 TodoList - Application de Gestion de Tâches

Une application moderne de gestion de tâches développée en **React TypeScript** avec une architecture hexagonale propre. Cette application permet de créer, modifier, organiser et suivre vos tâches avec une interface utilisateur intuitive.

## ✨ Fonctionnalités

### 🎯 Gestion des Tâches
- **Création de tâches** avec titre, description optionnelle et date limite
- **Modification en ligne** de tous les champs (titre, description, date limite)
- **Suppression** de tâches avec confirmation
- **Validation des données** en temps réel

### 📊 Système de Statuts
- **4 statuts disponibles** avec icônes distinctes :
  - ⏳ **À faire** - Tâches nouvellement créées
  - 🔄 **En cours** - Tâches en progression
  - ✅ **Terminée** - Tâches accomplies
  - 📦 **Archivée** - Tâches archivées
- **Changement de statut** via dropdown interactif

### 💾 Persistance des Données
- **Sauvegarde automatique** dans le LocalStorage du navigateur
- **Récupération automatique** des tâches au redémarrage
- **Horodatage** de création et modification

### 🎨 Interface Utilisateur
- **Interface responsive** adaptée aux différents écrans
- **Édition inline** avec boutons d'action intuitifs
- **Affichage formaté** des dates en français
- **Feedback visuel** pour toutes les actions

## 🏗️ Architecture

Le projet suit une **architecture hexagonale** (Clean Architecture) avec une séparation claire des responsabilités :

```
src/
├── 🌐 Web/                    # Couche Présentation
│   ├── App.tsx               # Composant principal
│   ├── index.css             # Styles globaux
│   └── components/           # Composants UI
│       ├── CreationForms.tsx # Formulaire de création
│       ├── ShowTodos.tsx     # Affichage liste des tâches
│       └── TaskComponent.tsx # Composant tâche individuelle
├── 🎯 App/                    # Couche Application (Use Cases)
│   ├── CreateTask.tsx        # Cas d'usage création
│   ├── EditTask.tsx          # Cas d'usage modification
│   └── RemoveTask.tsx        # Cas d'usage suppression
├── 🏛️ Domain/                 # Couche Domaine (Logique Métier)
│   ├── Task.tsx              # Entité Task + validations
│   ├── Tasks.tsx             # Agrégat des tâches
│   └── StateType.tsx         # Énumération des statuts
└── 🔧 Infra/                  # Couche Infrastructure
    └── LocalStorageRepo.tsx  # Implémentation persistence
```

### 📐 Principes Architecturaux

- **Séparation des préoccupations** : Chaque couche a une responsabilité spécifique
- **Inversion de dépendance** : Le domaine ne dépend d'aucune couche externe
- **Interface Repository** : Abstraction de la persistance des données
- **Validation métier** : Règles de validation centralisées dans le domaine

## 🚀 Installation et Lancement

### Prérequis
- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd todolist

# Installer les dépendances
npm install
```

### Lancement en développement
```bash
npm start
```
L'application sera accessible sur `http://localhost:3000`

### Build pour production
```bash
npm run build
```

### Tests
```bash
npm test
```

## 🛠️ Technologies Utilisées

### Frontend
- **React 19.2.0** - Bibliothèque UI
- **TypeScript 4.9.5** - Typage statique
- **React Scripts 5.0.1** - Outils de build et développement

### Testing
- **@testing-library/react** - Tests de composants
- **@testing-library/jest-dom** - Matchers Jest personnalisés
- **@testing-library/user-event** - Simulation d'interactions utilisateur

### Outils de Développement
- **ESLint** - Analyse statique du code
- **Jest** - Framework de tests
- **CSS personnalisé** - Styles sans framework externe

## 📱 Utilisation

### Créer une nouvelle tâche
1. Saisissez un **titre** (minimum 3 caractères)
2. Ajoutez une **description** optionnelle (minimum 3 caractères si renseignée)
3. Définissez une **date limite** optionnelle (ne peut pas être antérieure à aujourd'hui)
4. Cliquez sur **"Créer la tâche"**

### Modifier une tâche existante
- Cliquez sur l'**icône crayon** ✏️ à côté du champ à modifier
- Effectuez vos modifications
- Cliquez sur l'**icône validation** ✔️ pour sauvegarder

### Changer le statut d'une tâche
- Cliquez sur le **badge de statut** de la tâche
- Sélectionnez le nouveau statut dans le menu déroulant

### Supprimer une tâche
- Cliquez sur l'**icône poubelle** 🗑️ dans la colonne actions

## 🔍 Règles de Validation

### Titre
- **Obligatoire**
- Minimum **3 caractères** (espaces non comptés)
- Doit être **unique** parmi toutes les tâches

### Description
- **Optionnelle**
- Si renseignée : minimum **3 caractères** (espaces non comptés)

### Date Limite
- **Optionnelle**
- Si renseignée : ne peut pas être **antérieure à aujourd'hui**

## 💡 Fonctionnalités Avancées

### Horodatage Automatique
- **Date de création** : Enregistrée automatiquement
- **Date de modification** : Mise à jour à chaque changement
- **Affichage formaté** : Date et heure en format français

### Persistance Intelligente
- **Sauvegarde automatique** après chaque action
- **Récupération des types** : Les dates et énumérations sont correctement restaurées
- **Gestion d'erreurs** : Validation des données lors de la récupération

### Interface Adaptive
- **Responsive design** : S'adapte aux différentes tailles d'écran
- **Feedback visuel** : Messages d'erreur et confirmations
- **Navigation au clavier** : Support des interactions clavier

## 🚦 États des Tâches

| Statut | Icône | Description |
|--------|-------|-------------|
| À faire | ⏳ | Tâche nouvellement créée, en attente de traitement |
| En cours | 🔄 | Tâche actuellement en cours de réalisation |
| Terminée | ✅ | Tâche accomplie avec succès |
| Archivée | 📦 | Tâche archivée, retirée du flux de travail actif |

## 🔧 Configuration et Personnalisation

### Modification des Statuts
Les statuts sont définis dans `src/Domain/StateType.tsx`. Pour ajouter ou modifier un statut :

1. Ajoutez le nouveau statut dans l'énumération `StateType`
2. Ajoutez sa configuration dans `StateConfig` avec icône et label
3. Les composants s'adapteront automatiquement

### Changement de Persistance
Pour utiliser une autre méthode de persistance (API, base de données) :

1. Implémentez l'interface `ITaskRepo` dans `src/Infra/`
2. Modifiez l'instanciation dans `src/Domain/Tasks.tsx`

## 🤝 Contribution

1. **Fork** le projet
2. Créez une **branche feature** (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Committez** vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. **Poussez** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une **Pull Request**

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Mathis BRUEL**

---

*Développé avec ❤️ en TypeScript et React*

