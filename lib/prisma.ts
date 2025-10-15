/** Minimaler Prisma-Stub nur für CI – echte DB wird hier nicht benötigt. */
const prisma: any = new Proxy({}, { get: () => async () => null });
export default prisma;