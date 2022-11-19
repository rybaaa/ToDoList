import React, {ChangeEvent, FC} from 'react';
import {TodolistType} from "./AppWithRedux";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteRounded} from "@material-ui/icons";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./TodoList";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/task-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./store/todolists-reducer";

export type TodoListWithReduxType = {
    todoList: TodolistType
}

export const TodoListWithRedux: FC<TodoListWithReduxType> = ({todoList}) => {

    const {id,title,filter} = todoList

    let tasks = useSelector<AppRootStateType, Array<TaskType>> (state => state.tasks[id])
    const dispatch = useDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }
    if (filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(el => el.isDone)
    }


    const TaskList = tasks.map((t) => {
        const RemoveTask = () => dispatch(removeTaskAC(t.id, id))
        const changeTaskStatus = ((e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))
        })
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(id, t.id, title))
        }
        return (
            <List>
                <ListItem
                    style={{padding: '0', justifyContent: 'space-between', opacity: t.isDone ? '0.5' : '1', fontWeight: t.isDone? 'normal' : 'bold'}}
                    key={t.id} className={t.isDone ? 'isDone' : 'notDone'}>
                    <Checkbox
                        size={'small'}
                        color = {'primary'}
                        checked={t.isDone}
                        onChange={changeTaskStatus}/>
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        color = {'secondary'}
                        size={'small'}
                        onClick={RemoveTask}><DeleteRounded/>
                    </IconButton>
                </ListItem>
            </List>
        )
    })

    const handlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodolistFilterAC(id, filter))

    const removeTodoList = () => dispatch(RemoveTodolistAC(id))

    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }
    return (
        <div style={{width:'300px'}}>
            <div>
                <Typography
                    style={{fontWeight: 'bold', marginBottom:'20px'}}
                    color={'primary'}
                    align={'center'}
                    variant={'h5'}>
                    <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                    <IconButton
                        size={'small'}
                        color={'secondary'}
                        onClick={removeTodoList}><DeleteRounded/>
                    </IconButton>
                </Typography>
            </div>
            <AddItemForm addItem={addTask}/>
            <div>
                {TaskList}
            </div>
            <div>
                <ButtonGroup fullWidth>
                    <Button
                        variant={'contained'}
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        size={'small'}
                        style={{marginRight: '3px'}}
                        onClick={handlerCreator('all')}>All
                    </Button>
                    <Button
                        size={'small'}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        variant={'contained'}
                        style={{marginRight: '3px'}}
                        onClick={handlerCreator('active')}>Active
                    </Button>
                    <Button
                        size={'small'}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        variant={'contained'}
                        onClick={handlerCreator('completed')}>Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    )
};

