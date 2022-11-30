import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Clicked'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    addItem: action('Clicked')
};

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
    console.log('additemform')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('Title is required')
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError('Title is required')
        setTitle(e.currentTarget.value)
    }
    const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'red'}}>Title is required</div> : null
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const addItem = () => {
        const trimedTitle = title.trim()
        if (trimedTitle !== '') {
            args.addItem(trimedTitle)
        } else {
            setError('')
        }

        setTitle('')
    }
    return (
        <div>
            <TextField
                size={'small'}
                label={'Title'}
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                //helperText={error && 'Title is required'}
            />
            <IconButton
                color={'primary'}
                onClick={addItem}>
                <AddBox/>
            </IconButton>
            {errorMessage}
        </div>
    )
};

export const TemplateWithErrorStory = TemplateWithError.bind({})