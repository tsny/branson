"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Config } from "@prisma/client";
import prisma from "./prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

interface ConfigContextProps {
  configs: Config[] | null;
}

interface ConfigProviderProps {
  children: ReactNode;
}
const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const useConfig = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

export const useConfigByName = (s: string): Config => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  if (!context.configs) {
    console.log("got no config for %s: %s", s, context.configs);
    return { name: "unknown", value: "unknown" };
  }

  const cfg = context.configs.find((c) => c.name === s);
  if (cfg) {
    return cfg;
  }
  throw new Error(s + " config not found");
};

export const ConfigProvider: React.FC<ConfigProviderProps> = async ({
  children,
}) => {
  const [configs, setConfigs] = useState<Config[] | null>(null);

  useEffect(() => {
    const fetchConfigs = async () => {
      console.log("fetching configs...");
      const data = await prisma.config.findMany();
      setConfigs(data);
    };

    fetchConfigs().catch((error) => {
      console.error("Failed to fetch configs:", error);
    });
  }, []);

  //   const configs = await prisma.config.findMany();

  return (
    <ConfigContext.Provider value={{ configs }}>
      {children}
    </ConfigContext.Provider>
  );
};
