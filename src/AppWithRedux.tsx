import React from 'react';
import './App.css';
import {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListWithRedux} from "./TodoListWithRedux";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskID: string, newStatus: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskID, newStatus, todoListId))
    }

    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskID, title))
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(todoListId, filter))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodolistAC(todoListId))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodolistAC(title))
    }


    const todoListComponents = todoLists.map(tdl => {
        return (
            <Grid item
                  key={tdl.id}
            >
                <Paper
                    style={{width: '300px', padding: '20px'}}>
                    <TodoListWithRedux
                        key={tdl.id}
                        todoList = {tdl}
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

export default AppWithRedux;
