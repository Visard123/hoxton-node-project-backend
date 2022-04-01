import express, { json, response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient({ log: ["error", "warn", "query", "warn"] });
const PORT = 4000;

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { reservations: true } });

  res.send(users);
});

app.get("/user/:id", async (req, res) => {
  let id = Number(req.params.id)
  const user = await prisma.user.findUnique({ where: { id: id }, include: { reservations: true } });

  res.send(user);
});

app.get("/wines", async (req, res) => {
  const wines = await prisma.wine.findMany();
  res.send(wines);
});

app.get("/champagnes", async (req, res) => {
  const champagnes = await prisma.champagne.findMany();
  res.send(champagnes);
});

app.get("/reservation", async (req, res) => {
  const reservation = await prisma.reservation.findMany();
  res.send(reservation);
});

// function createToken(id: number) {
//   const token = jwt.sign({ id: id }, "I am Adriano from Puka", { expiresIn: "3days" });
//   return token;
// }
<<<<<<< HEAD

=======
>>>>>>> parent of d3de058 (commit)

function createToken(id: number) {
  //@ts-ignore
  return jwt.sign({ id: id }, process.env.MY_SECRET);
}

async function getUserFromToken(token: string) {
  //@ts-ignore
  const decodedData = jwt.verify(token, process.env.MY_SECRET);
  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: { id: decodedData.id },
    include: { reservations: true }
  });
  return user;
}

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 8);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    res.send({ user, token: createToken(user.id) });
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email }, include: { reservations: true }
    });
    // @ts-ignore
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (user && passwordMatch) {
      res.send({ user, token: createToken(user.id) });
    } else {
      throw Error("Something went wrong!");
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: "User or password invalid" });
  }
});

app.get("/validate", async (req, res) => {
  const token = req.headers.authorization || "";
  try {
    const user = await getUserFromToken(token);
    res.send(user);
  } catch (err) {
    // @ts-ignore
    console.log(err.message)
    // @ts-ignore
    res.status(400).send({ error: "Invalid Token" });
  }
});

app.post('/reservation', async (req, res) => {
  const { dateAndTime, personsNumber, userId } = req.body
  try {
    const reservation = await prisma.reservation.create({
      data: {
        dateAndTime: dateAndTime,
        personsNumber: personsNumber,
        userId: userId
      }
    })
    res.send(reservation)
  }
  catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message })
  }
})


app.listen(PORT, () => {
  console.log(`Server up: http://localhost:${PORT}`);
});
