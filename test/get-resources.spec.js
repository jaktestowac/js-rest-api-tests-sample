const { request, expect } = require("../../config")

describe("GET /", function() {
    it("should return status code 200 when asking about anything", async function() {
        // arrange:
        const expectedStatusCode = 200

        // act:
        const response = await request.get("/anything")

        // assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode,
            `For GET /anything we expect status code: ${expectedStatusCode}`)
        })

    it.skip("should return status code 200 when asking about json", async function() {
        // arrange:
        const expectedStatusCode = 404

        // act:
        const response = await request.get("/json")

        // assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode,
            `For GET /json we expect status code: ${expectedStatusCode}`)
        })
    })
