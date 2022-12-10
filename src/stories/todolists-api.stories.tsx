import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const addTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
                setTitle('')
            })
    }
    return <div>
        <input placeholder={'Title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={addTodolist}>Add Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
                setTodolistId('')
            })
    }
    return <div>
        <input placeholder={'TodolistID'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={deleteTodolist}>Delete Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
                setTodolistId('')
                setTitle('')
            })
    }
    return <div>
        <input placeholder={'TodolistID'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'Title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTodolist}>Update Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
                setTodolistId('')
            })
    }
    return <div>
        <input placeholder={'TodolistID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={getTasks}>Get Tasks</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data.data.item)
                setTodolistId('')
                setTitle('')
            })
    }

    return <div>
        <input placeholder={'TodolistID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>Create Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const model = {
        title,
        description: '',
        status: 5,
        priority: 5,
        startDate: null,
        deadline: null
    }

    const updateTask = ()=>{
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res)=>{
                setState(res.data)
            })
    }
    return <div>
        <input placeholder={'TodolistID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'TaskID'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={'Title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTask}>Update Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
                setTodolistId('')
                setTaskId('')
            })
    }

    return <div>
        <input placeholder={'TodolistID'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'TaskID'} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <button onClick={deleteTask}>Delete Task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}

