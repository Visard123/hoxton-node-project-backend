import express, { json, response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient({ log: ["error", "warn", "query", "warn"] });
const PORT = 4000;

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get("/wines", async (req, res) => {
  const wines = await prisma.wine.findMany();
  res.send(wines);
});

app.get("/champagnes", async (req, res) => {
  const champagnes = await prisma.champagne.findMany();
  res.send(champagnes);
});

// function createToken(id: number) {
//   const token = jwt.sign({ id: id }, "shhhh", { expiresIn: "3days" });
//   return token;
// }

app.listen(PORT, () => {
  console.log(`Server up: http://localhost:${PORT}`);
});
