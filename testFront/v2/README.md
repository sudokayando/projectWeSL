# ShadowLab UI — multi-page frontend

Это frontend-прототип для текущего этапа проекта Security Lab. Он специально разделён на отдельные HTML-страницы и небольшие CSS/JS-файлы, чтобы было проще работать с ним вместе с локальным XAMPP/PHP backend.

## Структура

```text
security-lab-ui/
├── index.html              # Dashboard
├── laboratory.html         # Laboratory
├── history.html            # History
├── projects.html           # Projects
├── profile.html            # Profile
├── css/
│   ├── base.css            # общие стили
│   ├── dashboard.css       # только Dashboard
│   ├── laboratory.css      # только Laboratory
│   ├── history.css         # только History
│   ├── projects.css        # только Projects
│   └── profile.css         # только Profile
└── js/
    ├── main.js             # общая навигация + toast
    ├── laboratory.js       # demo pipeline лаборатории
    └── history.js          # поиск и фильтры истории
```

## Как запускать

Можно открыть `index.html` напрямую для просмотра статического UI. Когда начнёшь подключать PHP, лучше положить папку в XAMPP `htdocs` и открывать через Apache, например:

`http://localhost/security-lab-ui/`

## Что делает JavaScript сейчас

### main.js

Общий JS для всех страниц. Он:
- показывает toast-уведомления через `notify()`;
- обрабатывает кнопки с `data-navigate`;
- оставляет Ctrl/Cmd + K как быстрый переход в Laboratory.

Он **не запускает Subfinder, HTTPX, FFUF или Nuclei**.

### laboratory.js

Сейчас это demo. `runPipeline()` имитирует четыре этапа с помощью `setTimeout`. Поэтому статусы Running/Completed меняются, терминал заполняется и отображаются demo-результаты.

Позже demo можно заменить на реальный запрос к PHP. Пример будущей схемы:

```js
const response = await fetch('api/research.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ target: targetInput.value })
});

const data = await response.json();
```

PHP сможет вернуть, например:

```json
{
  "success": true,
  "job_id": 428,
  "status": "started"
}
```

После этого JS использует `job_id` для получения статуса и результатов. Это следующий этап, а не обязательная часть текущего frontend.

## Как связать frontend с PHP позже

Планируемый поток:

```text
HTML
  ↓
JavaScript
  ↓ fetch()
PHP endpoint
  ↓
backend logic
  ↓
security tools / database
  ↓
JSON
  ↓
JavaScript
  ↓
UI
```

Сейчас API специально не добавлен: backend на XAMPP ещё развивается, поэтому frontend остаётся независимым статическим прототипом.

## CSS

`base.css` содержит только общие элементы: цвета, типографику, navbar, кнопки, панели, badges и responsive-базу.

Страничные файлы содержат только специфичную разметку. Поэтому изменение Laboratory не требует поиска её стилей среди Dashboard/History/Profile.

## Важное

Все данные в интерфейсе пока demo-данные. Перед реальным использованием проекта их нужно заменить результатами твоего PHP backend и БД.
