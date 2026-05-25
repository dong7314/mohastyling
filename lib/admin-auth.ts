export function getAdminAuthConfig() {
  const adminId = process.env.ADMIN_ID;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminId || !adminPassword) {
    return null;
  }

  return { adminId, adminPassword };
}

export function verifyAdminCredentials(id: string, password: string) {
  const config = getAdminAuthConfig();

  if (!config) {
    return { configured: false, valid: false };
  }

  return {
    configured: true,
    valid: id === config.adminId && password === config.adminPassword,
  };
}

export function verifyBasicAuth(authHeader: string | null) {
  const config = getAdminAuthConfig();

  if (!config) {
    return { configured: false, valid: false };
  }

  const expectedAuth = `Basic ${Buffer.from(
    `${config.adminId}:${config.adminPassword}`
  ).toString("base64")}`;

  return {
    configured: true,
    valid: authHeader === expectedAuth,
  };
}
