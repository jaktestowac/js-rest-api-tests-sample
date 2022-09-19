const { request, expect } = require("../../config")


describe("GET /lessons", function() {
    it("should return content of lesson 5", async function() {
        // arrange:
        const expectedStatusCode = 200
        const expectedBody = {
            "title": "5. Dynamicznie pobierane dane: API"
          }

        // act:
        const response = await request.get("/lessons/5/")

        // assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode,
            `For GET /users we expect status code: ${expectedStatusCode}`)
        expect(response.body).to.be.deep.equal(expectedBody)
    })
    it("should return content of lesson 6", async function() {
        // arrange:
        const expectedStatusCode = 200
        const expectedBody = {
            "title": "6. Dodatkowy front-end do API"
          }

        // act:
        const response = await request.get("/lessons/6/")

        // assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode,
            `For GET /users we expect status code: ${expectedStatusCode}`)
        expect(response.body).to.be.deep.equal(expectedBody)
    })
})