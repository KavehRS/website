---
layout: post
title:  "نصب و تنظیم زبیکس 5 - زبیکس سرور"
---


## نصب زبیکس سرور

سرور Zabbix در هر توزیع لینوکسی قابل نصب است ، اما در این آموزش ، من به شما نحوه نصب و بهینه سازی جدیدترین نسخه با پشتیبانی بلند مدت  5 یا نسخه استاندارد  5.2  بر روی توزیع اوبونتو 20.04 (Focal) یا اوبونتو 18.04 (Bionic) را نشان می‌دهیم . 

 
برای شروع کار ابتدا زبیکس را نصب می‌کنیم، سپس تنظیماتش را انجام می‌دهیم، سپس به پایگاه داده و رابط کاربری آن می‌پردازیم.
نصب Zabbix server, frontend و agent برای سرور مانیتورینگ زبیکس
بسته Zabbix 5 .deb را بر روی سیستم عامل اوبونتو خود نصب کنید (Ubuntu 20.04 Focal و Ubuntu 18.04 Bionic پشتیبانی می شوند). نسخه 5 نسخه پایدار یا نسخه 5.2 نسخه استاندارد (ویژگی‌های بیشتر با پشتیبانی 6 ماهه و احتمال وجود ناپایداری) را انتخاب کنید.

```
Zabbix 5.0 LTS version (supported until May 31, 2025)
wget https://repo.zabbix.com/zabbix/5.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.0-1+$(lsb_release -sc)_all.deb
sudo dpkg -i zabbix-release_5.0-1+$(lsb_release -sc)_all.deb
sudo apt update
sudo apt -y install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-agent
    
                                 OR

Zabbix 5.2 standard version (supported until May 31, 2021)
wget https://repo.zabbix.com/zabbix/5.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.2-1+ubuntu$(lsb_release -rs)_all.deb
sudo dpkg -i zabbix-release_5.2-1+ubuntu$(lsb_release -rs)_all.deb
sudo apt update
sudo apt -y install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-agent
```
## پیکربندی پایگاه داده

### نصب MariaDB

برای نصب MariaDB  از دستور زیر استفاده می‌کنیم :
```
sudo apt -y install mariadb-common mariadb-server mariadb-client
```
پس از اتمام نصب ، سرویس MariaDB را شروع کرده و با استفاده از دستورات زیر می توانید آن را برای راه اندازی مجدد فعال کنید:

```
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

بازنشانی رمزعبور  rootبرای پایگاه داده
با تغییر رمز ورود پیش فرض برای ریشه MySQL ، MySQL / MariaDB را ایمن کنید:

```
sudo mysql_secure_installation
Enter current password for root (enter for none): Press the Enter
Set root password? [Y/n]: Y
New password: <Enter root DB password>
Re-enter new password: <Repeat root DB password>
Remove anonymous users? [Y/n]: Y
Disallow root login remotely? [Y/n]: Y
Remove test database and access to it? [Y/n]:  Y
Reload privilege tables now? [Y/n]:  Y
```

### ایجاد پایگاه داده

```
sudo mysql -uroot -p'rootDBpass' -e "create database zabbix character set utf8 collate utf8_bin;"
sudo mysql -uroot -p'rootDBpass' -e "grant all privileges on zabbix.* to zabbix@localhost identified by 'zabbixDBpass';"
```

### طراحی ساختار اولیه داده

```
sudo mysql -uroot -p'rootDBpass' zabbix -e "set global innodb_strict_mode='OFF';"
sudo zcat /usr/share/doc/zabbix-server-mysql*/create.sql.gz | mysql -uzabbix -p'zabbixDBpass' zabbix
sudo mysql -uroot -p'rootDBpass' zabbix -e "set global innodb_strict_mode='ON';"
```

رمز عبور پایگاه داده را در پرونده پیکربندی Zabbix وارد کنید :
فایل zabbix_server.conf را با دستور باز کنید: "sudo nano /etc/zabbix/zabbix_server.conf"   و رمزعبور پایگاه داده را در این قالب در هر کجای پرونده اضافه کنید:

```
DBPassword=zabbixDBpass
```

پرونده را ذخیره کرده و از آن خارج شوید (ctrl + x و سپس y را وارد کرده و وارد کنید).

### پیکره‌بندی فایروال
اگر یک فایروال UFW روی اوبونتو نصب کرده اید ، از این دستورات برای باز کردن درگاه های TCP استفاده کنید: 10050 (عامل) ، 10051 (سرور) و 80 (frontend):

```
ufw allow 10050/tcp
ufw allow 10051/tcp
ufw allow 80/tcp
ufw reload
```
###فرآیندهای زبیکس سرور و agent

```
sudo systemctl restart zabbix-server zabbix-agent 
sudo systemctl enable zabbix-server zabbix-agent
```

## پیکره بندی Zabbix frontend
### پیکربندی PHP برای Zabbix frontend
باید فایل /etc/zabbix/apache.conf را ویرایش کنیم :

```
sudo nano /etc/zabbix/apache.conf
```

موقعیت زمانی را تنظیم میکنیم به به صورت پیش فرض به شکل زیر است :

```
php_value date.timezone Europe/Amsterdam
```

پرونده را ذخیره کرده و از آن خارج شوید (ctrl + x و سپس y را وارد کنید و وارد کنید)، سپس وب سرور Apache را مجدداً راه اندازی کرده و از زمان بوت سیستم شروع به کار کنید.
```
sudo systemctl restart apache2
sudo systemctl enable apache2
```
### پیکره بندی frontend

برای شروع ، با استفاده از  "http: // server_ip_or_dns_name / zabbix" به صفحه پیش فرض Zabbix تازه نصب شده خود متصل شوید. به عنوان نمونه برای من آدرس  http://192.168.143.31/zabbix  خواهد بود زیرا من Zabbix را بر روی سرور با آدرس  192.168.143.31 نصب کرده ام.
اساساً ، در این wizard  فقط باید یک رمز عبور برای کاربر Zabbix DB وارد کنید و برای هر چیز دیگر فقط روی " Next step " کلیک کنید. در این راهنما ، من از یک zabbixDBpass به عنوان گذرواژه پایگاه داده استفاده کرده ام ، اما اگر مورد دیگری را تنظیم کردید ، هنگام درخواست wizard  ، رمز ورود صحیح را وارد کنید.
