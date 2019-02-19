#!/bin/bash
npm run build
docker build --build-arg COMMIT=$TRAVIS_COMMIT -t gcr.io/hartonline-cloud/temperature_hub:$TRAVIS_COMMIT .;
gcloud docker -- push gcr.io/hartonline-cloud/temperature_hub:$TRAVIS_COMMIT;