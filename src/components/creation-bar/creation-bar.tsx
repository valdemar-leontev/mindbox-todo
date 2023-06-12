import { ArrowDownIcon } from '../../icons/icon';
import { appConstants } from '../../constants/app-constants';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useRef } from 'react';
import { TaskModel } from '../../models/task-models';
import { create } from '../../slices/tasksSlice'

export const CreationBar = () => {
    const taskList = useSelector((state: any) => state.tasks.originalTaskList);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const getNextId = useCallback(() => {
        const maxId = Math.max(...taskList.map((task: TaskModel) => task.id));

        return maxId + 1
    }, [taskList]);

    const createTask = useCallback((taskContent: string) => {
        const newTask = {
            id: getNextId(),
            active: true,
            content: taskContent,
        } as TaskModel | any;

        dispatch(create(newTask));
    }, [dispatch, getNextId]);

    return (
        <div className='search-bar'>
            <ArrowDownIcon size={appConstants.appearance.bigIconSize} color={appConstants.appearance.darkGrey} />
            <input
                ref={inputRef}
                type="text"
                placeholder='What need to be done?'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (inputRef && inputRef.current) {
                            createTask((inputRef.current as any).value);

                            (inputRef.current as any).value = '';
                        }
                    }
                }}
            />
        </div>
    )
}
