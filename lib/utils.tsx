import { User } from "@prisma/client";

export interface StatusProps {
  ok: boolean;
  s1: string;
  s2: string;
}

export function Status({ ok, s1, s2 }: StatusProps) {
  if (ok) {
    return <span className="text-green-800 animate-pulse">{s1}</span>;
  }
  return <span className="text-red-800 animate-pulse">{s2}</span>;
}

export function HasAtleastOneRole(u: User | null, roles: string[]): boolean {
  if (!u === undefined || u === null || u?.role === null) {
    return false;
  }
  return roles.includes(u.role);
}
