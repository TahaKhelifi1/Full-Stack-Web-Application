import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

type DummyProduct = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  category: string;
};

async function main() {
  console.log("Fetching products from dummyjson.com...");
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const { products } = (await res.json()) as { products: DummyProduct[] };

  console.log(`Deleting existing products and seeding ${products.length} products...`);
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        thumbnail: p.thumbnail,
        stock: p.stock,
        category: {
          connectOrCreate: {
            where: { name: p.category },
            create: { name: p.category },
          },
        },
      },
    });
  }

  console.log(`Successfully seeded ${products.length} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
