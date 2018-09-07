yarn run lint 
yarn run test 
yarn global add codeclimate-test-reporter
codeclimate-test-reporter < coverage/lcov.info
case "$TRAVIS_BRANCH" in
    "newreact" ) export API_URL=homehub.cloud.test.hartcode.com;;
    "prod" ) export API_URL=hub.hartcode.com;;
    * ) echo "No EnV";;
esac
yarn run build