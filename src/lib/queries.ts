import "server-only";
import { prisma } from "./db";

export const openSignals = () =>
  prisma.signal.findMany({ where: { state: "OPEN" }, include: { instrument: true, setup: true }, orderBy: [{ edge: "desc" }] });

export const settledSignals = (days = 90) =>
  prisma.signal.findMany({
    where: { state: { in: ["WON", "LOST", "TIMEOUT"] }, barTime: { gte: new Date(Date.now() - days * 86_400_000) } },
    include: { instrument: true, setup: true }, orderBy: { barTime: "desc" },
  });

export const riskProfile = async () =>
  (await prisma.riskProfile.findUnique({ where: { id: "default" } })) ??
  (await prisma.riskProfile.create({ data: { id: "default" } }));
