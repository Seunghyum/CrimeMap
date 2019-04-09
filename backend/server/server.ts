import * as mongoose from "mongoose";
import app from "./app";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/event_map";
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  const client = await mongoose.connect(url, { useNewUrlParser: true });
  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
