#!/bin/bash
openssl aes-256-cbc -K $encrypted_71512d77c8b2_key -iv $encrypted_71512d77c8b2_iv -in secrets.tar.enc -out secrets.tar -d
tar xvf secrets.tar
if [ ! -d ${HOME}/google-cloud-sdk ]; then
  rm -rf $HOME/google-cloud-sdk;
  export CLOUDSDK_CORE_DISABLE_PROMPTS=1;
  curl https://sdk.cloud.google.com | bash;
fi;
gcloud auth activate-service-account --key-file client-secret.json;
gcloud config set project hartonline-cloud
gcloud config set compute/zone us-central1-c
gcloud container clusters get-credentials test