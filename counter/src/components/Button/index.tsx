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

// Props를 통해 전달받을 데이터를 타임스크립트의 interface를 사용하여 정의했다.
// interface는 객체의 스펙이나 함수의 매개 변수, 클래스 등을 정의할 때 사용한다.
// interface 인터페이스명 { 변수명: 변수타입 };
interface Props {
  readonly label: string;
  readonly onClick?: () => void;
}

export const Button = ({ label, onClick }: Props) => {
  return <Container onClick={onClick}>{label}</Container>;
};
