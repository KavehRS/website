# اکسپورت اینستاگرام → بلاگ

این پوشه **منتشر نمی‌شود** (`_drafts/` در `_config.yml` exclude است).

عامل `instagram-to-blog` همهٔ پست‌های حساب `imkavehrs` را از روی **دانلود رسمی اینستاگرام** به `_blog/` تبدیل می‌کند. سایت اینستاگرام بدون ورود قابل خواندن نیست؛ پست‌ها را حدس نزنید.

## چطور آرشیو را بگذارید

1. اینستاگرام → Settings → Accounts Center → Your information and permissions → Download your information
2. فرمت **JSON** (نه فقط HTML)، بازهٔ **All time**، نوع **Your information** / posts + media
3. فایل ZIP را از حالت فشرده خارج کنید
4. محتویات را همین‌جا بگذارید، مثلاً:

```
_drafts/instagram-export/
  README.md
  your_instagram_activity/media/posts_1.json
  your_instagram_activity/media/posts/...
```

یا کل ZIP را با نام `instagram-export.zip` در همین پوشه بگذارید و به عامل بگویید «اکسپورت را تبدیل کن».

5. ZIP، عکس‌های خام، و `parsed.json` را commit نکنید.

## بعد از گذاشتن فایل

به عامل بگویید:

«پست‌های اینستاگرام را به بلاگ تبدیل کن»

یا اتومیشن `.cursor/automations/instagram-to-blog-prompt.md` را اجرا کنید.

## جایگزین اگر اکسپورت ندارید

کپشن، تاریخ جلالی/میلادی، لینک پست، و عکس‌ها را در چت بچسبانید. عامل همان‌ها را به `_blog/` می‌نویسد — نه چیز دیگری.
