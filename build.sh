#!/usr/bin/env bash

set -exuo pipefail

npx tsc
chmod +x dist/cli.js
node readme-generator/update-readme.js
npx prettier --write README.md
