import './app.scss';
import { CreationBar } from './components/creation-bar/creation-bar';
import { Footer } from './components/footer/footer';
import { TaskList } from './components/task-list/task-list';
import { useSelector } from 'react-redux';

export const App = () => {
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
