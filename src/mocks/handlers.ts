// src/mocks/handlers.js
import { rest } from "msw";

const posts = [
  {
    id: 0,
    title: "First post",
    content: "Hello!",
    author: "Yihua",
    likes: 0,
  },
  {
    id: 1,
    title: "Second post",
    content: "Hello!",
    author: "Yihua",
    likes: 1,
  },
  {
    id: 2,
    title: "",
    content: "Third post with no title",
    author: "Yihua",
    likes: 33,
  },
];

const projects = [
  {
    id: 0,
    name: "First project",
    content: "Hello!",
    field: ["AI", "IT서비스"],
    createDate: "2023-09-01",
    endDate: "2023-09-30",
    likes: 0,
  },
  {
    id: 1,
    name: "Second project",
    content: "전기전자 프로젝트입니다.",
    field: ["전기전자"],
    createDate: "2022-11-11",
    endDate: "2023-01-12",
    likes: 21,
  },
];

const user = {
  likedPosts: [1, 2],
  likedProjects: [0],
};

export const handlers = [
  rest.get("/post/postAll", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: posts }));
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

  rest.get("/members/me", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.post("/post/create", async (req, res, ctx) => {
    const { subject, content } = await req.json();
    if (subject === "error") return res(ctx.status(400));

    posts.push({
      id: posts.at(-1)?.id ? posts.at(-1)!.id + 1 : 0,
      title: subject,
      content,
      author: "new user",
      likes: 0,
    });
    console.log(posts);
    return res(ctx.status(200));
  }),

  rest.delete("/post/delete/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    posts.splice(index, 1);

    return res(ctx.status(200));
  }),

  rest.post("/project/create", async (req, res, ctx) => {
    const { name, content, field, createDate, endDate } = await req.json();
    if (name === "error") return res(ctx.status(400));

    const id = projects.at(-1)?.id ? projects.at(-1)!.id + 1 : 0;

    projects.push({
      id,
      name,
      content,
      field,
      createDate,
      endDate,
      likes: 0,
    });

    return res(ctx.status(200), ctx.json(id));
  }),

  rest.get("/project/projectAll", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: projects }));
  }),

  rest.delete("/project/delete/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = projects.findIndex((project) => project.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    projects.splice(index, 1);

    return res(ctx.status(200));
  }),

  rest.get("/project/search/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = projects.findIndex((project) => project.id === parseInt(id));
    if (index === -1) return res(ctx.status(400));
    console.log(projects);

    return res(ctx.status(200), ctx.json({ data: projects[index] }));
  }),

  rest.put("/project/like/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    console.log(id);
    const index = user.likedProjects.findIndex(
      (projectId) => projectId === parseInt(id)
    );
    if (index !== -1) {
      user.likedProjects.splice(index, 1);
    } else {
      user.likedProjects.push(parseInt(id));
    }

    return res(ctx.status(200));
  }),
  rest.put("/post/like/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const index = user.likedPosts.findIndex(
      (PostId) => PostId === parseInt(id)
    );
    if (index !== -1) {
      user.likedPosts.splice(index, 1);
    } else {
      user.likedPosts.push(parseInt(id));
    }

    return res(ctx.status(200));
  }),
];
