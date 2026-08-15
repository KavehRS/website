---
layout: post
title: "نصب زبان برنامه‌نویسی گو"
lang: fa-IR
dir_attr: rtl
description: "آموزش نصب زبان برنامه‌نویسی Go روی لینوکس (فدورا و CentOS) و نوشتن اولین برنامه Hello World."
date: 2020-01-24
tags: [Go, لینوکس]
related:
  - title: "مفاهیم اولیه برنامه‌نویسی ۱: مفاهیم پایه"
    url: /blog/2020-8-31-basic-overview-of-programming-part1/
---

زبان برنامه‌نویسی Go (یا GoLang) یک زبان متن‌باز است که از سال ۲۰۰۷ در گوگل توسط رابرت گریزمر، راب پایک و کن تامپسون توسعه داده شد. برای برنامه‌های قابل‌اعتماد در سطح سیستم، شبکه و multiprocessing طراحی شده است. این یادداشت نصب Go روی لینوکس را در همان تاریخ انتشار (زمستان ۱۳۹۸) شرح می‌دهد.

## نصب GoLang

اگر از فدورا استفاده می‌کنید:

```bash
# dnf install go
```

اگر از CentOS استفاده می‌کنید:

```bash
# yum install go
```

## پیکربندی محیط Go

گام نخست ساختن workspace است. پوشهٔ `~/go_projects` ریشهٔ workspace است و این سه زیرپوشه را می‌خواهد:

- `bin` — فایل‌های اجرایی
- `src` — سورس
- `pkg` — objectهای پکیج

```bash
$ mkdir -p ~/go_projects/{bin,src,pkg}
```

سپس `~/.bash_profile` را باز کنید:

```bash
$ vi $HOME/.bash_profile
```

این خطوط را به انتهای فایل اضافه کنید:

```bash
export PATH=$PATH:/usr/lib/golang/bin
export GOPATH="$HOME/go_projects"
export GOBIN="$GOPATH/bin"
```

برای اعمال در نشست جاری:

```bash
$ source ~/.bash_profile
```

## بازبینی نصب

```bash
$ go version
$ go env
```

راهنمای ابزار مدیریت سورس:

```bash
$ go help
```

## اولین برنامه

پوشهٔ پروژه را بسازید:

```bash
$ mkdir -p ~/go_projects/src/hello
$ vi ~/go_projects/src/hello/hello.go
```

فایل‌های سورس Go پسوند `.go` دارند. محتوای `hello.go`:

```go
package main

import "fmt"

func main() {
	fmt.Printf("Hello, you have successfully installed GoLang in Linux\n")
}
```

کامپایل و اجرا:

```bash
$ go install $GOPATH/src/hello/hello.go
$ $GOBIN/hello
```
