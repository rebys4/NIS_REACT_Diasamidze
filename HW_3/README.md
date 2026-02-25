# HW_3 — E-commerce Admin

SPA административная панель на React + TypeScript с использованием:

- Redux Toolkit
- RTK Query
- React Router
- i18next / react-i18next
- DummyJSON API

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Архитектура

Проект организован по FSD-слоям:

- `app` — инициализация приложения, store, router, bootstrap
- `pages` — страницы маршрутов
- `widgets` — общий layout приватной части
- `features` — сценарии (логин, настройки)
- `entities` — доменные сущности (user, product) + API
- `shared` — инфраструктура (ui, config, lib, i18n)

## Реализовано

- Авторизация через RTK Query (`/auth/login`, `/auth/me`)
- Protected routes + редиректы для публичных/приватных зон
- Хранение токена и пользователя в Redux
- Автоинициализация сессии после перезагрузки
- Каталог продуктов (`/products`) с поиском и пагинацией через query params
- Детальная страница продукта (`/products/:id`)
- Профиль пользователя (`/profile`)
- Настройки (`/settings`): язык, тема, page size + persist в `localStorage`
- i18n `ru/en` для основных интерфейсов и состояний
- Страница `404` и `ErrorBoundary`
