declare global {
  namespace Express {
    interface Session {
      "keycloak-token": string;
    }
  }
}
