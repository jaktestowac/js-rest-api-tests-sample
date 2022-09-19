# What we will test:

https://httpbin.org/#/Anything/get_anything

# Prerequesties
GitHub account

# 6 Easy Steps to run your first API test! 

1. ✨ Get your own copy of this repository
   - Click `Fork` button on the top right corner
   - Effect: repository cloned to your GitHub account
1. ✅ Enable GitHub Actions CI
   - Go to `Actions` panel
   - Click `I understand my worflows, go ahead and enable them`
   - Effect: Actions unlocked but shows `There are no workflow runs yet.`
1. 📜 Open code editor 
   - Go to `Code` panel
   - Click `.` (dot symbol) on your keyboard 
   - Effect: Visual Studio Code Editor opened with EXPLORER panel on left
1. 🐱‍💻 Start coding 
   - On left chose `test` folder and click `get-resources.spec.js`
   - DELETE `.skip` phrase (with dot) from first test (starting in line `3`)
1. 🐱‍🏍Apply changes to repository
   - Use keyboard shortcut `Ctrl + Shift + G` to open SOURCE CONTROL panel on left
   - Enter changes message `Removed skip from first test`
   - Click ✔ (tick button) on top menu in SOURCE CONTROL panel
   - Effect: All changes applied to your repository! (this is called `pushed commit`)
1. 👀 See tests in Action
   - Go to top left hamburger menu and clik it
   - Use last option `Go to repository`
   - Effect: Repository opened in new tab
   - Go to `Actions` panel and click `Removed skip from first test` workflow

🎉 Effect: test run with success!
   - scroll to the bottom of the page and check results (should will look like):


      | ---------------- | Tests | Passed ✅ | Skipped ↪️ | Failed ❌ |
      | ---------------- | ----- | --------- | ----------- | --------- |
      |JUnit Test Report | 2 run | 1 passed  | 1 skipped   | 0 failed  |


## 👨‍💻 Your turn: 
   - Remove skip from next test, 
   - Make `commit`
   - See how it fail in `Actions`
   - ...and then fix it!


# Steps Advaced:
 
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