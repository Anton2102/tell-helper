# Tells Help

Записная книжка. Стэк: NodeJs+Express+Angular+MySQL

## Задание
Описание работы приложения:
- База должна содержать перечень людей (ФИО, домашний адрес), а также список номеров телефонов для каждого человека.
- В приложении должна быть реализация просмотра людей, 
- Поиска человека по номеру телефона
- Ввода (добавления), редактирования и удаления людей и их телефонных номеров

## База данных
![image](https://user-images.githubusercontent.com/61190147/215238000-a43c9a69-9d26-4e73-ab71-14d8b19ebe40.png)

Одна таблица. Обязательные поля <b>fio</b> и <b>tells</b><br>
<b>Дамп лежит в корне</b>

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Устанока и запуск
После подключения и загрузки дамп-а бд, заходит в клиенскую(client) и серверные(api) папки, выкачиваем зависимости(npm i)
- Запускаем сервер. Папка api - npm server или node app.js
- Запускаем client-а. Папка client - npm start или ng serve. После старта client-a приложение откроется в новой вкладке.

## Интерфейс
![image](https://user-images.githubusercontent.com/61190147/215238563-ab024c9a-bf16-4910-b375-c57d57997a72.png)
![image](https://user-images.githubusercontent.com/61190147/215238588-58f10106-144d-4b17-adea-4da019514f8a.png)
![image](https://user-images.githubusercontent.com/61190147/215238619-1187789b-c97f-41a8-b97a-9b48cfa559f6.png)


## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
