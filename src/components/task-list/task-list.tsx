import { CheckIcon, EditIcon, TrashIcon } from '../../icons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveState, filterTaskList, changeTaskList, changeTaskContent } from '../../slices/tasksSlice';
import { useCallback, useEffect, useState } from 'react';
import { appConstants } from '../../constants/app-constants';
import { TaskModel } from '../../models/task-models';
import { styled } from 'styled-components';

const Wrapper = styled.section`
    border-top: 1px solid ${appConstants.appearance.darkGrey};
    height: 218px;
    overflow-y: auto;
`;


const AdditionalActions = styled.div`
    opacity: 0;
    transform: scale(0.5);
    transition: 0.4s ease-in-out all;
`;

const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    font-size: 30px;
    border-top: 1px solid ${appConstants.appearance.darkGrey};

    del {
        color: ${appConstants.appearance.darkGrey};
    }

    &:hover {
        ${AdditionalActions} {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const TaskIndicator = styled.div<{ $active?: boolean; }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${props => !props.$active ? "#7bc1b1" : "rgb(204, 204, 204)"};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7bc1b1;
`;

const EditTaskInput = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 30px;
    color: ${appConstants.appearance.darkGrey};
    font-style: italic;
    min-width: 600px;
`;

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
            const taskContentElement = document.querySelector(`#edit-task-${editedTask.id}`);

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
        <Wrapper>
            {
                filteredTaskList.length === 0 ?
                    <div className='no-data'>No data to display</div> :
                    (filteredTaskList as TaskModel[]).map((task: any) => {
                        return <TaskWrapper key={task.id}>
                            <div className='app-flex-gap-30'>
                                <TaskIndicator $active={task.active}
                                    onClick={() => dispatch(changeActiveState(task.id))}
                                >
                                    {task.active ? null : <CheckIcon />}
                                </TaskIndicator>
                                {
                                    editedTask && editedTask.id === task.id ?
                                        <EditTaskInput
                                            id={`edit-task-${task.id}`}
                                            type="text"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    dispatch(changeTaskContent({ ...task, content: (document.querySelector(`#edit-task-${task.id}`) as any).value }))
                                                    setEditedTask({} as any);
                                                }
                                            }}
                                        /> :
                                        task.active ? <span id='task-content'>{task.content}</span> : <del id='task-content'>{task.content}</del>
                                }
                            </div>
                            <AdditionalActions className='app-flex-gap-10'>
                                <TrashIcon
                                    onClick={() => deleteTask(task.id)}
                                    size={appConstants.appearance.bigIconSize}
                                    color={appConstants.appearance.darkGrey}
                                    title='Delete task'
                                />
                                {
                                    editedTask && editedTask.id === task.id ?
                                        <CheckIcon
                                            size={appConstants.appearance.bigIconSize}
                                            color={appConstants.appearance.darkGrey}
                                            onClick={() => {
                                                dispatch(changeTaskContent({ ...task, content: (document.querySelector(`#edit-task-${task.id}`) as any).value }))
                                                setEditedTask({} as any);
                                            }}
                                            title='Save task'
                                        /> :
                                        <EditIcon
                                            onClick={() => {
                                                onEditTaskHandler(task.id);
                                            }}
                                            size={appConstants.appearance.bigIconSize}
                                            color={appConstants.appearance.darkGrey}
                                            title='Edit task'
                                        />
                                }
                            </AdditionalActions>
                        </TaskWrapper>
                    })
            }
        </Wrapper>
    )
}
