import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
