import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7fd04dfe-8629-4bd4-9c12-9366ee505d1c',
    },
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7fd04dfe-8629-4bd4-9c12-9366ee505d1c',
    },
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<any>>(
            `todo-lists/${todolistId}`,
            { title: title },
            settings
        )
        return promise
    },
    getTodolist(){
        return instance.get<TodolistType[]>(`/todo-lists` )
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item:TodolistType}>>('/todo-lists', {title} )
    },
    deleteTodolist(id:string){
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    getTasks(todolistId:string){
        return instance.get<ResponseTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title:string){
        return instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId:string, taskId:string, model:UpdateTaskType){
        return instance.put<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

type TodolistType = {
    id:string
    title:string
    addedDate:Date
    order: number
}

type ResponseType<D={}> = {
    resultCode:number
    messages:string[]
    fieldsErrors:string[]
    data:D
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type ResponseTaskType = {
    totalCount:number
    error:string | null
    items:TaskType[]
}

type UpdateTaskType = {
    title:string
    description: string | null
    status: number
    priority: number
    startDate: Date | null
    deadline: Date | null
}