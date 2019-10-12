[![Heroku App Status](http://heroku-shields.herokuapp.com/hiphup-api)](https://hiphup-api.herokuapp.com)
[![Build Status](https://travis-ci.org/livissnack/hiphup-api.svg?branch=master)](https://travis-ci.org/livissnack/hiphup-api)
![GitHub All Releases](https://img.shields.io/github/downloads/livissnack/hiphup-api/total)
![GitHub repo size](https://img.shields.io/github/repo-size/livissnack/hiphup-api)
![GitHub package.json version](https://img.shields.io/github/package-json/v/livissnack/hiphup-api)
![GitHub](https://img.shields.io/github/license/livissnack/hiphup-api)
# Hiphup-api项目

这是一个构建于AdonisJs上的接口项目，主要用于日常工作中的开发测试！
This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. 将.env文件中的变量全部配置在Config Vars里面
2. 注意需要添加一个ENV_SILENT=true的变量，用于屏蔽.env文件报错
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## 安装

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


## 部署

Run the following command to run startup migrations.

```js
adonis migration:run
```

## 功能明细

## 版权所有