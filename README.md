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
3. 使用免费的Heroku进行部署
4. 使用Heroku的免费数据库Postgres
5. 域名地址：https://hiphup-api.herokuapp.com
6. 用于研究各种类型接口

## 安装

首先克隆代码到本地目录（git clone git@github.com:livissnack/hiphup-api.git），然后执行如下命令：

```bash
cd hiphup-api
npm install
npm start
```

## 部署
注册[heroku](https://www.heroku.com)账号，创建app，为app添加附加组件数据库Postgres。
选择部署方法为：Githup Connected，连接授权到githup，开启自动部署，并绑定travis-ci集成
测试。然后每次修改代码后，git push，先集成测试，再自动部署到Heroku环境。

```bash
git add .
git commit -am 'commit content'
git push
```

## 功能明细

### API列表

| Url                        | Name             | Status    |
| -------------------------- |:----------------:| ---------:|
| /v1.0/news/baidu           | 百度新闻          |  active   |
| /v1.0/news/toutiao         | 头条新闻          |  active   |

### API接口

#### 抓取百度新闻

目前有4种新闻类别，对应的type是：
- 推荐：popular
- 体育: sport
- 科技: tech
- 汽车: car
##### Request
- Method: **GET**
- URL:  
    - crawler news:  ```/v1.0/news/baidu?type=tech&date=2019-10-12```
- Headers：
- Body:
```
```

##### Response
- Body
```json
{
  "code": 200,
  "data": "730781",
  "message": "OK"
}
```

#### 抓取头条新闻

目前有4种新闻类别，对应的type是：
- 推荐：popular
- 体育: sport
- 科技: tech
- 汽车: car
##### Request
- Method: **GET**
- URL:  
    - crawler news:  ```/v1.0/news/toutiao?type=tech&date=2019-10-12```
- Headers：
- Body:
```
```

##### Response
- Body
```json
{
  "code": 200,
  "data": "730781",
  "message": "OK"
}
```

## 版权所有（MIT）