import styled from 'styled-components';
import './app.scss';
import { CreationBar } from './components/creation-bar/creation-bar';
import { Footer } from './components/footer/footer';
import { TaskList } from './components/task-list/task-list';
import { useSelector } from 'react-redux';
import { appConstants } from './constants/app-constants';

const ContentWrapper = styled.section`
	background-color: white;
	width: 800px;
	box-shadow: 0px 0 20px rgba(155, 155, 155, 0.575);

	position: relative;
	min-height: 100%;

	.no-data {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;

		font-size: 30px;
		font-weight: bold;
		font-style: italic;
		color: ${appConstants.appearance.basePink};
	}
`;

export const App = () => {
	const collapseMode = useSelector((state: any) => state.tasks.collapseMode);

	return (
		<section className='app'>
			<legend>todos</legend>

			<ContentWrapper>
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

			</ContentWrapper>

		</section>
	)
}
