# sjzqx
Weather App based on Django for Shi-Jia-Zhuang City, HeBei, China

---

## Demos
![demo01](https://github.com/bazingaedward/sjzqx-django/blob/master/screenshot/demo01.png)
![demo02](https://github.com/bazingaedward/sjzqx-django/blob/master/screenshot/demo02.png)
![demo03](https://github.com/bazingaedward/sjzqx-django/blob/master/screenshot/demo03.png)

## Features
- basic responsible design for mobile device
- openlayer JS integrated
- Highchart.JS integrated
- Weather API (free) with Jsonp: https://www.seniverse.com/
- Air Quality API: http://www.pm25.in/
- Fully coded project

## Install Dependence
- nginx with uwsgi

## Quick Start
- 1. download source code

```
git clone git@github.com:bazingaedward/sjzqx-django.git
```

- 2. pip install requirement

```
pip install -r requirements.txt
```
- 3. start nginx
```
cd app
./startsrv
```


## Django Installed apps
- django-cms<3.5
- djangocms-admin-style>=1.2,<1.3
- django-treebeard>=4.0,<5.0
- django-ckeditor
- djangocms-text-ckeditor>=3.2.1
- djangocms-link>=1.8
- djangocms-style>=1.7
- djangocms-googlemap>=0.5
- djangocms-snippet>=1.9
- djangocms-video>=2.0
- djangocms-column>=1.6
- easy_thumbnails
- django-filer>=1.2
- cmsplugin-filer>=1.1
- Django<1.9
- pytz
- django-classy-tags>=0.7
- html5lib>=0.999999,<0.99999999
- Pillow>=3.0
- django-sekizai>=0.9
- six
- requests
- bs4
- numpy
- matplotlib
- vpyproj
- pyshp
- shapely


## License
[MIT](https://tldrlegal.com/license/mit-license)
