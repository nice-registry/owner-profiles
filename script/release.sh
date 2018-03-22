#!/usr/bin/env bash

# set -x            # print commands before execution
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone "https://github.com/nice-registry/owner-profiles" module
cd module
npm install
npm install owners --save-dev
npm run build
npm run tally
npm test
[[ `git status --porcelain` ]] || exit
git add .
git config user.email "zeke@sikelianos.com"
git config user.name "Zeke Sikelianos"
git commit -am "update profile data"
npm version minor -m "bump minor to %s"
git push origin master --follow-tags
npm publish