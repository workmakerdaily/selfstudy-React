import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Header } from 'components/Header';
import { BlogPost } from 'components/BlogPost';
import { Button } from 'components/Button';
import { Form } from 'components/Form';

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
  const [showForm, setShowForm] = useState(false);

  // useEffect 훅은 리액트의 함수 컴포넌트에서 클래스 컴포넌트의
  // 라이프사이클 함수와 비슷한 역할을 한다.
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
      {/* map을 사용하여 동일한 컴포넌트를 반복적으로 표시하므로 key값을 반드시 설정한다 */}
      {posts.map((post) => (
        <BlogPost key={post.id} title={post.title} body={post.body} />
      ))}
      <ButtonContainer>
        <Button label="등록" onClick={() => setShowForm(true)} />
      </ButtonContainer>
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </Container>
  );
}

export default App;
