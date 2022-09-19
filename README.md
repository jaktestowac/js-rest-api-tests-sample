# Steps:

1. create git repo on GitHub
1. clone it on local drive
1. copy project to empty cloned directory
1. add .gitignore
1. commit and push changes (make sure what You commit)
1. Go to GitHub Actions and create workflow with:
    ```
    Node.js

    By GitHub Actions
    Node.js logo

    Build and test a Node.js project with npm.
    ```
1. change config to:
    ```
    name: Running tests on CI

    on:
      push:
        branches: [ "main" ]
      pull_request:
        branches: [ "main" ]

    jobs:
      build:

        runs-on: ubuntu-latest

        strategy:
          matrix:
            node-version: [16.x]
            # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

        steps:
        - uses: actions/checkout@v3
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v3
          with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
        - run: npm i
        - run: npm run testAll
    ```
    Was changed: one node version and proper npm run

1. commit new file `node.js.yml` to `rest-api-js-test-demo/.github/workflows/`
1. Pipeline should be green.
1. Test report as artifact:
    ```
    - name: Archive tests results
      if: success() || failure()
      uses: actions/upload-artifact@v3
      with:
        name: test-report
        path: mochawesome-report
    ```

1. Change reporter to JUnit:
    ```
    npm install mocha-multi-reporters
    ```
1. Change settings in `.mocharc.js`:
   ```
   module.exports = {
    reporter: 'mocha-multi-reporters',
    'reporter-options': 'configFile=reporter.config.json'
   };
    ```
1. Add settings `reporter.config.json`:
   ```
   {
      "reporterEnabled": "spec, xunit, node_modules/mochawesome",
      "xunitReporterOptions": {
          "output": "./reports/test-report.xml"
      }
   }
   ```
1. Add publish artifacts:
    ```
    - name: Publish Test Report
      uses: mikepenz/action-junit-report@v3
      if: success() || failure()
      with:
        report_paths: '**/reports/*.xml'
    ```