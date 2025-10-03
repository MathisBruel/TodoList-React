import React, {useState} from "react";
import {CreationForms} from "./components/CreationForms";
import {ShowTodos} from "./components/ShowTodos";

function App() {

    return (
        <>
            <CreationForms/>
            <ShowTodos/>
        </>
    )
}

export default App;