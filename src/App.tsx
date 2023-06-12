import { useEffect } from 'react';
import './app.scss';
import { CreationBar } from './components/creation-bar/creation-bar';
import { Footer } from './components/footer/footer';
import { TaskList } from './components/task-list/task-list';
import { TaskModel } from './models/task-models';
import { useSelector } from 'react-redux';

export const App = () => {
	useEffect(() => {
		if (localStorage.getItem("taskList") === null) {
			const initialTaskList = [
				{
					id: 1,
					active: true,
					content: "Тестовое задание"
				},
				{
					id: 2,
					active: false,
					content: "Прекрасный код"
				},
				{
					id: 3,
					active: true,
					content: "Покрытие тестами"
				}
			] as TaskModel[];

			localStorage.setItem("taskList", JSON.stringify(initialTaskList));
		}
	}, []);

	const collapseMode = useSelector((state: any) => state.tasks.collapseMode);

	return (
		<section className='app'>
			<legend>todos</legend>

			<div className='main-container'>
				<CreationBar />

				<div
					style={{
						height: collapseMode ? '0px' : '270px',
						transition: 'height 0.4s ease-in-out',
						overflow: 'hidden',
					}}
				>
					<TaskList />

					<Footer />
				</div>

			</div>

		</section>
	)
}
