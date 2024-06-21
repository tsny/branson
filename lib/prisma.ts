import { Prisma, PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;
prisma = new PrismaClient();

export default prisma;

export async function getConfig(configName: string) {
  const val = await prisma.config.findFirst({
    where: {
      name: configName,
    },
  });
  console.log("got config %s = %s", configName, val?.value);
  return val?.value;
}

export async function getConfigAsNumber(configName: string) {
  const val = await getConfig(configName);
  return val ? +val : -1;
}

export async function getConfigValueWithDefault(configName: string, d: string) {
  const val = await getConfig(configName);
  return val ?? d;
}

export async function getConfigValueWithNumberDefault(
  configName: string,
  d: number
) {
  const val = await prisma.config.findFirst({
    where: {
      name: configName,
    },
  });

  return val ? +val : d;
}

const userPersonalData = Prisma.validator<Prisma.CardOwnershipDefaultArgs>()({
  include: { card: true },
});

const postWithUser = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { author: true },
});

export type PostExt = Prisma.PostGetPayload<typeof postWithUser>;
export type Cord = Prisma.CardOwnershipGetPayload<typeof userPersonalData>;
