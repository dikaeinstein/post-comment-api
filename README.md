# post-comment-api

[![Build Status](https://travis-ci.com/dikaeinstein/post-comment-api.svg?branch=master)](https://travis-ci.com/dikaeinstein/post-comment-api)
[![Coverage Status](https://coveralls.io/repos/github/dikaeinstein/post-comment-api/badge.svg?branch=master)](https://coveralls.io/github/dikaeinstein/post-comment-api?branch=master)

## Overview

This is my attempt at following Robert C. Martin's `The Clean Architecture` for a Node.js project. So the repo is less about any particular problem but more about the architecture. The imaginary problem is a simple article system that has posts and comments for a post.

## Project Structure

post-comment API adopts the clean code architecture which is based on the business domain and not a framework or tool which are all implementation details. See [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Requirements

* Node.js 10.x
* yarn
* MongoDB 4.x

## Getting Started

``` bash
git clone git@github.com:dikaeinstein/post-comment-api.git
cd post-comment-api
cp .env.sample .env
yarn install
yarn start or yarn watch to start in development mode
```

You should now be able to access the API via http://localhost:8050/api/v1 and perform basic CRUD actions.

**NOTE:** You may need to modify the `.env` file configuration if the defaults in are not suitable for your environment.

## Available Commands

The following commands can be used via `npm` or `yarn`:

* `debug` - runs the API in debug mode
* `lint` — lints the entire application via `eslint`
* `start` — runs the API service via `node`
* `test` — runs all unit tests via `jest`
* `watch` — runs the API service via `nodemon` (useful when developing locally)
