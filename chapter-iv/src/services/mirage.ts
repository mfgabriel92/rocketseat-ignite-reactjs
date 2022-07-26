import { faker } from "@faker-js/faker";
import { ActiveModelSerializer, createServer, Factory, Model, Response } from "miragejs";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

function makeServer() {
  return createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name(i) {
          return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(30);
        },
      }),
    },
    seeds(server) {
      server.createList("user", 100);
    },
    routes() {
      this.namespace = "api/v1/";
      this.timing = 1000;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams as any;
        const totalRecords = schema.all("user").length;
        const startingPage = (Number(page) - 1) * Number(per_page);
        const endingPage = startingPage + Number(per_page);
        const allUsers = this.serialize(schema.all("user")).users;
        const users = allUsers.slice(startingPage, endingPage);

        return new Response(200, { "x-total-records": String(totalRecords) }, { users });
      });
      this.get("/users/:id");
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
    serializers: {
      application: ActiveModelSerializer,
    },
  });
}

export default makeServer;
