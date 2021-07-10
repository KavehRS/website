---
layout: post
title: نصب زبان برنامه نویسی گو
date: 2020-01-24 10:07 +0330
pdate: 1398-11-4
author: KavehRS
tags: technical Go-lang programming
---

<div dir="ltr" style="text-align: left;" trbidi="on">
<div dir="rtl" style="text-align: justify;">
<span style="font-family: &quot;times&quot; , &quot;times new roman&quot; , serif;">زبان برنامه نویسی Go که در واقع GoLang می باشد یک زبان برنامه نویسی Open Source می باشد که برای برنامه نویسی سطح پایین طراحی شده است که کاربران قادر خواهند بود تا به راحتی برنامه های کامپیوتری قابل اعتماد و کارآمد را به سادگی بنویسند.
</span></div>
<div dir="rtl" style="text-align: justify;">
<span style="font-family: &quot;times&quot; , &quot;times new roman&quot; , serif;">این زبان برنامه نویسی از سال 2007 توسط تیمی شامل Robert Griesemer, Rob Pike و Ken Thompson از شرکت گوگل توسعه داده شد.

</span></div>
<div dir="rtl" style="text-align: justify;">
<span style="font-family: &quot;times&quot; , &quot;times new roman&quot; , serif;">go یک زبان قدرتمند و قابل اطمیمان می باشد که از شبکه و multiprocessing پشتیبانی می کند.در این مطلب قصد داریم تا زبان برنامه نویسی go را نصب کنیم.

</span><br />
<span style="font-family: &quot;times&quot; , &quot;times new roman&quot; , serif;"><br /></span>
<span style="font-family: &quot;times&quot; , &quot;times new roman&quot; , serif;"><br /></span></div>
<div dir="rtl" style="text-align: right;">
<b>نصب GoLang :



</b></div>
<div dir="rtl" style="text-align: right;">
برای شروع نصب اگر از فدورا استفاده می کنید کافیست تا دستور زیر را نصب کنید :<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
&nbsp;#dnf install go</blockquote>
اگر از CentOS استفاده می کنید کافیست تا این دستور را اجرا کنید :<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
&nbsp;#yum install go</blockquote>
<br />
<b>پیکربندی GoLang Environment :

</b><br />
گام نخست ساختن Go workspace می باشد که برای اینکار کافیست تا پوشه  go_projects/~ را ایجاد کنید که در واقع ریشه ی workspace می باشد.پوشه ی go_projects نیز باید شامل سه پوشه به شرح زیر باشد :
<br />
<br />
<ul style="text-align: right;">
<li>bin : برای Go executable binaries می باشد.&nbsp;</li>
<li>src : برای ذخیره source file ها می باشد.&nbsp;</li>
<li>pkg :  برای ذخیره package object ها می باشد.</li>
</ul>
<div>
اکنون برای ساخت پوشه ی go_projects و سه زیر پوشه ی آن کافیست تا دستور پایین را اجرا کنید :
<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
$ mkdir -p ~/go_projects/{bin,src,pkg}</blockquote>
<br />
اکنون این فایل را باز کنید :
<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
$ vi $HOME/.bash_profile</blockquote>
<br />
سپس این خطوط را به انتهای فایل اضافه کنید و فایل را ذخیره کنید :
<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
export PATH=$PATH:/usr/lib/golang/bin<br />
export GOPATH=”$HOME/go_projects”<br />
export GOBIN=”$GOPATH/bin”</blockquote>
<br />
اکنون جهت اعمال تغییرات در bash session جاری کافیست تا این دستور را اجرا کنید :
<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
$ source ~/.bash_profile</blockquote>
</div>
<b>بازبینی نصب GoLang :</b><br />
برای این کار کافیست تا دستورات پایین را اجرا کنید :<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
<br />
$ go version<br />
$ go env


</blockquote>
</div>
<div dir="rtl" style="text-align: right;">
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
</div>
<br />
<br />
&nbsp;جهت دیدن راهنمای ابزار مدیریت سورس کد go می توانید از دستور پایین استفاده کنید :<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
$ go help</blockquote>
<br />
<b>نوشتن اولین برنامه به زبان go :</b><br />
<b></b>در این مرحله قصد داریم اولین برنامه خود را با زبان برنامه نویسی go بنویسیم.برای شروع پوشه ی زیر را ایجاد کنید :
</div>
<blockquote class="tr_bq">
$ mkdir -p ~/go_projects/src/hello</blockquote>
<br /></div>
<div dir="rtl" style="text-align: right;">
اکنون فایل hello.go را باز کنید (ایجاد کنید) :


</div>
<div dir="rtl" style="text-align: right;">
<br /></div>
<div style="text-align: left;">
</div>
<blockquote class="tr_bq">
$ vi ~/go_projects/src/hello/hello.go</blockquote>
<div dir="rtl" style="text-align: right;">
<br /></div>
<div style="text-align: left;">
<div dir="rtl" style="text-align: right;">
توجه داشته باشید فایل های سورس کد go دارای پسوند go. می باشند.



<b><br /></b>
اکنون پس از باز کردن فایل hello.go خطوط پایین را درون فایل بنویسید و فایل را ذخیره کنید :&nbsp;</div>
<div dir="rtl" style="text-align: right;">
&nbsp;&nbsp;</div>
<blockquote class="tr_bq" style="text-align: left;">
<br />
package main&nbsp;</blockquote>
<blockquote class="tr_bq" style="text-align: left;">
import “fmt”&nbsp;</blockquote>
<blockquote class="tr_bq" style="text-align: left;">
func main() {<br />
fmt.Printf(“Hello, you have successfully installed GoLang in Linux\n”)<br />
}


</blockquote>
<div dir="rtl" style="text-align: right;">
اکنون جهت کامپایل کد و اجرای آن این دستورها را اجرا کنید :


<br />
<blockquote class="tr_bq" dir="ltr" style="text-align: left;">
<br />
$ go install $GOPATH/src/hello/hello.go<br />
$ $GOBIN/hello


</blockquote>
</div>
<div dir="rtl" style="text-align: right;">
امید است تا از این مطلب استفاده ی لازم را برده باشید و برنامه های خوبی با زبان go بنویسید.
