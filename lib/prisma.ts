import { Prisma, PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;
prisma = new PrismaClient();

export default prisma;

export async function getConfigValue(configName: string) {
  return await prisma.config.findFirst({
    where: {
      name: configName,
    },
  });
}

export async function getConfigValueWithDefault(configName: string, d: string) {
  const val = await prisma.config.findFirst({
    where: {
      name: configName,
    },
  });
  return val ?? d;
}

const userPersonalData = Prisma.validator<Prisma.CardOwnershipDefaultArgs>()({
  include: { card: true },
});

const postWithUser = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { author: true },
});

export type PostExt = Prisma.PostGetPayload<typeof postWithUser>;
export type Cord = Prisma.CardOwnershipGetPayload<typeof userPersonalData>;
