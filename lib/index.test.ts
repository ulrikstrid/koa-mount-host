import Koa = require("koa");
import request = require("supertest");

import mount from "../lib";

describe("koa-rewrite-host", () => {
  it("can rewrite localhost:4010 to /localhost", done => {
    const app = new Koa();
    const app2 = new Koa();

    app2.use(ctx => {
      ctx.body = ctx.host;
    });

    app.use(mount("localhost:4010", app2));

    const server = app.listen(4010);

    return request("localhost:4010")
      .get("/")
      .then(response => {
        expect(response.text).toBe("localhost:4010");

        server.close();

        done();
      });
  });

  it("can rewrite lvh.me:4020 to /lvh", done => {
    const app = new Koa();
    const app2 = new Koa();

    app2.use(ctx => {
      ctx.body = ctx.host;
    });

    app.use(mount("lvh.me:4020", app2));

    const server = app.listen(4020);

    return request("lvh.me:4020")
      .get("/")
      .then(response => {
        expect(response.text).toBe("lvh.me:4020");

        server.close();

        done();
      });
  });

  it("doesn't rewrite if it doesn't match", done => {
    const app = new Koa();
    const app2 = new Koa();

    app2.use(ctx => {
      ctx.body = ctx.host;
    });

    app.use(mount("lvh.me:4030", app2));

    const server = app.listen(4030);

    return request("localhost:4030")
      .get("/")
      .then(response => {
        expect(response.text).toBe("Not Found");
      })
      .then(() =>
        request("lvh.me:4030")
          .get("/")
          .then(response => {
            expect(response.text).toBe("lvh.me:4030");

            server.close();

            done();
          })
      );
  });
});
