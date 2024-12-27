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
```bash
npm install --save @emotion/react @emotion/styled
```

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

# 개발
### <Container /\> 컴포넌트
```javascript
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
```

### <Title /\> 컴포넌트
```javascript
const Title = styled.h1`
  margin-bottom: 32px;
`;
```

### <Label /\> 컴포넌트
```javascript
const Contents = styled.div`
  display: flex;
  align-items: center:
  justify-content: center;
`;

const Label = styled.span`
  margin: 0 16px;
  font-size: 1.2rem;
`;
```

### <Button /\> 컴포넌트
```javascript
const Button = styled.button `
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
```

### State
리액트 컴포넌트의 현재 상태를 의미한다.
```javascript
  // const 배열 = useState(데이터 초깃값);
  // 배열[0]: 데이터 초깃값이 들어가는 함수
  // 배열[1]: 데이터를 수정할 수 있는 set 함수
  const [counter, setCounter] = useState(0);
```

버튼에 +, - 기능을 부여한다.
```javascript
  const sub = () => {
    setCounter(counter - 1);
  };
  
  const add = () => {
    setCounter(counter + 1);
  };
```

### props
<Button /\>과 <Label /\> 컴포넌트를 별도의 파일로 분리해 보도록 한다.
src 폴더 밑에 components 폴더를 만들고 Button 폭더를 만든 후 index.tsx 파일을 생성한다.

그리고 동일한 <Button /\>과 동일한 컴포넌트를 생성한다.
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
```

부모 컴포넌트로부터 Props를 통해 데이터를 전달받기 위해 다음과 같이 수정한다.
```javascript
// Props를 통해 전달받을 데이터를 타임스크립트의 interface를 사용하여 정의했다.
// interface는 객체의 스펙이나 함수의 매개 변수, 클래스 등을 정의할 때 사용한다.
// interface 인터페이스명 { 변수명: 변수타입 };
interface Props {
    readonly label: string;
    readonly onClick: () => void;
}

export const Button = ({ label, onClick }: Props) => {
    return <Container onClick={onClick}>{label}</Container>;
};
```

위와 같은 방식으로 <Label /\>도 생성한다.
```javascript
import styled from '@emotion/styled';

const Container = styled.span`
margin: 0 16px;
font-size: 1.2rem;
`;

interface Props {
    readonly data: number;
}

export const Label = ({ data }: Props) => {
    return <Container>{data}</Container>
}
```

### 최종
```javascript
function App() {
  
  const [counter, setCounter] = useState(0);

  const sub = () => {
    setCounter(counter - 1);
  };
  
  const add = () => {
    setCounter(counter + 1);
  };

  return (
    <Container>
      <Title>Count App</Title>
      <Contents>
        <Button label='-' onClick={sub} />
        <Label data={counter} />
        <Button label='+' onClick={add} />
      </Contents>
    </Container>
  );
}

export default App;
```