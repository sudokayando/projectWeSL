# ShadowLab frontend prototype

Минималистичный статический фронтенд для Security Research Laboratory.

## Файлы
- `index.html` — SPA-like layout с Dashboard, Laboratory, History, Projects и Profile.
- `styles.css` — тёмная тема в серо-чёрной гамме с оранжевым акцентом.
- `app.js` — навигация, result tabs, history search/filter и demo-run для pipeline.

## Запуск
Можно просто открыть `index.html` в браузере.

Для подключения к PHP backend точками интеграции будут:
- `runPipeline()` — заменить demo-запуск на POST в REST API;
- таблицы результатов — рендерить JSON из API;
- History / Projects / Profile — заменить demo-данные на API/серверный рендер;
- авторизацию можно подключить к существующим PHP routes/session.

Все target/result данные внутри прототипа — демонстрационные и не выполняют реальные security-инструменты.
