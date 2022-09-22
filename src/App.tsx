import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type FilterValuesType = 'all' | 'completed' | 'active'



function App() {
    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'RT', isDone: false}
    ])

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId))

    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter((t) => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((t) => t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                tasks={tasksForTodoList}
                title={todolistTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
