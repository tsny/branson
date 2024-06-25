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

export async function getConfigWithDefault(configName: string, d: string) {
  const val = await getConfig(configName);
  return val ?? d;
}

/**
 * Returns whether the config value is the expected value
 */
export async function assertConfig(configName: string, expected: string) {
  const val = await getConfig(configName);
  return val === expected;
}

export async function updateConfigWithValue(cfg: string, value: string) {
  console.log("updating %s: %s", cfg, value);
  await prisma.config.update({
    where: {
      name: cfg,
    },
    data: {
      value: value,
    },
  });
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

const userWithCards = Prisma.validator<Prisma.CardOwnershipDefaultArgs>()({
  include: { card: true },
});

const postWithUser = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { author: true },
});

export type PostExt = Prisma.PostGetPayload<typeof postWithUser>;

// A Cord is card ownership payload with the user
export type Cord = Prisma.CardOwnershipGetPayload<typeof userWithCards>;
