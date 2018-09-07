yarn run lint 
yarn run test 
yarn global add codeclimate-test-reporter
codeclimate-test-reporter < ../coverage/lcov.info
case "$TRAVIS_BRANCH" in
    "newreact" ) export CERT_NAME=hub.test.hartcode.com;;
    "prod" ) export CERT_NAME=ssl-hub.hartcode.com;;
    * ) echo "No Certs";;
esac
yarn run build