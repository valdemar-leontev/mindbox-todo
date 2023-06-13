# Mindbox Todo

Это простое приложение для управления списком задач. Оно разработано с использованием React и Redux, и предоставляет пользователю возможность создавать, удалять и редактировать задачи. А также помечать их как исполненные.

![](.assets/2.png)
![](.assets/1.png)
![](.assets/3.png)
![](.assets/4.png)

Приложение хостится на netlify. 

https://mindbox-todo.netlify.app/


<details>
<summary>Установка</summary>

Склонируйте репозиторий:


    git clone https://github.com/valdemar-leontev/mindbox-todo.git

Перейдите в директорию проекта:

    cd mindbox-todo

Установите зависимости:

    npm install

или

    yarn install

</details>

<br/>

<details>
<summary>Запуск</summary>

Запустите приложение с помощью следующей команды:

    npm start

или

    yarn start

Приложение будет запущено в режиме разработки и будет доступно по адресу http://localhost:3000.

</details>

<br/>

<details>
<summary>Использование</summary>

Приложение представляет собой простой интерфейс для управления списком задач. Вы можете:

1. Добавлять новые задачи, вводя их в поле ввода и нажимая кнопку "Enter".
2. Отмечать задачи как выполненные, нажимая на чекбокс слева от задачи.
3. Фильтрация задач: Вы можете фильтровать задачи по статусу, используя выпадающий список фильтра. Возможные варианты фильтрации включают "Все задачи", "Активные задачи" и "Выполненные задачи". Выберите соответствующий вариант фильтрации, и список задач будет обновлен в соответствии с выбранным фильтром.
4. Удалять отдельные задачи нажимая на иконку корзины справа от задачи.
5. Редактировать задачу, нажав на иконку карандаша справа от задачи и введя отредактированный контент. Чтобы сохранить задачу нужно нажать на иконку галочки, которая заменила иконку карандаша или просто нажать "Enter"

Локальное хранение данных: Все ваши задачи сохраняются локально в браузере с использованием localStorage. Это означает, что при закрытии и повторном открытии приложения ваши задачи останутся сохраненными.

</details>

<br/>

<details>
<summary>Технологии</summary>

Проект "mindbox-todo" разработан с использованием следующих технологий и инструментов:

1. React: JavaScript-библиотека для создания пользовательских интерфейсов.
2. Redux: Библиотека для управления состоянием приложения.
3. Redux Toolkit: Официальное рекомендуемое средство для упрощения и улучшения работы с Redux.
4. Styled Components: Библиотека для стилизации компонентов с использованием CSS в JavaScript.
5. TypeScript: Статически типизированный язык программирования, расширяющий возможности JavaScript.

</details>