// Context를 생성하기 위해서는 createContext 훅을 사용해야 한다.
import { createContext, useState } from 'react';

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
  /* eslint-disable @typescript-eslint/no-empty-function */
  onAdd: (): void => {},
  onDelete: (): void => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
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
