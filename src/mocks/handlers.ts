// src/mocks/handlers.js
import { rest } from "msw";

const posts = [
  {
    title: "First post",
    content: "Hello!",
    author: "Yihua",
    likes: 0,
  },
  {
    title: "Second post",
    content: "Hello!",
    author: "Yihua",
    likes: 1,
  },
  {
    title: "",
    content: "Third post with no title",
    author: "Yihua",
    likes: 33,
  },
];

export const handlers = [
  rest.get("/post/postAll", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),

  rest.post("/api/v1/members/join", async (req, res, ctx) => {
    // error test
    const { email } = await req.json();
    if (email === "error@test.com") return res(ctx.status(400));

    // Persist user's authentication in the session
    sessionStorage.setItem("joined", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.post("/api/v1/members/login", (_, res, ctx) => {
    const joined = sessionStorage.getItem("joined");

    if (!joined) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    sessionStorage.setItem("logged-in", "true");
    return res(ctx.status(200));
  }),

  rest.post("/post/create", async (req, res, ctx) => {
    const { subject, content } = await req.json();
    if (subject === "error") return res(ctx.status(400));

    posts.push({ title: subject, content, author: "new user", likes: 0 });
    console.log(posts);
    return res(ctx.status(200));
  }),
];
