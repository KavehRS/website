# اکسپورت اینستاگرام → بلاگ

این پوشه **منتشر نمی‌شود** (`_drafts/` در `_config.yml` exclude است).

عامل `instagram-to-blog` پست‌های حساب `imkavehrs` را فقط از روی **خروجی رسمی اینستاگرام** به `_blog/` تبدیل می‌کند. صفحهٔ عمومی اینستاگرام بدون ورود باز نمی‌شود؛ پست‌ها را حدس نزنید.

منبع نام دکمه‌ها: [راهنمای رسمی اینستاگرام — Review and export a copy of your Instagram information](https://help.instagram.com/181231772500920) (به‌روز ۲۰۲۶). متا در حال انتقال از **Accounts Center** به **Meta Account** است؛ ممکن است یکی از این دو را ببینید. مسیر یکی است.

ورود مستقیم به همان بخش: [accountscenter.instagram.com/info_and_permissions](https://accountscenter.instagram.com/info_and_permissions/)

---

## مسیر فعلی (کامپیوتر / وب)

از داخل اینستاگرام لاگین‌شده:

1. پایین چپ: **More** (☰) → **Settings**
2. **Meta Account** (یا اگر هنوز قدیمی است: **Accounts Center**)
3. **Your information and permissions**
4. **Export your information**
5. **Create export**
6. پروفایل **Instagram** حساب `imkavehrs` را انتخاب کنید (نه فیسبوک) → **Next**
7. **Export to device** (روی همین کامپیوتر؛ به گوگل‌درایو لازم نیست)
8. تنظیمات خروجی را این‌طور بگذارید، بعد **Start export**:

| گزینه | مقدار لازم برای تبدیل به بلاگ |
|---|---|
| اطلاعات | **Some of your information** → از بخش فعالیت اینستاگرام: **Posts** / **Photos and videos** / **Reels** (یا اگر این برچسب‌ها نبود: **Content**). دایرکت، فالوئر و تبلیغات لازم نیست. اگر شک دارید **All available information** هم کار می‌کند، فقط ZIP بزرگ‌تر می‌شود. |
| Date range | کل بازه / **All time** / تمام تاریخ‌های موجود |
| Format | **JSON** — HTML برای مرورگر است؛ پارسر سایت JSON می‌خواهد |
| Media quality | **High** اگر عکس‌ها باید روی سایت بیایند |
| Notification email | ایمیلی که به حساب متا وصل است |

اگر به‌جای این دکمه‌ها هنوز متن قدیمی را دیدید:

**Download your information** → **Download or transfer information** → انتخاب پروفایل اینستاگرام → **Export to device** / Download to device → همان جدول بالا → **Create files** یا **Start export**.

خروجی رمز عبور حساب را می‌پرسد؛ این مرحله فقط برای خودِ متا است. رمز را در ریپو یا چت نگذارید.

---

## مسیر اپ (آیفون / اندروید، نسخهٔ فعلی)

1. تب **Profile** پایین راست
2. ☰ بالا راست → **Settings and privacy**
3. کاشی **Accounts Center** یا **Meta Account** بالای صفحه
4. از اینجا همان مسیر وب: **Your information and permissions** → **Export your information** → **Create export** → پروفایل اینستاگرام → **Export to device** → JSON + کل بازه + High → **Start export**

روی گوشی ZIP بزرگ سخت جابه‌جا می‌شود. اگر حجم پست‌ها زیاد است، همین کار را در **مرورگر دسکتاپ** انجام دهید.

---

## وقتی فایل آماده شد

- ایمیل و نوتیفیکیشن اینستاگرام می‌آید. آماده‌سازی معمولاً چند ساعت است؛ طبق راهنمای رسمی **تا ۳۰ روز** هم ممکن است طول بکشد.
- فقط **۴ روز** برای دانلود فرصت دارید: دوباره **Export your information** → بخش **Available downloads**.
- ZIP را بگیرید، از حالت فشرده خارج کنید، و یکی از این دو را اینجا بگذارید:

```
_drafts/instagram-export/
  README.md
  your_instagram_activity/media/posts_1.json
  your_instagram_activity/media/posts/…
```

یا خودِ `instagram-export.zip` در همین پوشه.

در خروجی ۲۰۲۴–۲۰۲۶ معمولاً فایل پست‌ها این‌جاست: `your_instagram_activity/media/posts_1.json` (گاهی `posts_2.json` و بعد). اگر پوشهٔ بالاتر `instagram_<username>_…` بود، همان را همین‌جا بگذارید.

ZIP، عکس‌های خام، و `parsed.json` را commit نکنید.

---

## بعد از گذاشتن فایل

بگویید: «پست‌های اینستاگرام را به بلاگ تبدیل کن»

یا اتومیشن `.cursor/automations/instagram-to-blog-prompt.md` را اجرا کنید.

## جایگزین اگر اکسپورت ندارید

کپشن، تاریخ، لینک پست، و عکس‌ها را در چت بچسبانید. عامل همان‌ها را به `_blog/` می‌نویسد — نه چیز دیگری.
