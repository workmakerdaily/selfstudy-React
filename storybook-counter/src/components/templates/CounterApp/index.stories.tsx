import { Meta, StoryObj } from '@storybook/react';
import { CounterApp } from '.';

const meta: Meta<typeof CounterApp> = {
    title: 'templates/CounterApp',
    component: CounterApp,
};

export default meta;

type Story = StoryObj<typeof CounterApp>;

export const Default: Story = {
    args: {
    },
};