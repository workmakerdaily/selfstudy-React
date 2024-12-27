# Fetch API
자바스크립트에서는 사용자의 동작 또는 페이지를 표시한 후 서버에 데이터를 요청하거나 저장하는 데 Ajax를 사용한다.
최근에는 Fetch API를 사용하여 서버에 있는 데이터를 가져오거나 저장한다.
Fetch API의 메소드 옵션을 사용하면, 다양한 방식으로 서버와 정보를 주고받을 수 있다. 보통은 서버가 RESTfull API를 준비하고 Fetch API의 메소드 옵션을 상요하여 이 API를 사용하는 방식이다.

Fetch API 대신 Axios를 사용하는 곳도 많다.
Axios는 Fetch API 보다 좀 더 사용하기 쉽게 만들어진 라이브러리다.

JSONPlaceholder라는 서비스를 이용하여 가상의 블로그 글 목록을 가져오고, 새로운 블로그 글을 저장하는 방법을 사용할 것이다.

JSONPlaceholder 무료이지만 테스트용으로 제공되는 데이터 이므로 실제 새로운 데이터를 저장하거나 불러올 수 없으며, 제공하는 데이터만 불러올 수 있다.
또한 새로운 데이터를 저장하는 URL이 존재하나, 실제로 데이터가 저장되지는 않는다.

JSONPlaceholder 사이트에 접속해 어떤 데이터가 제공되고 있는지 확인해본다.
- https://jsonplaceholder.typicode.com/

JSONPlaceholder에서 제공하는 GET /posts API를 사용하여 블로그 글의 제목과 본문의 일부분을 리스트 형식으로 표시하도록 할 것이다.

### <Header /\> 컴포넌트
componets 폴더에 Header 폴더를 만들고 index 파일에 다음과 같이 작성한다.
```javascript
import styled from '@emotion/styled';

const Container = styled.div`
    background-color: #ffffff;
    padding: 20px;
    width: calc(100% - 40px);
    margin-bottom: 20px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

export const Header = () => {
    return (
        <Container>
            <Title>블로그 포스트</Title>
        </Container>
    )
}
```

### <BlogPost /\> 컴포넌트
JSONPlaceholder가 제공하는 블로그 글 목록 API는 여러 블로그 글을 리스트 형식으로 제공하기 때문에 하나의 블로그 글 컴포넌트를 만든 후 반복문을 사용하면, 블로그 글 목록 화면을 구성할 수 있다.

componets 폴더에 BlogPost 폴더를 만들고 index 파일에 다음과 같이 작성한다.
BlogPost 컴포넌트에 Props를 추가하여 부모 컴포넌트에서 전달받을 데이터를 표시하도록한다.
```javascript
import styled from '@emotion/styled';

const Container = styled.div`
    background-color: #ffffff;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 10px 10px 30px #d9d9d9, -10px -10-x 30px #ffffff;
    max-width: 800px;
`;

const Title = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
`;

const Body = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface Props {
    readonly title: string;
    readonly body: string;
}

export const BlogPost = ({title, body}: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Body>{body}</Body>
        </Container>
    )
}
```
그리고 BlogPost 컴포넌트의 제목과 본문을 설정하기 위해 App 파일을 다음과 같이 수정한다.
```javascript
import { Header } from 'components/Header';
import './App.css';
import styled from '@emotion/styled';
import { BlogPost } from 'components/BlogPost';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
  overflow: scroll;
`;

function App() {

  return (
    <Container>
      <Header />
      <BlogPost 
      title='sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
      body='quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      />
    </Container>
  );
}

export default App;
```

### 블로그 글 목록 State
블로그 글 목록 State 데이터를 만들어 여러 개의 블로그 글을 화면에 표시하도록 할 것이다.
App 파일을 다음과 같이 수정한다.
```javascript
import { Header } from 'components/Header';
import './App.css';
import styled from '@emotion/styled';
import { BlogPost } from 'components/BlogPost';
import { useState } from 'react';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
  overflow: scroll;
`;

// 타입스크립트에는 제네릭 기능을 제공하여 
// 파라미터의 타입을 명확하게 지정할 수 있다.
// 이 제너릭을 사용하여 State 변수의 타입을 
// 명확하게 지정하기 위해 Post라는 인터페이스를 정의 한다.
interface Post {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly body: string;
}

function App() {

  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);

  return (
    <Container>
      <Header />
      {/* map을 사용하여 동일한 컴포넌트를 반복적으로 표시하므로 key값을 반드시 설정한다 */}
      {posts.map((post) => (
        <BlogPost key={post.id} title={post.title} body={post.body} />
      ))}
    </Container>
  );
}

export default App;

```
아래 링크를 통해 JSONPlaceholder가 제공하는 블로그 글 목록을 다운로드 한다.
- GET /posts: https://jsonplaceholder.typicode.com/posts

그리고 src에 mock 폴더를 생성하고 post.json 이라는 이름으로 해당 파일을 복사한다.

파일을 복사한 후 App 파일을 수정한다.
```javascript
import { Header } from 'components/Header';
import './App.css';
import styled from '@emotion/styled';
import { BlogPost } from 'components/BlogPost';
import { useEffect, useState } from 'react';
import mockPosts from 'mock/posts.json';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
  overflow: scroll;
`;

// 타입스크립트에는 제네릭 기능을 제공하여 
// 파라미터의 타입을 명확하게 지정할 수 있다.
// 이 제너릭을 사용하여 State 변수의 타입을 
// 명확하게 지정하기 위해 Post라는 인터페이스를 정의 한다.
interface Post {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly body: string;
}

function App() {

  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);

  // useEffect 훅은 리액트의 함수 컴포넌트에서 클래스 컴포넌트의
  // 라이프사이클 함수와 비슷한 역할을 한다.
  useEffect(() => {
    setTimeout(() => {
      setPosts(mockPosts);
    }, 1000);
  }, []);

  return (
    <Container>
      <Header />
      {posts.map((post) => (
        <BlogPost key={post.id} title={post.title} body={post.body} />
      ))}
    </Container>
  );
}

export default App;
```

### useEffect 훅
useEffect 훅은 다음과 같은 형태로 사용이 가능하다.
```javascript
useEffect(() => {
  ...
}, []);
```
useEffect 훅의 첫 번째 매개변수에는 콜백 함수를 설정할 수 잇으며, 이 콜백 함수는 useEffect 훅의 역할을 정의한다.
두 번째 매개 변수에는 배열을 전달하는데 빈 배열을 전달하게 되면 컴포넌트가 처음 화면에 표시된 후 한 번만 호출하게 된다.

두 번째 매개 변수인 배열을 생략하는 경우 컴포넌트가 처음 화면에 표시된 후에도 한 번 실행되며, Props나 State의 변경에 의해 컴포넌트가 리렌더링되면 useEffect 훅이 다시 실행된다.
```javascript
useEffect(() => {
  ...
});
```
useEffect 훅의 역할을 정의하는 첫 번째 매개 변수인 콜백 함수는 함수를 반환할 수 있다.
컴포넌트가 화면에서 사라진 후 이 함수가 호출되며 라이브러리와 연동을 해제하거나 타이머를 해제하는데 사용한다.
```javascript
useEffect(() => {
  ...
  Return () => {
    ...
  };
});
```

useEffect 훅의 두 번째 매개 변수로는 배열을 전달할 수 있다.
두 번째 매개 변수 배열에 특정 변수를 설정하여 전달하면 전달된 변수가 변경될 때에만 이 함수가 호출되도록 설정할 수 있다.
```javascript
useEffect(() => {
  ...
}, [posts]);
```
두 번째 매개 변수로 posts 변수를 전달하는 useEffect 훅은 컴포넌트가 화면에 표시된 후 한 번 호출되며, post 변수의 값에 변경 사항이 발생하면 이 변경 사항을 감지하고 useEffect 훅의 콜백 함수를 실행하게 된다.

useEffect 훅은 한 컴포넌트 안에서 여러 번 정의하여 사용할 수 있다.
```javascript
useEffect(() => {
  ...
}, []);
  
useEffect(() => {
  ...
}, [posts]);
```

### Fetch API로 데이터 가져오기
현재 블로그 글 목록의 데이터는 다운로드한 JSON 파일을 표시하고 있다.
이제 Fetch API를 사용하여 실제 JSONPlaceholder의 API를 호출하도록 변경할 것이다.

App 파일을 다음과 같이 수정한다.
```javascript
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error) => {
        console.error(error);
      });
  }, []);
```

Fetch API는 다음과 같이 사용하여 서버에 요청을 보내고 데이터를 받아올 수 있다.
```javascript
fetch(URL, 옵션)
  // 서버로부터 전달 받은 데이터를 JSON으로 파싱
  .then((response) => response.json())
  // JSON으로 파싱한 데이터를 전달받아 State에 저장
  .then((json) => setPosts(json))
  // 에러 처리
  .catch((error) => {
    });
});
```
서버에 요청을 보내기 위한 URL을 설정한 후 필요한 경우 옵션을 설정할 수 있다.
```javascript
fetch(URL, {
  method: 'POST', // 사용할 메소드를 선택(GET,POST,PUT,DELETE)
  )
  headers: { 'content-Type', 'application/json' }, // 요청의 headers에 전달할 값
  body: JSON.springfy(data), // 요청의 body에 전달할 값
  mode: 'cors', // cors, no-cors, same-origin 등과 값은 값을 설정
  credentials: 'include', // 자격 증명을 위한 옵션 설정 (include, same-origin, omit)
  cache: 'no-cache', // 캐시 사용여부 (no-cache, reload, force-cache, only-if-cached)
})
```
Fetch API를 사용하는 도중 에러가 발생하면 catch 부분이 실행된다.
catch 부분은 에러가 발생하지 않으면 실행되지 않으므로 이 부분에 정상적으로 동작햇을 때의 비즈니스 로직을 작성하지 않도록 주의한다.

### <Button /\> 컴포넌트
toDoList에서 사용한 Button 폴더를 복사하여 붙어 넣었다.
App을 다음과 같이 수정한다.
```javascript
import { Header } from 'components/Header';
import './App.css';
import styled from '@emotion/styled';
import { BlogPost } from 'components/BlogPost';
import { useEffect, useState } from 'react';
import { Button } from 'components/Button';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
  overflow: scroll;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 40px;
  bottom: 40px;
`;

interface Post {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly body: string;
}

function App() {

  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Header />
      {posts.map((post) => (
        <BlogPost key={post.id} title={post.title} body={post.body} />
      ))}
      <ButtonContainer>
        <Button label='등록' />
      </ButtonContainer>
    </Container>
  );
}

export default App;
```

### <Form /> 컴포넌트
블로그에 글을 등록할 수 있는 Form 컴포넌트를 만들 것이다.

components 폴더에 From 폴더를 만든 후 index 파일에 다음과 같이 작성한다.
```javascript
import styled from '@emotion/styled';
import { Button } from 'components/Button';

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
    background-color: rgb(0, 0, 0 / 75%);
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

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 16px;
`;

const InputGroup = styled.div`
    margin-bottom: 16px;
`;

const Label = styled.div`
    font-size: 1.2rem;
`;

const Input = styled.div`
    font-size: 1.2rem;
`;

const Actions = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const Form = () => {
    return (
        <Container>
            <Background />
            <Contents>
                <Title>블로그 글 등록</Title>
                <InputGroup>
                    <Label>Title: </Label>
                    <Input />
                </InputGroup>
                <InputGroup>
                    <Label>Body: </Label>
                    <Input />
                </InputGroup>
                <Actions>
                    <Button label='등록하기' />
                    <Button label='닫기' color='#304FFE' />
                </Actions>
            </Contents>
        </Container>
    )
}
```
Form 컴포넌트는 다이얼로그 형태로 화면에 표시하고 닫을 예정이므로 표시된 Form 컴포넌트를 닫기 위해 부모 컴포넌트로부터 데이터를 전달받도록 수정할 것이다.

Form 폴더의 index 파일을 수정한다.
```javascript
interface Props {
    readonly onClose?: () => void;
}

export const Form = ({onClose}: Props) => {
    return (
			...
                <Actions>
      				// onClose 함수를 일단 연결해두었다.
                    <Button label='등록하기' onClick={onClose} />
                    <Button label='닫기' color='#304FFE' onClick={onClose} />
                </Actions>
            </Contents>
        </Container>
    )
}
```

### <Form /\> 표시 State
State 변수를 생성하여 Form 컴포넌트가 표시되거나 닫힐 수 있도록 변경할 것이다.
App 파일을 다음과 같이 수정한다.
```javascript
function App() {

  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);
  const [showForm, setShowForm] = useState(false);

  ...
  
  return (
    <Container>
      <Header />
      {posts.map((post) => (
        <BlogPost key={post.id} title={post.title} body={post.body} />
      ))}
      <ButtonContainer>
        <Button label='등록' onClick={() => setShowForm(true)} />
      </ButtonContainer>
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </Container>
  );
}

export default App;
```


### 블로그 글 State 데이터
사용자가 Form 컴포넌트를 이용하여 블로그 글을 작성하면, 해당 데이터를 서버에 전송하기 위해 자바스크립트에서 해당 데이터를 저장하고 관리해야 한다.
이 데이터를 State 변수를 사용하여 관리하도록 할 것이다.

Form 폴더의 index 파일을 수정한다.
```javascript
export const Form = ({onClose}: Props) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
        <Container>
            <Background />
            <Contents>
                <Title>블로그 글 등록</Title>
                <InputGroup>
                    <Label>Title: </Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </InputGroup>
                <InputGroup>
                    <Label>Body: </Label>
                    <Input value={body} onChange={(e) => setBody(e.target.value)} />
                </InputGroup>
                <Actions>
                    <Button label='등록하기' onClick={onClose} />
                    <Button label='닫기' color='#304FFE' onClick={onClose} />
                </Actions>
            </Contents>
        </Container>
    )
}
```
useState를 사용하여 title과 body라는 변수를 생성했다.
생성한 State 변수인 title과 body를 각각의 input의 value로 설정했으며,
useState로 생성한 set 함수들을 input의 onChange 이벤트에 연결했다.

### Fetch API로 블로그 글 등록하기
useState를 사용하여 사용자가 입력한 데이터를 State에 저장했다.
저장한 데이터를 Fetch API를 사용하여 서버에 저장하도록 할 것이다.
```javascript
export const Form = ({onClose}: Props) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const registerPost = () => {
        if (title === '' || body === '') return;

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                title,
                body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (typeof onClose === 'function') onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Container>
            <Background />
            <Contents>
                <Title>블로그 글 등록</Title>
                <InputGroup>
                    <Label>Title: </Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </InputGroup>
                <InputGroup>
                    <Label>Body: </Label>
                    <Input value={body} onChange={(e) => setBody(e.target.value)} />
                </InputGroup>
                <Actions>
                    <Button label='등록하기' onClick={registerPost} />
                    <Button label='닫기' color='#304FFE' onClick={onClose} />
                </Actions>
            </Contents>
        </Container>
    )
}
```
Fetch API를 사용하여 데이터를 전송하기 위해 registerPost라는 함수를 만들었고 이 함수는 title과 body가 빈 문자열인 경우 아무 동작도 하지 않도록 했다.

데이터를 입력 후 등록하기를 누르면 개발자 도구의 console을 통해 서버가 응답한 내용이 잘 표시되는 것을 확인할 수 있다.

