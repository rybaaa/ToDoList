import {TaskStateType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type removeTaskAT = ReturnType<typeof removeTaskAC>
type addTaskAT = ReturnType<typeof addTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case "ADD_TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ?
                    {...t, isDone: action.isDone} : t)
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ?
                    {...t, title: action.title} : t)
            }
        }
        case "ADD-TODOLIST" : {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST' : {
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: "REMOVE_TASK", taskID, todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {type: "ADD_TASK", title, todolistID} as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {type: 'CHANGE_TASK_STATUS', isDone, taskID, todolistID} as const
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {type: 'CHANGE_TASK_TITLE', todolistID, taskID, title} as const
}
