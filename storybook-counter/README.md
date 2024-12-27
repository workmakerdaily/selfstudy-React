# Storybook - counter
스토리북을 보면서 컴포넌트 주도 개발을 할 예정이므로 불필요한 예제 파일들인 ./src/stories 폴더를 삭제하도록 한다.
그리고 http://localhost:6006/으로 이동하면 에러가 발생해 있다.
예제 파일들을 지우면서 현재 프로젝트에 더 이상 스토리북 파일이 존재하지 않게 되었기 때문이다.

# 개발
### <Title /\> 원자 컴포넌트
src 폴더에 components 폴더를 만들고 그 안에 atoms 폴더를 만든다. 그리고 Title 이라는 폴더를 만든 후 index 파일을 생성하고 다음과 같이 작성한다.'
```javascript
export const Title = () => {
    return <div>Title</div>;
};
```
이제 스토리북을 사용하여 화면에 출력할 것이다.

index 파일과 같은 위치에 index.stories.tsx 파일을 생성하고 다음과 같이 작성한다.
```javascript
import { Meta, StoryObj } from '@storybook/react';

import { Title } from '.';

// Title 컴포넌트의 스토리에 대한 기본 정보를 정의한다.
const meta: Meta<typeof Title> = {
    // Title 컴포넌트를 아토믹 디자인의 원자(Atom) 단계로 분류하여,
    // Storybook에서 'Atoms'라는 카테고리 하위에 표시되도록 설정했다.
    title: 'Atoms/Title',
    component: Title,
};

export default meta;

// Storybook에서 하나의 스토리 파일에서 여러 스토리를 작성할 수 있도록
// Title 컴포넌트를 기반으로 한 스토리 타입을 선언했다.
type Story = StoryObj<typeof Title>;

// Default 스토리는 Title 컴포넌트의 기본 상태를 나타낸다.
export const Default: Story = {
    args: {
        // Title 컴포넌트에 전달될 기본 props를 설정한다.
        // 예: text: "Default Title" (props의 이름과 구조는 Title 컴포넌트에 따라 달라진다)
    },
};
```
브라우저를 보면 ATOMS 메뉴 하위에서 Title 메뉴를 확인할 수 있으며 Title 메뉴 하위에서 Default라는 스토리를 확인할 수 있다.
그리고 화면에는 index.tsx 파일에 작성한 내용이 출력되고 있다.

index 파일을 수정하여 부모 컴포넌트로 부터 Props 데이터를 전달받도록 Title 컴포넌트를 수정한다.
```javascript
import styled from '@emotion/styled';

const Label = styled.h1`
    margin-bottom: 32px;
`;

interface Props {
    readonly title: string;
}

export const Title = ({ title }: Props) => {
    return <Label>{title}</Label>;
};
```
그리고 새로고침 후 Controls 탭을 확인해 보면 title이라는 필수 Props가 표시되고 있고 타입으로 string이 표시되고 있다.

화면에 원하는 문자열을 표시하도록 Title 컴포넌트 스토리 파일을 수정한다.
```javascript
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
```
파일을 저장한 후 브라우저를 확인해보면 설정한 내용이 잘 표시된다.

### <Button /\> 원자 컴포넌트
atoms 폴더에 Button 폴더를 만들고 index 파일을 생성하고 다음과 같이 작성한다.
```javascript
export const Button = () => {
    return <button>Button</button>
}
```
그리고 같은 폴더에서 index.stories.tsx 파일을 생성한 후 다음과 같이 작성한다.
```javascript
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
    title: 'Atoms/Button',
    component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
    },
};
```
저장 후 브라우저를 확인해 보면, 왼쪽 메뉴에 Button 메뉴가 생성된 것을 확인할 수 있다.

부모 컴포넌트로 부터 Props 데이터를 전달받도록 한다.
Button 컴포넌트가 부모 컴퍼넌트로부터 화면에 표시될 문자열을 전달받고, 사용자가 버튼을 클릭했을 때에 해당 이벤트를 부모 컴포넌트에서 사용할 수 있도록 index 파일을 수정한다.

```javascript
import styled from '@emotion/styled';

const Container = styled.button`
    border: 0;
    color: #ffffff;
    background-color: #ff5722;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 4px;

    &:hover {
        background-color: #ff5722;
        opacity: 0.8;
    }

    &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
`;

interface Props {
    readonly label: string;
    readonly onClick?: () => void;
}

export const Button = ({ label, onClick }: Props) => {
return <Container onClick={onClick}>{label}</Container>
}
```
이렇게 수정한 후 브라우저를 확인해 보면 Button 컴포넌트가 잘 표시되어 있다.

이제 스토리 파일을 수정하여 추가된 Props들을 전달받도록 한다.
```javascript
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
    title: 'Atoms/Button',
    component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        label: 'Button',
    },
    render: (args) => <Button {...args} />, 
};
```

### <Count /\> 원자 컴포넌트
앞과 동일하게 atoms 폴더 안에 Count 폴더를 만들고 index와 스토리 파일을 만든다.
```javascript
import styled from '@emotion/styled';


const Container = styled.span`
    margin: 0 16px;
    font-size: 1.2rem;
`;

interface Props {
    readonly value: number;
}

export const Count  = ({ value }: Props) => {
    return <Container>{value}</Container>;
};
```
```javascript
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
```

### <Count /\> 유기체 컴포넌트
components 폴더에 organisms 폴더를 만들고 Counter 폴더를 만들어 index 파일을 생성한 뒤 다음과 같이 작성한다.
```javascript
export const Count = () => {
    return <div>Counter</div>;
};
```
그리고 만든 Count 컴포넌트를 스토리북에 표시하기 위한 스토리 파일 같은 폴더 안에 만든다.
```javascript
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
```
이제 브라우저를 확인해보면 ORGANISMS 메뉴가 생겨져 있다.
이제 카운터 앱의 원자 컴포넌트를 조합하여 Count 컴포넌트를 만들 것이다.

organisms 폴더에 있는 Counter 폴더의 index 파일을 열고 다음과 같이 수정한다.
```javascript
import styled from '@emotion/styled';

import { Button } from "components/atoms/Button";
import { Count } from "components/atoms/Count";
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Counter = () => {

    const [count, setCount] = useState(0);

    return (
        <Container>
            <Button label='-' onClick={() => setCount(count - 1)} />
            <Count value={count} />
            <Button label='+' onClick={() => setCount(count + 1)} />
        </Container>
    );
};
```

### <CounterApp /\> 템플릿 컴포넌트
사용자가 보게 될 화면을 구성하기 위해 아토믹 디자인의 템플릿을 만들 것이다.
components 폴더에 templates 폴더를 만든 후 CounterApp 폴더를 만들고 index 파일을 만들어 다음과 같이 작성한다.
```javascript
export const CounterApp = () => {
    return <div>Counter App</div>;
};
```
그리고 만든 컴포넌트를 스토리북에 표시하기 위해 같은 폴더에 스토리북 파일을 만든다.
```javascript
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
```
다음과 같이 작성하면 스토리북의 왼쪽 메뉴에 TEMPLATES 메뉴가 추가된 것을 확인할 수 있다.
이제 화면을 구성하기 위해 CounterApp 폴더의 index 파일을 열고 수정한다.
```javascript
import styled from '@emotion/styled';

import { Title } from "components/atoms/Title";
import { Counter } from "components/organisms/Counter";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    junstify-content: center;
`;

export const CounterApp = () => {
    return (
        <Container>
            <Title title='Counter App' />
            <Counter />
        </Container>
    );
};
```

### <Home /\> 페이지 컴포넌트
CounterApp 컴포넌트는 사용자가 보게 될 화면을 구성하는 템플릿 컴포넌트이다.
이제 해당 템플릿 컴포넌트를 사용하여 사용자가 실제로 보게 될 Home 페이지 컴포넌트를 제작할 것이다.

src폴더에서 pages 폴더를 만들고 Home 폴더를 만들어 index 파일을 생성하고 다음과 같이 작성한다.
```javascript
export const Home = () => {
    return <div>Home</div>
}
```
그리고 같은 폴더에 스토리 파일을 작성한다.
```javascript
import { Meta, StoryObj } from '@storybook/react';
import { Home } from '.';

const meta: Meta<typeof Home> = {
    title: 'Pages/Home',
    component: Home,
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {
    args: {
    },
};
```
이제 Home 페이지 컴포넌트에서 실제 사용자가 보게 될 화면을 만들기 위해 index 파일을 다음과 같이 수정한다.
```javascript
import { CounterApp } from "components/templates/CounterApp"

export const Home = () => {
    return <CounterApp />
}
```
이것으로 카운터 앱 개발을 위한 모든 컴포넌트의 개발이 완료되었다.

### 카운터 앱
이제 스토리북이 아닌 실제 개발 서버를 실행하여 최종적으로 카운터 앱을 개발하도록 할 것이다.
이제 스토리북 서버는 종료한 뒤 App 파일을 열고 다음과 같이 작성한다.
```javascript
import { Home } from 'pages/Home';
import './App.css';
import styled from '@emotion/styled';

function App() {
  return <Home />
};

export default App;
```