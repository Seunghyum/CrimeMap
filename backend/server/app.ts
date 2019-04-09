import * as express from "express";
import * as path from "path";

// // Import controllers
import itemsController from "./items/items.controller";

// Create the express application
const app = express();

// Assign controllers to routes
app.use("/api/items", itemsController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve("..", "frontend", "build")));

// Intercept requests to return the frontend's static entry point
app.get("*", (request, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

export default app;
