import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TaskList } from '../components/task-list/task-list';
import store from '../store/store';

describe('TaskList', () => {
    it('initial tasks', () => {
        const { getByText } = render(
            <Provider store={store}>
                <TaskList />
            </Provider>,
        );
        expect(getByText("Тестовое задание")).toBeInTheDocument();
        expect(getByText("Прекрасный код")).toBeInTheDocument();
        expect(getByText("Покрытие тестами")).toBeInTheDocument();
    });
});