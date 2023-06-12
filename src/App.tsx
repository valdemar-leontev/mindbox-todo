import { useEffect } from 'react';
import './app.scss';
import { CreationBar } from './components/creation-bar/creation-bar';
import { Footer } from './components/footer/footer';
import { TaskList } from './components/task-list/task-list';
import { TaskModel } from './models/task-models';

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

  return (
    <section className='app'>
      <legend>todos</legend>

      <div className='main-container'>
        <CreationBar />

        <TaskList />

        <Footer />
      </div>

    </section>
  )
}
