import { CheckIcon, EditIcon, TrashIcon } from '../../icons/icons';
import './task-list.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveState, filterTaskList, changeTaskList, changeTaskContent } from '../../slices/tasksSlice';
import { useCallback, useEffect, useState } from 'react';
import { appConstants } from '../../constants/app-constants';
import { TaskModel } from '../../models/task-models';

export const TaskList = () => {
    const filteredTaskList = useSelector((state: any) => state.tasks.filteredTaskList);
    const taskList: TaskModel[] = useSelector((state: any) => state.tasks.originalTaskList);
    const currentFilter = useSelector((state: any) => state.tasks.currentFilter);
    const dispatch = useDispatch();

    const [editedTask, setEditedTask] = useState({} as TaskModel);

    useEffect(() => {
        dispatch(filterTaskList(currentFilter));
    }, [currentFilter, dispatch, taskList]);

    useEffect(() => {
        if (editedTask.id) {
            const taskContentElement = document.querySelector(`[role=edit-task-${editedTask.id}]`);

            if (taskContentElement) {
                (taskContentElement as any).value = editedTask.content;
                (taskContentElement as any).focus();
                (taskContentElement as any).select();
            }
        }
    }, [editedTask.id, editedTask.content]);

    const deleteTask = useCallback((id: number | any) => {
        const updatedTaskList: TaskModel[] | any = taskList.filter((task: any) => task.id !== id);
        dispatch(changeTaskList(updatedTaskList));
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    }, [dispatch, taskList]);

    const onEditTaskHandler = useCallback((id: number | any) => {
        const currentEditedTask = taskList.find((task: any) => task.id === id);

        if (currentEditedTask) {
            setEditedTask(currentEditedTask);
        }
    }, [taskList]);

    return (
        <div className='task-list-container'>
            {
                filteredTaskList.length === 0 ?
                    <div className='no-data'>No data to display</div> :
                    filteredTaskList.map((task: any) => {
                        return <div key={task.id} className='task-list-container__item'>
                            <div className='app-flex-gap-30'>
                                <div
                                    className='task-list-container__active-task-indicator'
                                    onClick={() => dispatch(changeActiveState(task.id))}
                                >
                                    {task.active ? null : <CheckIcon />}
                                </div>
                                {
                                    editedTask && editedTask.id === task.id ?
                                        <input
                                            role={`edit-task-${task.id}`}
                                            type="text"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    dispatch(changeTaskContent({ ...task, content: (document.querySelector(`[role=edit-task-${task.id}]`) as any).value }))
                                                    setEditedTask({} as any);
                                                }
                                            }}
                                        /> :
                                        task.active ? <span id='task-content'>{task.content}</span> : <del id='task-content'>{task.content}</del>
                                }

                            </div>
                            <div className='task-list-container__item-additional-actions app-flex-gap-10'>
                                <TrashIcon
                                    onClick={() => deleteTask(task.id)}
                                    size={appConstants.appearance.bigIconSize}
                                    color={appConstants.appearance.darkGrey} />
                                {
                                    editedTask && editedTask.id === task.id ?
                                        <CheckIcon
                                            size={appConstants.appearance.bigIconSize}
                                            color={appConstants.appearance.darkGrey}
                                            onClick={() => {
                                                dispatch(changeTaskContent({ ...task, content: (document.querySelector(`[role=edit-task-${task.id}]`) as any).value }))
                                                setEditedTask({} as any);
                                            }} /> :
                                        <EditIcon
                                            onClick={() => {
                                                onEditTaskHandler(task.id);
                                            }}
                                            size={appConstants.appearance.bigIconSize}
                                            color={appConstants.appearance.darkGrey} />
                                }

                            </div>
                        </div>
                    })
            }
        </div>
    )
}
