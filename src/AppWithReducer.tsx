import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/task-reducer";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithReducer() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RT', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Rice', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Sugar', isDone: false}
        ],
    })

    const getFilteredTasks = (anyTasks: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodoList = anyTasks;

        if (f === 'active') {
            tasksForTodoList = anyTasks.filter((t) => !t.isDone)
        }
        if (f === 'completed') {
            tasksForTodoList = anyTasks.filter((t) => t.isDone)
        }
        return tasksForTodoList
    }


    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskID: string, newStatus: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, newStatus, todoListId))
    }

    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(todoListId, taskID, title))
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchTodolists(ChangeTodolistFilterAC(todoListId, filter))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchTodolists(ChangeTodolistTitleAC(todoListId, title))
    }

    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodolistAC(todoListId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }


    const todoListComponents = todoLists.map(tdl => {
        return (
            <Grid item
                  key={tdl.id}
            >
                <Paper
                    style={{width: '300px', padding: '20px'}}>
                    <TodoList
                        key={tdl.id}
                        todoListId={tdl.id}
                        title={tdl.title}
                        filter={tdl.filter}
                        tasks={getFilteredTasks(tasks[tdl.id], tdl.filter)}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
