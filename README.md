# Slot Game

Мини-слот 5x3 на PixiJS + TypeScript. Тестовое задание.

## Стек

- PixiJS 8
- TypeScript
- Vite

## Как запустить

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

Собрать прод-версию:

```bash
npm run build
```

## Что реализовано

- Сетка 5x3, кнопка Spin, баланс, ставка
- Результаты спинов берутся из `src/assets/slot_test_assignm.json`
- Отображение выигрыша (сумма + подсветка выигрышных символов)
- Отдельно обрабатывается бонусный кейс со скаттерами (спин с `bonusTriggered`)

## Структура проекта

```
src/
  controllers/   — GameController, связывает store и сцену
  entities/      — визуальные объекты (сетка, рилы, символы)
  hud/           — кнопка спина, табло баланса
  store/         — GameStore, вся игровая логика без Pixi
  types/         — общие типы
  main.ts        — точка входа
```

Логика отделена от отображения: `GameStore` ничего не знает про Pixi, а компоненты в `entities`/`hud` ничего не знают про игровые правила.
