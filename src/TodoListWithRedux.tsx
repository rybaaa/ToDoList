import React, {FC, useCallback} from 'react';
import {TodolistType} from "./AppWithRedux";
import {Button, ButtonGroup, IconButton,Typography} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteRounded} from "@material-ui/icons";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./TodoList";
import {addTaskAC} from "./store/task-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./store/todolists-reducer";
import {Tasks} from "./Tasks";

export type TodoListWithReduxType = {
    todoList: TodolistType
}

const TodoList: FC<TodoListWithReduxType> = ({todoList}) => {
    console.log('todolist')
    const {id,title,filter} = todoList

    let tasks = useSelector<AppRootStateType, Array<TaskType>> (state => state.tasks[id])
    const dispatch = useDispatch()


    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id])
    if (filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(el => el.isDone)
    }


    const TaskList = tasks.map((t) => <Tasks key={t.id} id={t.id} title={t.title} isDone={t.isDone} todolistID={id}/>)

    const handlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodolistFilterAC(id, filter))

    const removeTodoList = () => dispatch(RemoveTodolistAC(id))

    const changeTodoListTitle = useCallback( (title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }, [dispatch, id])
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

export const TodoListWithRedux = React.memo(TodoList)