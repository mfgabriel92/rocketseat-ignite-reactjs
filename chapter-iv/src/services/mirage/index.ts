import { faker } from "@faker-js/faker";
import { createServer, Factory, Model } from "miragejs";

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
      server.createList("user", 10);
    },
    routes() {
      this.namespace = "api/v1/";
      this.timing = 1000;

      this.get("/users");
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });
}

export default makeServer;
