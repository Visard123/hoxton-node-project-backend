import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

const users: Prisma.UserCreateInput[] = [
  {
    name: "John",
    email: "John@mail",
    password: bcrypt.hashSync("John"),
    reservations: {
      create: [{ date: "28 March", personsNumber: 2, time: "18:00 Pm" }],
    },
  },
  {
    name: "Lionel",
    email: "Lionel@mail",
    password: bcrypt.hashSync("Lionel"),
    reservations: {
      create: { date: '1 April', personsNumber: 4, time: '20:00 PM' }
    }
  },
  {
    name: "Andres",
    email: "Andres@mail",
    password: bcrypt.hashSync("Andres"),
  },
  {
    name: "Ylber",
    email: "Ylber@mail",
    password: bcrypt.hashSync("Ylber"),
  },
  {
    name: "Shpetim",
    email: "Shpetim@mail",
    password: bcrypt.hashSync("Shpetim"),
  },
];

const wines: Prisma.WineCreateInput[] = [
  {
    title: "Sancerre Domaine Sylcain Bailly",
    price: 10,
    tags: "FR | 125ml GLASS",
  },
  {
    title: "Gavi di Gavi La Giustiniana",
    price: 9,
    tags: "IT | 125ml GLASS",
  },
  {
    title: "Sancerre Rosé, Domaine André Dezat",
    price: 11,
    tags: "Fr | 125ml GLASS",
  },
  {
    title: "Bourgogne Pinot Noir, Domaine Glantenay",
    price: 14,
    tags: "Fr | 125ml GLASS",
  },
  {
    title: "Tinpot Hut Pinot Noir, Marlborough",
    price: 11,
    tags: "NZ | 125ml GLASS",
  },
];

const champagnes: Prisma.ChampagneCreateInput[] = [
  {
    title: "Taittinger Brut Imperial",
    price: 15,
    tags: "FR | 125ml GLASS",
  },
  {
    title: "Veuve Clicquot Rich Doux",
    price: 16,
    tags: "FR | 125ml GLASS",
  },
  {
    title: "Bollinger Special Cuvée Brut",
    price: 17,
    tags: "Fr | 125ml GLASS",
  },
  {
    title: "Dom Pérignon, 2012",
    price: 14,
    tags: "Fr | 125ml GLASS",
  },
  {
    title: "Ayala Blanc de Blancs, Grand Cru, 2014",
    price: 18,
    tags: "FR | 125ml GLASS",
  },
];

async function createStuffs() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  for (const wine of wines) {
    await prisma.wine.create({ data: wine });
  }

  for (const champagne of champagnes) {
    await prisma.champagne.create({ data: champagne });
  }
}
createStuffs();
