import { ArrowDownIcon } from '../../icons/icons';
import { appConstants } from '../../constants/app-constants';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useRef } from 'react';
import { TaskModel } from '../../models/task-models';
import { create, toggleCollapseMode } from '../../slices/tasksSlice'
import { styled } from 'styled-components';

const Wrapper = styled.section`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 20px 0;

    svg {
        flex: 1;
    }

    input {
        flex: 10;
        border: none;
        background-color: transparent;
        outline: none;
        font-size: 30px;
        color: ${appConstants.appearance.darkGrey};
        font-style: italic;

        &::placeholder {
            color: ${appConstants.appearance.darkGrey};
        }
    }
`;

export const CreationBar = () => {
    const taskList = useSelector((state: any) => state.tasks.originalTaskList);
    const collapseMode = useSelector((state: any) => state.tasks.collapseMode);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const getNextId = useCallback(() => {
        let maxId = 0;
        if (taskList.length > 0) {
            maxId = Math.max(...taskList.map((task: TaskModel) => task.id));
        }

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
        <Wrapper>
            <ArrowDownIcon
                style={collapseMode ? { transform: 'rotate(180deg)' } : {}}
                onClick={() => dispatch(toggleCollapseMode())}
                size={appConstants.appearance.bigIconSize}
                color={appConstants.appearance.darkGrey}
            />
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
        </Wrapper>
    )
}
