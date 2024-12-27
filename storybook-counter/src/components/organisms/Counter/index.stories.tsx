import { Meta, StoryObj } from '@storybook/react';
import { Counter } from '.';

const meta: Meta<typeof Counter> = {
    title: 'organisms/Counter',
    component: Counter,
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const Default: Story = {
    args: {
    },
};