# Slot Game

Мини-слот 5x3 на PixiJS + TypeScript.
Тестовое задание.

## Стек

PixiJS 8
TypeScript
Vite

## Как запустить

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

Собрать продакшн-версию:

```bash
npm run build
```

## Что реализовано

Сетка 5x3, кнопка Spin, баланс, ставка
Результаты спинов берутся из `slot_test_assignm.json`
Отображение выигрыша (сумма + подсветка выигрышных символов)
Отдельно обрабатывается бонусный кейс

## Структура проекта
src/
  controllers/   — GameController, связывает store и сцену
  entities/      — визуальные объекты (сетка, рилы, символы)
  hud/           — кнопка спина, табло баланса
  store/         — GameStore, вся игровая логика без Pixi
  types/         — общие типы
  main.ts        — точка входа


