---
# DRAFT TEMPLATE — not published
# چهارچوب استاندارد گزارش صعود (برگرفته از نمونه کهار)
# هنگام ساخت گزارش جدید: این سکشن‌ها را نگه دار، متن را از نو بنویس.
layout: null
title: "قالب گزارش صعود — درفت"
published: false
sitemap: false
noindex: true
lang: fa-IR
dir_attr: rtl
---

<!--
USAGE (agent-only — do not copy this comment block into published pages)
0) This template is used by the logbook ascent-report agent
   (.cursor/automations/logbook-ascent-report-prompt.md + .cursor/skills/logbook-ascent-report/SKILL.md)
1) Copy structure into `_logbook/YYYY-MM-DD-<peak-slug>.md`
2) Front matter must include: lang, dir_attr, description, date, tags, image,
   categories from _data/logbook_disciplines.yml
   (training-camp | snowfield | glacier | icefall | winter-ascent | high-altitude | technical-mountaineering | hiking | rock-climbing | wall-climbing),
   and peak: { name, elevation_m, latitude, longitude, region } ONLY from a named source or this climb’s GPS — omit guessed/rounded placeholders (see .cursor/rules/logbook-facts.mdc)
3) Classification: ridge/gendarme/alpine hand-and-foot → technical-mountaineering (کوهنوردی فنی).
   rock-climbing / wall-climbing only for true rock or multipitch wall — never for alpine ridge trips.
4) Fill facts for THIS climb only. Program length/dates = exactly what the user said (one-day vs multi-day).
   Do not invent overnight stays. Kahar sample is one-day on ۱۶ مرداد ۱۴۰۵.
   Stable specs (elevation, coordinates, flora/fauna, road km) must be sourced or omitted — never guessed «حدود». Climb times/GPS/narrative may be experiential.
5) Weather: use only **accurate** sources for this peak/region (Open-Meteo; Mountain-Forecast only if peak has its own page; Meteoblue when reliable). **Omit** distant proxies or missing data — do not publish empty subsections.
6) Weather is refreshed at 04:00 / 10:00 / 16:00 / 22:00 Asia/Tehran for report_status: active until 22:00 the night before the climb (automatic when billing enabled)
7) If a forecast change is noticeable among sources actually used, add/update ## چالش‌های برنامه with before→after details (sources, time, impact).
8) Gear list MUST be derived from climb date(s) + applicable accurate forecast(s) (not a generic seasonal packing list)
9) report_status: active until post-climb report finished; then completed
10) Images live in assets/mount/logbook/<exact-url-slug>/ matching the report URL slug
11) Related reports: SELECT by shared categories in _includes/related-links.html.
    Public UI must be only «گزارش‌های مرتبط :» + flat list — no «بر اساس نوع برنامه…», no category headings.
12) Hub /logbook/ is chronological by date (newest first), not grouped by category.
13) Before publish: compare against existing `_logbook/*` for the same peak
14) Never paste this template prose unchanged into a published report
15) Never publish agent/implementation notes on live pages
16) Reader-facing site dates (footer آخرین بروزرسانی, post meta, /logbook/ list) use Jalali via _includes/jalali-date.html
    e.g. 13 مرداد 1405 — never English Gregorian like «04 August 2026» in those UI spots.
    Report body: program dates Jalali-first; weather stamps may add Gregorian in parentheses.
17) Scheduled automation paused until owner recharges Cursor; after recharge mandatory always-on (see AGENTS.md)
-->



<!--
Example front matter categories:
categories: [high-altitude]
# or: [training-camp, snowfield]
# or: [winter-ascent, hiking]
# or: [technical-mountaineering]  # ridge / gendarme / alpine hand-and-foot
# or: [rock-climbing]  # only true rock climbing
# or: [wall-climbing]  # only true multipitch/wall
-->


**گزارش برنامه صعود به قله {{نام_قله}}**

تاریخ اجرای برنامه: {{تاریخ_جلالی — یک‌روزه یا چندروزه}}

> این پیش گزارش صعود به قله {{نام_قله}} است و جزییات و شرح برنامه پس از اجرای صعود تکمیل خواهد شد.


## مشخصات قله

- **نام قله:**
- **ارتفاع قله:** (منبع نام‌دار یا GPS این برنامه؛ اگر اختلاف منابع است هر دو عدد را بنویس)
- **رشته‌کوه:**
- **موقعیت اداری:**
- **مبدأ رایج صعود:**
- **ارتفاع پای‌کار:** (فقط اگر منبع/GPS دارید)
- **اختلاف ارتفاع تا قله:** (فقط از اعداد منبع‌دار)
- **طول مسیر:** (GPS این برنامه یا منبع نام‌دار)
- **مدت زمان صعود / فرود این برنامه:** (تجربهٔ همین صعود؛ «معمول ۵ تا ۷ ساعت» را از سایت‌های دیگر کپی نکن)
- **سطح فنی مسیر نرمال:**
- **وجه شهرت / نکته کلیدی:**
- **مختصات قله:** (منبع نام‌دار؛ اگر نیست این خط را حذف کن)


## معرفی منطقه

{{معرفی_جغرافیایی_و_جبهه‌ها_و_قلل_همسایه — متن تازه}}


### وجه تسمیه و ویژگی اقلیمی

{{اقلیم_و_نکات_محلی — متن تازه}}

**آخرین پیش‌بینی هوا برای تمام روزهای برنامه — فقط منابع دقیق:**

زمان به‌روزرسانی:

### ۱) Open-Meteo
- نقطه / ارتفاع قله و پای‌کار:
- خلاصهٔ هر روز برنامه (دما، باد/تندباد، ابر، احتمال بارش):

### ۲) Mountain-Forecast (https://www.mountain-forecast.com/) — فقط اگر صفحهٔ خود قله وجود دارد
- اگر قله در سایت نیست: این منبع را **حذف کن** (پروکسی دور ممنوع)
- خلاصهٔ هر روز برنامه:

### ۳) Meteoblue — فقط اگر مختصات + ارتفاع قله قابل‌اعتماد است
- لینک نقطه @ elevation
- خلاصهٔ هر روز برنامه:

> فقط منابعی را بنویس که برای همین قله و منطقه دقیق‌اند. شماره‌گذاری فقط همان منابع (۱، ۲، …).

> جمع‌بندی عملیاتی (اختلاف منابع / توصیه پوشاک و تصمیم برنامه):


## پوشش گیاهی

{{بر اساس فصل، طبقهٔ ارتفاعی و هوای همین تاریخ — متن تازه؛ فهرست گزارش دیگر یا سایت گردشگری را کپی نکن}}


## گونه‌های جانوری

{{بر اساس منطقه و فصل همین برنامه — مشاهده را از فهرست عمومی جدا کن؛ متن تازه}}


## ارتفاعات و فواصل

- فاصله تقریبی تهران تا مبدأ:
- نزدیک‌ترین شهر:
- مسیر دسترسی جاده‌ای:
- پناهگاه / نقاط شاخص ارتفاعی:
- وضعیت آنتن‌دهی:


## موقعیت و دسترسی‌ها

### مسیر اصلی

{{گام‌به‌گام دسترسی — متن تازه}}


### مسیرهای فرعی / جایگزین

{{در صورت وجود — متن تازه}}


## مسیرهای صعود

### ۱. مسیر کلاسیک / نرمال

{{توضیح مسیر — متن تازه}}


### ۲. مسیر جایگزین / خط‌الراس / فنی

{{در صورت وجود — متن تازه}}


## پناهگاه، آب و امکانات مسیر

{{پناهگاه، چشمه، محدودیت آب — متن تازه}}


## بهترین فصل صعود

{{بهار / تابستان / پاییز / زمستان — متن تازه}}


## چشم‌انداز و قلل همسایه

{{متن تازه}}


## چالش‌های برنامه

### نوسان / تغییر پیش‌بینی هوا (فقط اگر قابل‌ملاحظه باشد)

- **زمان مشاهده:** {{جلالی + میلادی + ساعت Asia/Tehran}}
- **منبع(ها):** {{فقط منابع دقیق استفاده‌شده — Open-Meteo / Mountain-Forecast / Meteoblue}}
- **قبل → بعد:** {{اعداد مشخص: دما، باد/تندباد، احتمال/مقدار بارش، سطح انجماد}}
- **اثر روی برنامه:** {{زمان‌بندی / مسیر / شب‌مانی / تجهیزات / تصمیم اجرا}}

### سایر چالش‌ها

- {{ارتفاع، باد معروف قله، شلوغی پناهگاه، بخش فنی، دسترسی آب، ...}}


## تجهیزات مورد نیاز (بر اساس تاریخ و پیش‌بینی هوا)


**مبنا:** {{تاریخ_جلالی_و_نوع_برنامه}} + خلاصه پیش‌بینی منابع دقیق استفاده‌شده.  
خلاصه شرایط مورد انتظار: {{دما_باد_بارش_ابری_یخ_برف}}

### پوشاک (متناسب با دمای پیش‌بینی‌شده و باد)

- {{لایه_پایه}}
- {{لایه_میانی}}
- {{بادگیر_/_ضدآب}}
- {{کلاه_دستکش_گردن‌پوش}}

### بارش / رطوبت (فقط اگر پیش‌بینی‌ها ایجاب کند)

- {{رویه_ضدآب_سبک_یا_دلیل_حذف}}

### آفتاب، سرما، آب و تغذیه (بر اساس فصل و پای‌کار/قله)

- {{ضدآفتاب_عینک_آب_غذا}}

### کفش و پیمایش (متناسب با سطح مسیر و شرایط روز)

- {{کفش}}
- {{باتوم_هدلایت_ناوبری_کمک‌های_اولیه}}
- {{فنی_مثل_کرامپون_کلنگ_فقط_اگر_برای_همین_تاریخ_لازم_است}}

### برای این تاریخ همراه نبرید (مگر تغییر پیش‌بینی)

- {{اقلام_غیرضروری_با_دلیل}}

> پس از هر به‌روزرسانی هوا، این بخش را دوباره با همان تاریخ صعود هم‌راستا کن؛ فهرست کلی و فصلیِ ثابت ممنوع است.


## اعضای شرکت‌کننده

- **تاریخ برنامه:**
- **سرپرست / راهنما:**
- **اعضای تیم:**


## شرح برنامه

> تا قبل از صعود خالی/کوتاه بماند؛ بعد از صعود با روایت همان روز تکمیل شود.
> اگر برنامه چندروزه است، برای هر روز زیربخش جدا بنویس.

### روز / روزها

- ساعت حرکت / محل قرار:
- زمان رسیدن به پای‌کار:
- زمان شروع پیمایش:
- نقاط توقف مهم (پناهگاه، کمپ، ...):
- زمان صعود قله (در صورت اجرا در آن روز):
- زمان بازگشت:
- وضعیت آب‌وهوا و باد:
- نکات ایمنی و مشاهدات مسیر:
- جمع‌بندی:

