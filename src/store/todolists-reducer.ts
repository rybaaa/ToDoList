import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID:string
}
type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: FilterValuesType
}
type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title:string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT


export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(t => t.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {id: action.todolistID, filter: 'all', title: action.title}
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(t => t.id === action.todolistId ? {...t, title: action.title} : t)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id:string):RemoveTodolistAT => ({type:"REMOVE-TODOLIST", todolistId:id})
export const AddTodolistAC = (title:string):AddTodolistAT => ({type:"ADD-TODOLIST", title, todolistID:v1()})
export const ChangeTodolistFilterAC = (id:string, filter:FilterValuesType):ChangeTodolistFilterAT => ({type:"CHANGE-TODOLIST-FILTER", todolistId:id, filter})
export const ChangeTodolistTitleAC = (id:string, title:string):ChangeTodolistTitleAT => ({type:"CHANGE-TODOLIST-TITLE", todolistId:id, title})