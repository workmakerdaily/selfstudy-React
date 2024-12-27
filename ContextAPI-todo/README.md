# Context API
Context는 부모 컴포넌트로부터 자식 컴포넌트로 전달되는 데이터의 흐름과 상관없이 전역적으로 데이터를 관리할 수 있도록 한다.
전역 데이터를 Context에 저장한 후 필요한 컴포넌트에서 해당 데이터를 불러와 사용할 수 있다.
Context API를 사용하여 해당 Context의 프로바이더와 컴슈머를 생성해야한다.

Context API가 나오기 전에 리액트에서는 전역 상태를 관리하기 위해 Redux, Mobx와 같이 Flux 개념을 구현한 외부 라이브러리를 사용해야 했다.
Context API가 나온 후에도 많은 프로젝트가 Redux, Mobx와 같은 상태 관리 라이브러리를 사용하고 있고, 형재도 많은 개발자들이 이런 라이브러리들을 사용하는 것을 선호한다.

그러므로 Context API 사용 방법을 이해한 후, Reduxt나 Mobx를 공부하는 것을 추천한다.

(최근 페이스북에서 리액트의 전역 데이터를 관리하기 위한 **리코일**이라는 리액트 친화적이며 사용하기 간편한 라이브러리를 릴스했다.)

<br/>

---
# 설정
컴포넌트를 절대 경로로 추가할 수 있도록 하기 위해 tsconfig.json에 옵션을 추가한다.
```
{
  "compilerOptions": {
  	...
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  ...
}
```
그리고 Emotion과, Prettier, ESLint를 사용한다.

설치 후 .prettierrc.js 파일을 생성한다.
```
module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
}
```
그 다음 ESLint를 설정하기 위해 명령어를 실행한다.
```
npx eslint --init
```

package.json에 Prettier, ESLint 명령어를 추가한다.
```
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "format": "prettier --check ./src",
    "format:fix": "prettier --write ./src",
    "lint": "eslint ./src",
    "lint:fix": "eslint --fix ./src"
  },
```

<br/>

---

# State와 Props로 할 일 목록 앱 개발

### <Title /\> 컴포넌트
별도의 파일로 분리하여 컴포넌트를 관리한다.
src 폴더에 components 폴더 생성 후 Title 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Label = styled.h1`
    margin-top: 0;
`;

export const Title = () => {
    return (
        <Container>
            <Label>할 일 목록</Label>
        </Container>
    );
}
```

```javascript
import './App.css';
import styled from '@emotion/styled';
import { Title } from 'components/Title';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

function App() {
  
  return (
    <Container>
      <Title />
    </Container>
  );
}

export default App;
```

Title 컴포넌트에 Props를 추가하여 화면에 표시되는 문자열을 변경할 수 있도록 한다.

```javascript
interface Props {
    readonly label: string;
}

export const Title = ({ label }: Props) => {
    return (
        <Container>
            <Label>{label}</Label>
        </Container>
    );
}
```

### <Button /\> 컴포넌트
별도의 파일로 분리하여 컴포넌트를 관리한다.
src 폴더에 components 폴더 생성 후 Button 폴더를 만들고 index.tsx 파일을 생성한다.
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

export const Button = () => {
    return <Container onClick={() => console.log('test')}>삭제</Container>
}
```

Button 컴포넌트에 Props를 사용하기 위해 수정한다.
```javascript
interface Props {
    readonly label: string;
    readonly onClick?: () => void;
}

export const Button = ({ label, onClick }: Props) => {
    return <Container onClick={onClick}>{label}</Container>
}
```

### <ToDoItem /\> 컴포넌트
별도의 파일로 분리하여 컴포넌트를 관리한다.
src 폴더에 components 폴더 생성 후 ToDoItem 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
import styled from '@emotion/styled';
import { Button } from 'components/Button';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`;

const Label = styled.div`
    flex: 1;
    font-size: 1.2rem;
    margin-right: 16px;
`;

export const ToDoItem = () => {
    return (
        <Container>
            <Label>리액트 공부하기</Label>
            <Button label='삭제' />
        </Container>
    )
}
```
부모 컴포넌트로부터 데이터를 전달받아 화면에 표시하도록 리팩토링한다.
```javascript
interface Props {
    readonly label: string;
    readonly onDelete?: () => void;
}

export const ToDoItem = ({ label, onDelete }: Props) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Button label='삭제' onClick={onDelete} />
        </Container>
    )
}
```

### <ToDoList /\> 컴포넌트
별도의 파일로 분리하여 컴포넌트를 관리한다.
src 폴더에 components 폴더 생성 후 ToDoList 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
import styled from '@emotion/styled';
import { ToDoItem } from 'components/ToDoItem';

const Container = styled.div`
display: flex;
flex-direction: column;
`;

export const ToDoList = () => {
    return (
        <Container>
            <ToDoItem label="리액트 공부하기" />
            <ToDoItem label="운동하기기" />
            <ToDoItem label="책 읽기" />
        </Container>
    )
}
```
부모 컴포넌트로부터 데이터를 전달받아 화면에 표시하도록 리팩토링한다.
```javascript
interface Props {
    readonly toDoList: ReadonlyArray<string>;
    readonly onDelete?: (todo: string) => void;
}

export const ToDoList = ({ toDoList, onDelete }: Props) => {
    return (
        <Container>
            {toDoList.map((todo) => (
                <ToDoItem
                    key={todo}
                    label={todo}
                    onDelete={() => {
                        if (typeof onDelete === 'function') onDelete(todo);
                    }}
                />
            ))}
        </Container>
    );
};
```
map을 통해 여러 개 표시되는 ToDoItem을 보면 생성하지 않았지만 key라는 Props를 볼 수 있다. 리액트에서는 map과 같이 루프를 통해 화면에 동일한 컴포넌트를 표시할 때에는 key를 꼭 설정해 주어야 한다.
key는 동일한 컴포넌트 안에서 해당 컴포넌트를 인식하기 위한 것으로, 리액트는 복수의 동일한 컴포넌트에서 key를 통해 각각의 컴포넌트를 인지할 수 있다.
key 값은 반드시 유일한 값이어야 한다.

### useState로 할 일 목록 데이터 관리하기
리액트 컴포넌트 안에서 데이터 변경이 가능한 State를 사용하여 할 일 목록 데이터를 다루게 할 것이다.
```javascript
function App() {

  const [toDoList, setToDoList] = useState(['리액트 공부하기', '운동하기', '책 읽기']);
  
  const onDelete = (todo: string) => {
    setToDoList(toDoList.filter((item) => item !== todo));
  }

  return (
    <Container>
      <Title label='할 일 목록' />
      <ToDoList toDoList={toDoList} onDelete={onDelete} />
    </Container>
  );
}
```

### <DataView /\> 컴포넌트
Context를 이해하기 위해 DataView 컴포넌트를 만들고, Title 컴포넌트와 ToDoList 컴포넌트를 묶을 것이다.

src 폴더에 components 폴더 생성 후 DataView 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { ToDoList } from 'components/ToDoList';

const Container = styled. div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 32px;
    border-radius: 8px;
`;

interface Props {
    readonly toDoList: ReadonlyArray<string>;
    readonly onDelete?: (todo: string) => void;
}

export const DataView = ({ toDoList, onDelete }: Props) => {
    return (
        <Container>
            <Title label='할 일 목록' />
            <ToDoList toDoList={toDoList} onDelete={onDelete} />
        </Container>
    )
}
```

### <TextInput /\> 컴포넌트
데이터를 입력하는 기능을 구현하기 위해 TextInput 컴포넌트를 만든다.

src 폴더에 components 폴더 생성 후 TextInput 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
import styled from '@emotion/styled';

const Input = styled.input`
    font-size: 1.2rem;
    padding: 8px;
`;

interface Props {
    readonly value: string;
    readonly onChange: (text: string) => void;
}

export const TextInput = ({ value, onChange }: Props) => {
    return (
    <Input value={value} onChange={(event)  => onChange(event.target.value)} />
    );
}
```

### 추가 버튼 컴포넌트
해당 할 일을 할 일 목록 State에 저장하여 할 일 목록에 표시되도록 할 필요가 있다. 사용자가 추가 버튼 컴포넌트를 클릭하면, 할 일 State 데이터를 할 일 목록 State 데이터로 저장되도록 할 것이다.

Button 컴포넌트를 활용한다.
```javascript
function App() {

  const [toDoList, setToDoList] = useState(['리액트 공부하기', '운동하기', '책 읽기']);
  
  const [toDo, setToDo] = useState('');

  const onDelete = (todo: string) => {
    setToDoList(toDoList.filter((item) => item !== todo));
  }

  return (
    <Container>
      <DataView toDoList={toDoList} onDelete={onDelete} />
      <TextInput value={toDo} onChange={setToDo} />
      <Button label='추가' />
    </Container>
  );
```
추가 버튼과 삭제 버튼이 동일한 색상이 아니도록 색상 Props를 추가한다.
```javascript
import styled from '@emotion/styled';

interface ContainerPorps {
    readonly color: string;
}

// 정의한 인터페이스를 Emotion 컴포넌트가 인지할 수 있도록 타입 스크립트의
// 제네릭을 통해 전달했다.
const Container = styled.button<ContainerPorps>`
    border: 0;
    color: #ffffff;
    background-color: ${(props) => props.color};
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 4px;

    &:hover {
        background-color: ${(props) => props.color};
        opacity: 0.8;
    }

    &:active {
        box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
`;

interface Props {
    readonly label: string;
    readonly color?: string;
    readonly onClick?: () => void;
}

export const Button = ({ label, color = '#ff5722', onClick }: Props) => {
    return <Container color={color} onClick={onClick}>{label}</Container>
}
```

이제 추가 버튼을 클릭하여 현재 작성한 할 일 데이터를 할 일 목록 데이터에 추가하고, 작성한 할 일을 입력창에서 제거하도록 만든다.
```javascript
  const onAdd = () => {
    if (toDo === '') return;

    setToDoList([...toDoList, toDo]);
    setToDo('');
  }

  return (
    <Container>
      <DataView toDoList={toDoList} onDelete={onDelete} />
      <TextInput value={toDo} onChange={setToDo} />
      <Button label='추가' color='#304FFE' onClick={onAdd} />
    </Container>
  );
}
```

### <ToDoInput /\> 컴포넌트
TextInput 컴포넌트와 할 일 추가 버튼을 하나의 컴포넌트로 묶을 것이다.
```javascript
import { useState } from 'react';
import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';


const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(0 0 0 / 75%);
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #ffffff;
    padding: 32px;
    border-radius: 8px;
    z-index: 1;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface Props {
    readonly onAdd: (toDo: string) => void;
}

export const ToDoInput = ({ onAdd }: Props) => {
    const [toDo, setToDo] = useState('');

    const onAddToDo = () => {
        if (toDo === '') return;

        onAdd(toDo);
        setToDo('');
    };

    return (
        <Container>
            <Background />
            <Contents>
                <Title label='할 일 추가' />
                <InputContainer>
                    <TextInput value={toDo} onChange={setToDo} />
                    <Button label='추가' color='#304FFE' onClick={onAddToDo} />
                </InputContainer>
            </Contents>
        </Container>
    );
};
```
App.tsx 파일을 다음과 같이 변경한다.
```javascript
  const onAdd = (toDo: string) => {
    setToDoList([...toDoList, toDo]);
  }

  return (
    <Container>
      <DataView toDoList={toDoList} onDelete={onDelete} />
      <ToDoInput onAdd={onAdd} />
    </Container>
  );
}
```

### <ShowInputButton /\> 컴포넌트
ToDoInput 컴포는터를 필요할 때에만 표시되도록 변경한다.

src 폴더에 components 폴더 생성 후 ShowInputButton 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
import styled from '@emotion/styled';
import { Button } from 'components/Button';

const Container = styled.div`
    position: absolute;
    right: 40px;
    bottom: 40px;
    z-index: 1;
`;

interface Props {
    readonly show: boolean;
    readonly onClick: () => void;
}

export const ShowInputButton = ({ show, onClick }: Props) => {
    return (
        <Container>
            <Button
                label={show ? '닫기' : '할 일 추가'}
                color={show ? undefined : '#304FFE'}
                onClick={onClick}
            />
        </Container>
    );
};
```

### <InputContainer /\> 컴포넌트
SowInputButton 컴포넌트와 ToDoInput 컴포넌트를 하나로 묶을 것이다.
(예제를 위함이며 실제로는 이렇게 복잡한 컴포넌트를 만들지 않는다.)

src 폴더에 components 폴더 생성 후 InputContainer 폴더를 만들고 index.tsx 파일을 생성한다.

리액트 컴포넌트는 반드시 하나의 노드를 부모로 가지는 HTML을 반환해야 하기 때문에 Fragment(<></\>)를 사용했다.
```javascript
import { useState } from "react";
import { ToDoInput } from "components/ToDoInput";
import { ShowInputButton } from "components/ShowInputButton";

interface Props {
    readonly onAdd: (toDo: string) => void;
}

export const InputContainer = ({ onAdd }: Props) => {
    const [showToDoInput, setShowToDoInput] = useState(false);

    const onAddToDo = (toDo: string) => {
        onAdd(toDo);
        setShowToDoInput(false);
    };

    return (
        <>
            {showToDoInput && <ToDoInput onAdd={onAddToDo} />}
            <ShowInputButton
                show={showToDoInput}
                onClick={() => setShowToDoInput(!showToDoInput)}
            />
        </>
    );
};
```

<br/>

---

# Context API로 할 일 목록 앱 개발
지금은 리액트의 Props와 State만을 사용하여 부모 컴포넌트로부터 자식 컴포넌트로 데이터를 전달하는 방식으로 개발을 했다.
이렇게 하면 변경이 가능한 State 데이터를 사용하기 위해 공통 부모 컴포넌트부터 해당 데이터를 사용하는 컴포넌트까지 Props로 데이터를 전달해야 한다. 따라서 해당 데이터를 실제로 사용하지 않는 컴포넌트들도 부모 컴포넌트로 데이터를 전달받아야 하고, 다시 자식 컴포넌트로 전달해야 하는 문제가 발생한다.

이 불편함 해결을 위해 Context API를 사용하여 데이터를 필요한 곳에만 사용할 것이다.

### <ToDoList /\> 생성
Context API를 사용하기 위해 Context를 생성하여 공통 부모 컴포넌트에는 Provider를 제공하고, 데이터를 사용하는 곳에는 Consumer를 통해 데이터를 사용한다.

Context를 생성하기 위해 src 폴더에 contexts 폴더 생성 후 ToDoList 폴더를 만들고 index.tsx 파일을 생성한다.
```javascript
// Context를 생성하기 위해서는 createContext 훅을 사용해야 한다.
import { createContext, useState } from "react";

// creacteContext 훅을 사용하여 
// Context를 생성하 때에는 Context의 기본값을 설정해야 한다.
// 타입스크립트의 인터페이스로 
// 해당 Context가 가져야 할 데이터와 함수의 타입을 정의하고 지정한다.
interface Context {
    readonly toDoList: string[];
    readonly onAdd: (toDo: string) => void;
    readonly onDelete: (toDo: string) => void;
}

const ToDoListContext = createContext<Context>({
    toDoList: [],
    // eslint-disable @typescript-eslint/no-empty-function
    onAdd: (): void => {},
    // eslint-disable @typescript-eslint/no-empty-function
    onDelete: (): void => {},
});

// 부모 컴포넌트로부터 한 개 또는 복수 개의 컴포넌트를 children으로 전달받는다.
interface Props {
    children: JSX.Element | JSX.Element[];
}

// 전역적으로 관리할 데이터는 할 일 목록 데이터이므로 useState를 사용하여 작성한다.
const ToDoListContextProvider = ({ children }: Props) => {
    const [toDoList, setToDoList] = useState([
        '리액트 공부하기',
        '운동하기',
        '책 읽기',
    ]);

    const onDelete = (todo: string) => {
        setToDoList(toDoList.filter((item) => item !== todo));
    };

    const onAdd = (toDo: string) => {
        setToDoList([...toDoList, toDo]);
    };


// createContext로 생성한 Context의 Provider를 사용하여 지금까지 생성한 
// 할 일 목록 데이터와 onAdd, onDelete 함수를 설정 했으며, 
// Provider 하위에는 부모 컴포넌트로부터 전달받은 리액트 컴포넌트를 표시하도록 했다.
    return (
        <ToDoListContext.Provider
            value={{
                toDoList,
                onAdd,
                onDelete,
            }}>
            {children}
        </ToDoListContext.Provider>
    );
};

// 생성한 Context의 Provider와 Context를 외부에서도 사용이 가능하도록 export했다.
export { ToDoListContext, ToDoListContextProvider };
```

### <App /\> 컴포넌트에 Provider 제공
Context를 사용하기 위해 데이터를 사용하는 컴포넌트의 공통 부모 컴포넌트에 Context의 Provider를 제공할 필요가 있다.

App 컴포넌트에 Provider를 제공하기 위해 다음과 같이 수정한다.
Context를 통해 할 일 목록 데이터를 관리하게 되므로 State를 사용하여 데이터를 관리할 필요가 없다.

Context에서 Provider를 불러와 App 컴포넌트에 제공한다.
```javascript
import './App.css';
import styled from '@emotion/styled';
import { DataView } from 'components/DataView';
import { InputContainer } from 'components/InputContainer';
import { ToDoListContextProvider } from 'contexts/ToDoList';


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

function App() {

  return (
    <Container>
      <ToDoListContextProvider>
      <DataView />
      <InputContainer />
      </ToDoListContextProvider>
    </Container>
  );
}

export default App;
```
DataView 컴포넌트와 InputContainer 컴포넌트의 에러가 발생하므로 수정한다.
```javascript
import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { ToDoList } from 'components/ToDoList';

const Container = styled. div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 32px;
    border-radius: 8px;
`;

export const DataView = () => {
    return (
        <Container>
            <Title label='할 일 목록' />
            <ToDoList />
        </Container>
    )
}

```
```javascript
import { useState } from "react";
import { ToDoInput } from "components/ToDoInput";
import { ShowInputButton } from "components/ShowInputButton";

export const InputContainer = () => {
    const [showToDoInput, setShowToDoInput] = useState(false);

    const onClose = () => {
        setShowToDoInput(false);
    };

    return (
        <>
            {showToDoInput && <ToDoInput onClose={onClose} />}
            <ShowInputButton
                show={showToDoInput}
                onClick={() => setShowToDoInput(!showToDoInput)}
            />
        </>
    );
};
```

### <ToDoList /\> 컴포넌트: Consumer를 사용하여 Context 데이터 사용하기
Context의 데이터를 사용하기 위해서는 Context의 Consumer를 사용하여 데이터를 소비할 필요가 있다.

리액트의 클래스 컴포넌트가 주로 사용되던 때에는 Context의 Consumer를 사용하였으나 현재 함수 컴포넌트가 주로 사용되는 리액트에서는 Consumer 대신 useContext 훅을 사용하여 데이터를 소비한다.


ToDoList 컴포넌트에서 useContext 훅을 사용하여 Context의 데이터를 사용하도록 수정한다.
```javascript
import { useContext } from 'react';
import styled from '@emotion/styled';
import { ToDoItem } from 'components/ToDoItem';
import { ToDoListContext } from 'contexts/ToDoList';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ToDoList = () => {
  
    const { toDoList, onDelete } = useContext(ToDoListContext);

    return (
        <Container>
            {toDoList.map((todo) => (
                <ToDoItem
                    key={todo}
                    label={todo}
                    onDelete={() => {
                        if (typeof onDelete === 'function') onDelete(todo);
                    }}
                />
            ))}
        </Container>
    );
};

```
위와 같이 변경 후 발생하는 에러는 다음과 같이 수정하면 해결된다.

### <ToDoInput /\> 컴포넌트: Consumer를 사용하여 Context 데이터 사용하기
ToDoInput 컴포넌트에서 Context를 사용하려 할 일 목록 데이터를 추가하도록 변경한다.
```javascript
import { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { ToDoListContext } from 'contexts/ToDoList';


const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(0 0 0 / 75%);
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #ffffff;
    padding: 32px;
    border-radius: 8px;
    z-index: 1;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface Props {
    readonly onClose: () => void;
}

export const ToDoInput = ({ onClose }: Props) => {

    const { onAdd } = useContext(ToDoListContext);
    const [toDo, setToDo] = useState('');

    const onAddToDo = () => {
        if (toDo === '') return;

        onAdd(toDo);
        setToDo('');
        onClose();
    };

    return (
        <Container>
            <Background />
            <Contents>
                <Title label='할 일 추가' />
                <InputContainer>
                    <TextInput value={toDo} onChange={setToDo} />
                    <Button label='추가' color='#304FFE' onClick={onAddToDo} />
                </InputContainer>
            </Contents>
        </Container>
    );
};
```