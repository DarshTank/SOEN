import http from "http";
import app from "./app.js";
import { log } from "console";
import "dotenv/config";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is Running on PORT ${port}`);
});
