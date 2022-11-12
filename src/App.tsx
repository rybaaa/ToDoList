import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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



    const removeTask = (taskId: string, todoListId: string) => {
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = copyTasks[todoListId].filter ((t) => t.id !== taskId)
        // setTasks(copyTasks)
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        })
    }

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

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskID: string, newStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskID ?
                {...t, isDone: newStatus} : t)
        })
    }

    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskID ?
                {...t, title: title} : t)
        })
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: filter} : t))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, title: title} : t))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodoList = (title: string) => {
        let newTodolist: TodolistType = {id: v1(), filter: 'all', title: title}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolist.id]: []})
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

export default App;
