import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {DeleteRounded} from "@material-ui/icons";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, newStatus: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    todoListId: string
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }


    const TaskList = props.tasks.map((t) => {
        const RemoveTask = () => props.removeTask(t.id, props.todoListId)
        const changeTaskStatus = ((e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        })
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListId)
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

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)


    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    return (
        <div style={{width:'300px'}}>
            <div>
                <Typography
                    style={{fontWeight: 'bold', marginBottom:'20px'}}
                    color={'primary'}
                    align={'center'}
                    variant={'h5'}>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
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
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        size={'small'}
                        style={{marginRight: '3px'}}
                        //className={props.filter === 'all' ? 'activeBtn btn' : 'btn'}
                        onClick={handlerCreator('all')}>All
                    </Button>
                    <Button
                        size={'small'}
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        variant={'contained'}
                        style={{marginRight: '3px'}}
                        //className={props.filter === 'active' ? 'activeBtn btn' : 'btn'}
                        onClick={handlerCreator('active')}>Active
                    </Button>
                    <Button
                        size={'small'}
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        variant={'contained'}
                        //className={props.filter === 'completed' ? 'activeBtn btn' : 'btn'}
                        onClick={handlerCreator('completed')}>Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    )

}

export default TodoList