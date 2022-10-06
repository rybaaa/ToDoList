import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newStatus: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimedTitle = title.trim()
        if (trimedTitle !== '') {
            props.addTask(trimedTitle)
        } else {
            setError(true)
        }

        setTitle('')
    }


    const TaskList = props.tasks.map((t) => {
        const RemoveTask = () => props.removeTask(t.id)
        const changeTaskStatus = ((e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        })
        return (
            <li key={t.id} className={t.isDone ? 'isDone' : 'notDone'}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={RemoveTask}>x</button>
            </li>
        )
    })

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)

    }
    const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'red'}}>Title is required</div> : null
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onEnterDownAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {TaskList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeBtn btn' : 'btn'}
                        onClick={handlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'activeBtn btn' : 'btn'}
                        onClick={handlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeBtn btn' : 'btn'}
                        onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    )

}

export default TodoList