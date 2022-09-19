const { expect } = require("chai")
const { faker } = require("@faker-js/faker")

var argv = require('yargs/yargs')(process.argv).argv

console.log('Parameters used in tests:', argv)

const appAddress = argv.addr ?? "https://httpbin.org/"
const request = require("supertest")(appAddress + "/api")


module.exports = {
    expect,
    request,
    faker
}