import request from "supertest";

import app from "../app.js";
import User from "../db/models/User.js";



describe("test controller userLogin", () => {
    
    const loginData = {
        "email": "karine1234@example.com",
        "password": "Karine0405Pass##"
    };

    beforeAll(async ()=>{
        await request(app).post("/api/auth/register").send(loginData);
    });

    afterAll(async ()=>{
        await User.destroy({where:{email: loginData.email}});
        app.close()
    });


    it("test with correct userData", async () => {

        const response = await request(app).post("/api/auth/login").send(loginData);

        expect(response.status).toBe(200);

    });

    it("test token presence", async () => {

        const response = await request(app).post("/api/auth/login").send(loginData);

        expect(response.body.token).toBeTruthy();

    });

    it("test user is object", async () => {

        const response = await request(app).post("/api/auth/login").send(loginData);

        expect(response.body.user).toBeInstanceOf(Object);

    });

    it("test user object containing", async () => {

        const response = await request(app).post("/api/auth/login").send(loginData);

        expect(response.body.user).toEqual(
            expect.objectContaining({
              email: expect.any(String),
              subscription: expect.any(String),
            }),
          );
    });

});