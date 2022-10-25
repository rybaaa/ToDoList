import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode ?
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetLocalTitle}/>
            :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
        ;
};

