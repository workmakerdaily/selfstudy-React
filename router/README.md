# Router
리액트 웹 애플리케이션은 react-router라는 외부 라이브러리를 사용하여 페이지 이동을 구현한다.

앞에서 만든 toDoList를 활용한다.

### react-router
```bash
npm install react-router-dom@6 --save
```
설치가 완료되면 src의 indext 파일을 열고 수정한다.
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```
react-router가 제공하는 BrowserRouter를 추가하여 사용한다.
그리고 src폴더의 App파일을 열고 다음과 같이 수정한다.
```javascript
import './App.css';
import styled from '@emotion/styled';
import { DataView } from 'components/DataView';
import { InputContainer } from 'components/InputContainer';
import { ToDoListContextProvider } from 'contexts/ToDoList';
import { Route, Routes } from 'react-router-dom';


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

const NotFound = styled.div`
  text-align: center;
`;

function App() {

  return (
    <Container>
      <ToDoListContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <DataView />
                <InputContainer />
              </>
            }
          />
          <Route
            path='*'
            element={
              <NotFound>
                404
                <br />
                NOT FOUND
              </NotFound>
            }
          />
        </Routes>
      </ToDoListContextProvider>
    </Container>
  );
}

export default App;
```
URL에 따라 변경되는 부분은 react-router의 <Routes /\> 컴포넌트 안에 정의해야 한다. 
특정 URL에 해당하는 컴포넌트를 표시하기 위해서는 다음과 같이 react-router의 <Route /\> 컴포넌트를 <Routes /\> 컴포넌트 안에서 사용해야한다.
```javascript
<Routes>
  <Route path='특정 URL' element={URL에 해당하는 컴포넌트} />
</Routes>
```

### <DataView /\> 페이지 컴포넌트
```javascript
import './App.css';
import styled from '@emotion/styled';
import { DataView } from 'components/DataView';
import { InputContainer } from 'components/InputContainer';
import { ToDoListContextProvider } from 'contexts/ToDoList';
import { Route, Routes } from 'react-router-dom';


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

const NotFound = styled.div`
  text-align: center;
`;

function App() {

  return (
    <Container>
      <ToDoListContextProvider>
        <Routes>
          <Route
            path='/'
            element={<DataView />} />
          <Route
            path='*'
            element={
              <NotFound>
                404
                <br />
                NOT FOUND
              </NotFound>
            }
          />
        </Routes>
      </ToDoListContextProvider>
    </Container>
  );
}

export default App;
```
다음과 같이 App 파일을 수정하고 ShowInput 컴포넌트를 각 페이지에 구현하여 페이지 전환을 위한 버튼으로 사용할 것이다.

DataView 컴포넌트를 열어 다음과 같이 수정한다.
```javascript
import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { ToDoList } from 'components/ToDoList';
import { useNavigate } from 'react-router';
import { ShowInputButton } from 'components/ShowInputButton';

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

    // react-router에서 링크가 아닌 자바스크립트로 페이지를 전환하기 위해서는
    // react-router-dom이 제공하는 useNavigate 훅을 사용해야 한다.
    const navigate = useNavigate();

    return (
        <Container>
            <Title label='할 일 목록' />
            <ToDoList />
            <ShowInputButton show={false} onClick={() => navigate('/add')} />
        </Container>
    )
}

```

### <ToDoInput /\> 페이지 컴포넌트
할일 데이터를 추가하기 위해 ToDoInput 컴포넌트를 만들었다.
이제 이 컴포넌트를 활용하여 할 일 추가 페이지를 구현한다.
App 파일을 다음과 같이 수정한다.
```javascript
import './App.css';
import styled from '@emotion/styled';
import { DataView } from 'pages/DataView';
import { Route, Routes } from 'react-router-dom';
import { InputContainer } from 'components/InputContainer';
import { ToDoListContextProvider } from 'contexts/ToDoList';
import { ToDoInput } from 'components/ToDoInput';



const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

const NotFound = styled.div`
  text-align: center;
`;

function App() {

  return (
    <Container>
      <ToDoListContextProvider>
        <Routes>
          <Route path='/' element={<DataView />} />
          <Route path='/add' element={<ToDoInput />} />
        </Routes>
      </ToDoListContextProvider>
    </Container>
  );
}

export default App;
```
다음과 같이 수정하면 에러가 발생한다.
ToDoInput 컴포넌트는 부모 컴포넌트로부터 Props를 전달받도록 구현되어 있기 때문이다.
ToDoInput을 다음과 같이 수정한다.
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

export const ToDoInput = () => {

    const { onAdd } = useContext(ToDoListContext);
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
ToDoInput 컴포넌트는 페이지로 활용되므로 DataView와 같이 componets 폴더에서 pages 폴더로 이동시킨다.

ToDoInput 페이지 컴포넌트를 보면 할 일 목록 위에 표시하기 위해 다이얼로 그 형태의 디자인을 띠고 있으며, 오른쪽 하단에 닫기 버튼이 없어 할 일 목록 페이지로 이동할 수 없게 되어있다.
또한 데이터를 입력하고 추가 버튼을 클릭해도 여전히 할 일 추가 페이지가 표시되고 있다.

ToDoInput 컴포넌트를 열고 다음과 같이 수정한다.
```javascript
import { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { useNavigate } from 'react-router';
import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { ToDoListContext } from 'contexts/ToDoList';
import { ShowInputButton } from 'components/ShowInputButton';


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

export const ToDoInput = () => {

    const navigate = useNavigate();

    const { onAdd } = useContext(ToDoListContext);
    const [toDo, setToDo] = useState('');

    const onAddToDo = () => {
        if (toDo === '') return;

        onAdd(toDo);
        setToDo('');
        navigate('/');
    };

    return (
        <Container>
            <Contents>
                <Title label='할 일 추가' />
                <InputContainer>
                    <TextInput value={toDo} onChange={setToDo} />
                    <Button label='추가' color='#304FFE' onClick={onAddToDo} />
                </InputContainer>
            </Contents>
                <ShowInputButton show={true} onClick={() => navigate('/')} />
        </Container>
    );
};
```

### <Header /\> 컴포넌트 추가
react-router는 페이지별로 동작하도록 변경하는 기능 외에도 다양한 기능을 제공하고 있다.

일반적인 웹 사이트는 페이지와 관계없이 항상 표시되는 Header나 Footer, 메뉴 등을 가지고 있다.
Header 컴포넌트에서는 react-router가 제공하는 Link 컴포넌트를 활용하여 페이지를 이동할 것이다.

components 폴더에 Header 폴더를 만든 후 index 파일을 만들고 다음과 같이 작성한다.
```javascript
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #304ffe;
    padding: 8px 0;
    margin: 0;
`;

const StyledLink = styled(Link)`
    color: #ffffff;
    font-size: 20px;
    text-decoration: none;
`;

export const Header = () => {
    return (
        <Container>
            <StyledLink to='/'>할 일 목록 앱앱</StyledLink>
        </Container>
    )
}
```
그 후 App 파일을 열어 다음과 같이 수정한다.
```javascript
import './App.css';
import styled from '@emotion/styled';
import { DataView } from 'pages/DataView';
import { Route, Routes } from 'react-router-dom';
import { ToDoListContextProvider } from 'contexts/ToDoList';
import { ToDoInput } from 'pages/ToDoInput';
import { Header } from 'components/Header';



const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;

const NotFound = styled.div`
  text-align: center;
`;

function App() {

  return (
    <Container>
      <ToDoListContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<DataView />} />
          <Route path='/add' element={<ToDoInput />} />
        </Routes>
      </ToDoListContextProvider>
    </Container>
  );
}

export default App;
```