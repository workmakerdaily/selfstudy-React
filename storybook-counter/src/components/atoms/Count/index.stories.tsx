import { Meta, StoryObj } from '@storybook/react';
import { Count } from '.';

const meta: Meta<typeof Count> = {
    title: 'Atoms/Count',
    component: Count,
};

export default meta;

type Story = StoryObj<typeof Count>;

export const Default: Story = {
    args: {
        value: 0,
    },
    render: (args) => <Count {...args} />, 
};