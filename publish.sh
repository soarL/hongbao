#!/usr/bin/env bash

git fetch --all
git reset --hard origin/master
cd server
npm i
npm run reload
pm2 ls
