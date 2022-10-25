import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: addItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'red'}}>Title is required</div> : null
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const addItem = () => {
        const trimedTitle = title.trim()
        if (trimedTitle !== '') {
            props.addItem(trimedTitle)
        } else {
            setError(true)
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
                error={error}
                //helperText={error && 'Title is required'}
            />
            <IconButton
                color={'primary'}
                onClick={addItem}>
                <AddBox/>
            </IconButton>
            {errorMessage}
        </div>
    );
};

