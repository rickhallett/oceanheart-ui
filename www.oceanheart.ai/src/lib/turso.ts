import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL || "";
const authToken = process.env.TURSO_AUTH_TOKEN || "";

export const turso = url && authToken
  ? createClient({ url, authToken })
  : null;

export const isTursoConfigured = () => {
  return url !== "" && authToken !== "";
};

export const withTurso = async <T>(
  operation: (client: ReturnType<typeof createClient>) => Promise<T>
): Promise<T | null> => {
  if (!turso) {
    console.warn("Turso database not configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables.");
    return null;
  }
  return operation(turso);
};
