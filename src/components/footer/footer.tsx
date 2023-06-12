import styled from 'styled-components';
import { appConstants } from '../../constants/app-constants';
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskList, filterTaskList, changeFilter } from '../../slices/tasksSlice';
import { TaskModel } from '../../models/task-models';

export const Footer = () => {
  const Wrapper = styled.section`
		display: flex;
		align-items: center;
		justify-content: space-between;
    height: 50px;
    border-top: 1px solid rgb(189, 189, 189);
    border-bottom: 1px solid rgb(189, 189, 189);
    padding: 0 20px;
    color: grey;  

    div {
      cursor: pointer;

      transition: all 0.3s ease;

      &:hover {
        color: ${appConstants.appearance.basePink};
    }
	`;

  const Filters = styled.section`
    display: flex;
    align-items: center;
    gap: 30px;
	`;

  const Filter = styled.section<{ $active: boolean }>`
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    min-width: 30px;
    text-align: center;

    border: 1px solid ${props => props.$active ? appConstants.appearance.basePink : 'null'};
	`;

  const filteredTaskList = useSelector((state: any) => state.tasks.filteredTaskList);
  const currentFilter = useSelector((state: any) => state.tasks.currentFilter);
  const dispatch = useDispatch();

  const deleteCompleted = () => {
    const b = filteredTaskList.filter((task: TaskModel) => task.active);

    localStorage.setItem('taskList', JSON.stringify(b));

    dispatch(changeTaskList(b));
  };

  return (
    <Wrapper>
      <span>{filteredTaskList.length} items left</span>

      <Filters>
        {['All', 'Active', 'Completed'].map((filter, index) => {
          return <Filter
            key={index}
            $active={filter === currentFilter}
            onClick={() => {
              dispatch(changeFilter(filter as any));
              dispatch(filterTaskList(filter as any));
            }}
          >
            {filter}
          </Filter>
        })}
      </Filters>

      <div onClick={() => deleteCompleted()}>Clear completed</div>
    </Wrapper >
  )
}
