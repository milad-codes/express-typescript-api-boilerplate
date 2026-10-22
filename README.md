# TypeScript REST API starter

An Express API example with MongoDB persistence, user registration and login, JWT authentication, and post creation. Built in 2022.

## Implementation

- Controllers define routes and HTTP responses; services contain application logic.
- Mongoose models describe users and posts.
- Joi middleware validates registration, login and post creation requests.
- Authentication middleware verifies JWTs before the user endpoint runs.
- Shared error middleware translates application errors into HTTP responses.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/users/register` | Register a user and return a token |
| POST | `/api/users/login` | Authenticate a user and return a token |
| GET | `/api/users` | Read the authenticated user |
| POST | `/api/posts` | Create a post |

## Run locally

Use MongoDB and configure these environment variables in a local `.env` file: `NODE_ENV` (`development`), `MONGO_PATH` (MongoDB connection URI), `JWT_SECRET` (your own secret), and optionally `PORT` (default 3000). Never commit local secrets.

```sh
npm ci
npm run dev
```

`npm run build` compiles TypeScript. `npm start` runs the compiled application. The repository does not contain an automated test suite; `npm test` is an unimplemented script.

## Source map

- [Application setup](src/app.ts)
- [User routes](src/resources/user/user.controller.ts)
- [User logic](src/resources/user/user.service.ts)
- [Post routes](src/resources/post/post.controller.ts)
- [Authentication middleware](src/middleware/authenticated.middleware.ts)

This is an earlier API starter, with the original dependency versions. It documents implementation practice rather than a deployed product or measured production results.

[Portfolio](https://miladcodes.com) · [LinkedIn](https://www.linkedin.com/in/miladcodes)
