# Контент и SEO — что осталось ввести

Мультистраничный статический сайт. Общие стили/скрипты — в `assets/`
(одна точка правки на все страницы).

## Карта страниц

| URL | Файл | Под какой запрос |
|-----|------|------------------|
| `/` | `index.html` | бренд, «глэмпинг под Москвой», общий обзор |
| `/domiki/` | `domiki/index.html` | «снять А-фрейм домик посуточно» |
| `/banya-chan/` | `banya-chan/index.html` | «глэмпинг с баней», «домик с чаном» |
| `/kak-dobratsya/` | `kak-dobratsya/index.html` | «как добраться, 65 км от Москвы» |
| `/otzyvy/` | `otzyvy/index.html` | «papino village отзывы» |
| `/policy.html` | — | политика 152-ФЗ (закрыта от индексации) |

Правка контента: текст — в нужном `*/index.html`; общий вид — в
`assets/styles.css`; общая логика — в `assets/site.js`. У каждой страницы
свой `<title>`, `description`, `canonical`, Open Graph и хлебные крошки.

## Owner-only (по приоритету)

| # | Где | Поставить |
|---|-----|-----------|
| 1 | `assets/site.js`, `var METRIKA_ID=0;` | реальный номер счётчика Метрики |
| 2 | `index.html`, `<div id="bookingWidget">` | iframe-код из кабинета bronirui-online.ru |
| 3 | `<meta name="yandex-verification">` / `google-site-verification` в `index.html` | коды из Яндекс.Вебмастера и Google Search Console |
| 4 | `id="waBtn"/"tgBtn"` и `"waBtn2"/"tgBtn2"` в `index.html` | `https://wa.me/79XXXXXXXXX?text=...`, `https://t.me/НИК` |
| 5 | `kak-dobratsya/index.html`, `map-widget/v1/?ll=36.60%2C55.20&z=10` | точные координаты карты |
| 6 | `images/` | реальные фото (`PHOTOS.md`); `hero/summer.jpg` — оно же og:image, ≥1200×630 |

## SEO — что сделано

Интент-тексты и заголовки; per-page title/description/canonical/OG;
Schema.org `Resort` + `FAQPage` (главная) + `BreadcrumbList` (подстраницы);
FAQ/отзывы — статический HTML (Яндекс индексирует); `robots.txt` +
`sitemap.xml` (5 URL); у картинок `width/height` и осмысленные `alt`.
Рейтинг в разметке НЕ выдуман — добавим реальный, когда будет с Яндекс.Карт.

## Домены и цутовер

`usadba-papino.ru`, `usadbapapino.ru` → **301** на papinovillage.ru (ок).
`papino-village.ru` по HTTPS не ответил при проверке — **проверить**.
`.рф`-домены проверить в Вебмастере. `canonical` у всех страниц ведёт на
`papinovillage.ru` (будущий единственный адрес; сейчас там старый сайт на
Тильде — это осознанно, на момент цутовера станет консистентно).

Цутовер (когда фото готовы): DNS у регистратора на GitHub Pages —
A `@` → `185.199.108.153/109/110/111.153`, CNAME `www` →
`mihalgennadich.github.io`; затем вернуть файл `CNAME` со строкой
`papinovillage.ru`. До этого сайт на адресе GitHub Pages, старый сайт и
домены не затрагиваются.

## Реальные данные (проверить актуальность)

Цены 5 900/8 900 ₽ + доплаты, заезд/выезд по домикам, чан 3 900 ₽,
баня 3 000 ₽, телефоны +7 (495) 145-88-02 / +7 (993) 754-05-42,
email papino.village@gmail.com, VK vk.com/papino_village, акции,
окрестности, 6 отзывов (имена скрыты намеренно — без согласия нельзя),
10 ответов FAQ. Реквизиты: ИП Петрухин М. Г.
