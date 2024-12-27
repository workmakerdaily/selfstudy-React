import styled from '@emotion/styled';
import { Title } from 'components/Title';
import { ToDoList } from 'components/ToDoList';
import { ShowInputButton } from 'components/ShowInputButton';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
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
      <Title label="할 일 목록" />
      <ToDoList />
      <ShowInputButton show={false} onClick={() => navigate('/add')} />
    </Container>
  );
};
