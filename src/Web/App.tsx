import React, {useState} from "react";
import {CreateTask, Task, TaskComponent} from "../Domain/Task";

function App() {

    const [task, setTask] = useState<Task>(CreateTask("test", "test", new Date()));
    return (        <>
            <TaskComponent task={task}/>
        </>
    )
}

export default App;