import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Checkbox, IconButton, List, ListItem, TextField} from "@material-ui/core";
import {AddBox, DeleteRounded} from "@material-ui/icons";
import {Tasks} from "../Tasks";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {EditableSpan} from "../EditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/task-reducer";
import {useDispatch} from "react-redux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Tasks',
    component: Tasks,
    decorators:[ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Tasks>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tasks> = (args) => <Tasks {...args} />;

export const TasksIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TasksIsDoneStory.args = {
    id: '1',
    title: 'CSS',
    isDone: true,
    todolistID:'1'
};
export const TasksIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TasksIsNotDoneStory.args = {
    id: '1',
    title: 'CSS',
    isDone: false,
    todolistID:'1'
};
// const TemplateWork: ComponentStory<typeof Tasks> = (args) => {
//     const dispatch = useDispatch()
//     const changeTaskStatus = ((e: ChangeEvent<HTMLInputElement>) => {
//         dispatch(changeTaskStatusAC(args.id, e.currentTarget.checked, args.todolistID))
//     })
//     const changeTaskTitle = (title: string) => {
//         dispatch(changeTaskTitleAC(args.todolistID, args.id, title))
//     }
//     const removeTask = () => dispatch(removeTaskAC(args.id, args.todolistID))
//
//     return (
//         <List key = {args.id}>
//             <ListItem
//                 style={{padding: '0', justifyContent: 'space-between', opacity: args.isDone ? '0.5' : '1', fontWeight: props.isDone? 'normal' : 'bold'}}
//                 key={args.id} className={args.isDone ? 'isDone' : 'notDone'}>
//                 <Checkbox
//                     size={'small'}
//                     color = {'primary'}
//                     checked={args.isDone}
//                     onChange={changeTaskStatus}/>
//                 <EditableSpan title={args.title} changeTitle={changeTaskTitle}/>
//                 <IconButton
//                     color = {'secondary'}
//                     size={'small'}
//                     onClick={removeTask}><DeleteRounded/>
//                 </IconButton>
//             </ListItem>
//         </List>
//     )
// };
//
// export const TaskWorkStory = TemplateWork.bind({});
