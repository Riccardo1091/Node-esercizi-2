"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const client_mock_1 = require("./lib/prisma/client.mock");
const app_1 = __importDefault(require("./app"));
const request = (0, supertest_1.default)(app_1.default);
describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Earth",
            }
        ];
        // @ts-ignore
        client_mock_1.prismaMock.planet.findMany.mockResolvedValue(planets);
        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planets);
    });
});
describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            id: 3,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-05-15T14:51:23.372Z",
            updatedAt: "2022-05-15T14:51:23.372Z",
        };
        // @ts-ignore
        client_mock_1.prismaMock.planet.create.mockResolvedValue(planet);
        const response = await request
            .post("/planets")
            .send({
            name: "Mercury",
            diameter: 1234,
            moons: 12,
        })
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planet);
    });
    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
//# sourceMappingURL=server.js.map