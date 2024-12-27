import { Meta, StoryObj } from '@storybook/react';

import { Title } from '.';

// Title 컴포넌트의 스토리에 대한 기본 정보를 정의한다.
const meta: Meta<typeof Title> = {
    // Title 컴포넌트를 아토믹 디자인의 원자(Atom) 단계로 분류하여,
    // Storybook에서 'Atoms'라는 카테고리 하위에 표시되도록 설정한다.
    title: 'Atoms/Title',
    component: Title,
};

export default meta;

// Storybook에서 여러 스토리를 작성할 수 있도록 
// Title 컴포넌트를 기반으로 한 스토리 타입을 선언한다.
type Story = StoryObj<typeof Title>;

// Default 스토리는 Title 컴포넌트의 기본 상태를 나타낸다.
export const Default: Story = {
    args: {
        // Title 컴포넌트에 전달될 기본 props를 설정한다.
        title: 'Count App',
    },
    // 전달받은 args를 Title 컴포넌트에 그대로 전달한다.
    render: (args) => <Title {...args} />, 
};