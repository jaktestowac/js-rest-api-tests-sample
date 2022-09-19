const { request, expect } = require("../../config")


describe("GET /users", function() {
    it("should return status code 200 and more than 4 users", async function() {
        // arrange:
        const expectedStatusCode = 200
        const expectedNumberOfUsers = 5

        // act:
        const response = await request.get("/users/")

        // assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode,
            `For GET /users we expect status code: ${expectedStatusCode}`)
        expect(response.body.length).to.be.greaterThanOrEqual(expectedNumberOfUsers)
    })
})
