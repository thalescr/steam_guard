import test from "node:test";
import assert from "node:assert/strict";
import { handler } from "./index.js";

test("only post allowed", async (t) => {
  let request = { requestContext: { http: { method: "GET" } } };
  assert.deepEqual(await handler(request), {
    statusCode: 405,
    body: { error: "Method not allowed" },
  });

  request.requestContext.http.method = "PUT";
  assert.deepEqual(await handler(request), {
    statusCode: 405,
    body: { error: "Method not allowed" },
  });

  request.requestContext.http.method = "PATCH";
  assert.deepEqual(await handler(request), {
    statusCode: 405,
    body: { error: "Method not allowed" },
  });

  request.requestContext.http.method = "DELETE";
  assert.deepEqual(await handler(request), {
    statusCode: 405,
    body: { error: "Method not allowed" },
  });
});

test("only json allowed", async () => {
  const request = {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0Ijo5OTk5OTk5OTk5OX0.twvrOrgY_ouhamjpOklFtEbmjROvnUqE3eD2GRe8w30",
    },
    body: "test=aaaa&bbb=cc",
    requestContext: { http: { method: "POST" } },
  };

  assert.deepEqual(await handler(request), {
    statusCode: 400,
    body: { error: "Bad request" },
  });
});

test("required params", async (t) => {
  let request = {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0Ijo5OTk5OTk5OTk5OX0.twvrOrgY_ouhamjpOklFtEbmjROvnUqE3eD2GRe8w30",
    },
    body: JSON.stringify({}),
    requestContext: { http: { method: "POST" } },
  };

  assert.deepEqual(await handler(request), {
    statusCode: 400,
    body: { error: "Missing account_id param" },
  });
});

test("generate token", async (t) => {
  process.env.AUTH_99 = "999999999999999999999999999";
  t.mock.timers.enable({ now: new Date("2000-01-01T00:00:00Z") });

  let request = {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0Ijo5OTk5OTk5OTk5OX0.twvrOrgY_ouhamjpOklFtEbmjROvnUqE3eD2GRe8w30",
    },
    body: JSON.stringify({ account_id: 99 }),
    requestContext: { http: { method: "POST" } },
  };

  assert.deepEqual(await handler(request), {
    statusCode: 200,
    body: { code: "N5V6M" },
  });
});
