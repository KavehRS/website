---
layout: post2
title:  نصب و تنظیم زبیکس 5 - زبیکس اجنت لینوکس
pdate: 1399-12-30
author: KavehRS
tags: zabbix zabbix-agent
---

### غیر فعال کردن selinux

برای کار با زبیکس در توزیع‌های لینوکسی مبتنی بر ردهت بهتر است که SELinux را غیر فعال کنیم، برای این‌کار فایل تنظیمات را که در ادرس زیر است، باز میکنیم 

```
  nano /etc/selinux/config
  ```
تنظیمات SELinux را بر روی غیر فعال قرار می‌دهیم.

```
  SELINUX=disabled
```
فایل را سیو کرده و سیستم را ری‌استارت می‌کنیم


### نصب زبیکس اجنت در توزیع‌های مبتنی بر ردهت (RedHat base)سیستم‌عامل گنو لینوکس

در ابتدا مخزن مربوطه را به سیستم عامل خود اضافه میکنیم تا بتوانیم اجنت زبیکس را نصب کنیم




### افزودن مخزن (Repository) به سیستم عامل برای نصب اجنت

در  ابتدا مخزن مربوطه را به سیستم عامل خود اضافه میکنیم تا بتوانیم اجنت زبیکس را نصب کنیم

#### برای توزیع‌های مبتنی بر رد‌هت (RHIL, CentOS & Fedora)
```
  # rpm -Uvh https://repo.zabbix.com/zabbix/5.0/rhel/8/x86_64/zabbix-release-5.0-1.el8.noarch.rpm
  # dnf clean all
```
#### برای اوبونتو 18.04
```
wget https://repo.zabbix.com/zabbix/5.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.0-1+bionic_all.deb
sudo dpkg -i zabbix-release_5.0-1+bionic_all.deb
 ```
#### برای اوبونتو 20.04
 ```
wget https://repo.zabbix.com/zabbix/5.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.2-1+ubuntu20.04_all.deb
sudo dpkg -i zabbix-release_5.2-1+ubuntu20.04_all.deb 
 ```
#### برای دبیان 10
  ```
wget https://repo.zabbix.com/zabbix/5.0/debian/pool/main/z/zabbix-release/zabbix-release_5.0-1%2Bbuster_all.deb
sudo dpkg -i zabbix-release_5.0-1%2Bbuster_all.deb 
 ```
 
### نصب اجنت
  
#### برای توزیع‌های مبتنی بر رد‌هت 

```
  # dnf install zabbix-agent
```

#### برای توزیع‌های مبتنی بر دبیان 
 
```
 # apt update
 #  apt install zabbix-agent
```

### تنظیم و راه اندازی
پس از مراحل نصب، باید اجنت زبیکس را فعال کرد که با دستور زیر انجام می‌شود

```
  systemctl enable --now zabbix-agent
```

پس برای تنظیم زبیکس اقدام میکنیم، می‌توانید با ویرایشگر nano یا هر ویرایشگر دیگری که مورد نظرتان است، به مانند خط زیر به فایل تنظیمات اجنت زبیکس دسترسی پیدا کنید :

```
  # nano /etc/zabbix/zabbix_agentd.conf
```
بعد از باز کردن فایل تنظیمات خط‌های زیر را یک به یک یافته و ویرایش می‌کنیم، IP که در قسمت زیر قرار می‌دهید، مربوط به سرور زبیکس شما است.

```
  Server=192.168.100.502
  ServerActive=192.168.100.502
  Hostname=client
```
بعد از انتجام تنظیمات باید سرویس زبیکس را با دستور زیر مجددا راه‌اندازی کنید 

```
systemctl restart zabbix-agent
```

### تنظیم فایروال

برای اینکه اجنت زبیکس بتواند با سرور ارتباط برقرار کند باید پورت‌های مورد نظر را در فایروال باز کنیم تا فرایند ارتباط مختل نشود، بدین منظور دستورات مربوط به دو فایروال پر استفاده را در زیر می‌آوریم، برای سایر فایروال‌ها نیز باید همین پورت‌ها را مجاز کرد 

#### firewalld
```
  firewall-cmd --add-service={http,https} --permanent
  firewall-cmd --add-port={10051/tcp,10050/tcp} --permanent
  firewall-cmd --reload
```

#### ufw

```
  ufw allow 10050
  ufw allow 10051
  ufw allow http
  ufw allow https
```



