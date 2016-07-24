#!/usr/bin/env bash
set -e
gpio export 4 in
nodemon index.js
gpio unexport 4
