#!/usr/bin/env bash

set -e

if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  echo -e "Usage:\t${BASH_SOURCE[0]} [-h | pack | publish]\n"
  echo -e "Commands:\n\tpack\t\tCreate npm package\n\tpublish\t\tPublish npm package (default)\n"
  echo -e "Options:\n\t-h, --help\tPrint this message"
  exit 0
fi

readonly NPM_COMMAND=${1:-publish}
readonly BAZEL=`which bazel`

if [ "$BAZEL" == "" ]; then
  echo -e "Bazel is not installed"
  exit 1
fi

readonly PKG_NPM_LABELS=`$BAZEL query --output=label 'kind("pkg_npm", //...)'`

$BAZEL build --config=release $PKG_NPM_LABELS

for pkg in $PKG_NPM_LABELS ; do
  $BAZEL run --config=release -- ${pkg}.${NPM_COMMAND} --access public
done
