import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/task-reducer";
import {Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteRounded} from "@material-ui/icons";
import {useDispatch} from "react-redux";

type TasksPropsTypes = {
    id: string
    title: string
    isDone: boolean
    todolistID:string
}

export const Tasks = (props:TasksPropsTypes) => {
    const dispatch = useDispatch()
    const removeTask = () => dispatch(removeTaskAC(props.id, props.todolistID))
    const changeTaskStatus = ((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.id, e.currentTarget.checked, props.todolistID))
    })
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.todolistID, props.id, title))
    }
    return (
        <List key = {props.id}>
            <ListItem
                style={{padding: '0', justifyContent: 'space-between', opacity: props.isDone ? '0.5' : '1', fontWeight: props.isDone? 'normal' : 'bold'}}
                key={props.id} className={props.isDone ? 'isDone' : 'notDone'}>
                <Checkbox
                    size={'small'}
                    color = {'primary'}
                    checked={props.isDone}
                    onChange={changeTaskStatus}/>
                <EditableSpan title={props.title} changeTitle={changeTaskTitle}/>
                <IconButton
                    color = {'secondary'}
                    size={'small'}
                    onClick={removeTask}><DeleteRounded/>
                </IconButton>
            </ListItem>
        </List>
    )
};
