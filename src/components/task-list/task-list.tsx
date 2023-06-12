import { CheckIcon } from '../../icons/icon';
import './task-list.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveState, filterTaskList } from '../../slices/tasksSlice';
import { useEffect } from 'react';

export const TaskList = () => {
    const filteredTaskList = useSelector((state: any) => state.tasks.filteredTaskList);
    const taskList = useSelector((state: any) => state.tasks.originalTaskList);
    const currentFilter = useSelector((state: any) => state.filter.currentFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterTaskList(currentFilter));
    }, [currentFilter, dispatch, taskList]);

    return (
        <div className='task-list-container'>
            {
                filteredTaskList.length === 0 ?
                    <div className='no-data'>No data to display</div> :
                    filteredTaskList.map((task: any) => {
                        return <div key={task.id} className='task-list-container__item'>
                            <div
                                className='task-list-container__active-task-indicator'
                                onClick={() => dispatch(changeActiveState(task.id))}
                            >
                                {task.active ? null : <CheckIcon />}
                            </div>
                            {task.active ? <span>{task.content}</span> : <del>{task.content}</del>}
                        </div>
                    })
            }
        </div>
    )
}
