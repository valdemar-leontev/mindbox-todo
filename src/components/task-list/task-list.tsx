import { CheckIcon } from '../../icons/icon';
import './task-list.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveState } from '../../slices/tasksSlice';
import { useEffect, useState } from 'react';
import { TaskModel } from '../../models/task-models';

export const TaskList = () => {
    const taskList = useSelector((state: any) => state.tasks.reduxTaskList);
    const currentFilter = useSelector((state: any) => state.filter.currentFilter);
    const dispatch = useDispatch();

    const [currentTaskList, setCurrentTaskList] = useState<TaskModel[]>([])

    useEffect(() => {
        switch (currentFilter) {
            case 'All':
                setCurrentTaskList(taskList);
                break;
            case 'Active':
                setCurrentTaskList(taskList.filter((task: any) => task.active));
                break;
            case 'Completed':
                setCurrentTaskList(taskList.filter((task: any) => !task.active));
                break;
            default:
                break;
        }
    }, [currentFilter, taskList]);

    return (
        <div className='task-list-container'>
            {
                currentTaskList.length === 0 ?
                    <div className='no-data'>No data to display</div> :
                    currentTaskList.map((task: any) => {
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
