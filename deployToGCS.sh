#!/bin/bash

if [ ! -d ${HOME}/google-cloud-sdk ]; then
  rm -rf $HOME/google-cloud-sdk;
  export CLOUDSDK_CORE_DISABLE_PROMPTS=1;
  curl https://sdk.cloud.google.com | bash;
fi;
gcloud auth activate-service-account --key-file client-secret.json;
docker build --build-arg COMMIT=$TRAVIS_COMMIT --build-arg TAG=$TRAVIS_BRANCH -t gcr.io/hartonline-cloud/$1:$TRAVIS_BRANCH-$TRAVIS_COMMIT .;
gcloud docker -- push gcr.io/hartonline-cloud/$1:$TRAVIS_BRANCH-$TRAVIS_COMMIT;
