import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'



function App() {

    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'RT', isDone: false}
    ])


    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))

    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const getFilteredTasks = (anyTasks:Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodoList = anyTasks;

        if (f === 'active') {
            tasksForTodoList = anyTasks.filter((t) => !t.isDone)
        }
        if (f === 'completed') {
            tasksForTodoList = anyTasks.filter((t) => t.isDone)
        }
        return tasksForTodoList
    }



    const addTask = (title:string) =>{
        const newTask: TaskType = {
            id: v1(),
            title:title,
            isDone:false
        }
        setTasks ([...tasks, newTask])
    }

    const changeTaskStatus = (taskID:string, newStatus:boolean) => {
        const updatedTasks: TaskType[] =
            tasks.map(t=>t.id === taskID? {...t, isDone: newStatus} : t)
        setTasks(updatedTasks)
    }
    // const changeTaskStatus = (taskID:string, isDone:boolean) => {
    //     const updatedTasks: TaskType[] =
    //         tasks.map(t=>t.id === taskID? {...t, isDone} : t)
    //     setTasks(updatedTasks)
    // }


    return (
        <div className="App">
            <TodoList
                tasks={getFilteredTasks(tasks, filter)}
                title={todolistTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;
