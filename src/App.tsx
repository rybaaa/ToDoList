import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import todoList from "./TodoList";

function App() {
    const todolistTitle = 'What to learn'
    const tasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const todolistTitle2 = 'What to buy'
    const tasks2 = [
        {id: 4, title: 'Computer', isDone: true},
        {id: 5, title: 'Earpods', isDone: true},
        {id: 6, title: 'Knowledge?', isDone: false}
    ]


    return (
        <div className="App">
            <TodoList tasks={tasks} title={todolistTitle}/>
            <TodoList tasks={tasks2} title={todolistTitle2}/>

        </div>
    );
}

export default App;
