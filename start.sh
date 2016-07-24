#!/usr/bin/env bash
set -e
# gpio export 7 out
nodemon index.js
# gpio unexport 7
