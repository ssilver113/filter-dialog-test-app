# Filter dialog demo
## Introduction

Small test app for a basic filter dialog demo. Built with Maven, Java 11, Spring Boot 2.4, Angular 11 and Postgres 11.

![image of app](https://github.com/ssilver113/filter-dialog-test-app/blob/main/app_image.PNG?raw=true)

## Overview & requirements

The landing page contains a "Show Dialog" buttons which opens a filter editing dialog. 

User can open and close multiple dialogs. Dialogs can be moved around, and their height can be resized.

Dialogs contain filter settings: name, conditions and match condition. There are 3 types of conditions: amount, title and date which each have at least parameter choices. User can add / remove different filter conditions.

By default, the dialog is preloaded with data (mainly for demo purposes). Saving filter settings updates the data in db.

## Setup

* Set up a postgres database and edit the connection settings in application.properties.
* Build and run Spring Boot app with Maven (localhost:8080) - Update proxy.conf.json if different port
* Run angular application with 'ng serve' (webapp inserted into java project for demo purposes) - default localhost:4200

Starting the java app runs sql files to populate the database with default data.

Visit localhost:4200 to use demo app