export interface AuthPersistenceOutputPort {
  setToken(email: string, token: string): Promise<void>;
  getToken(email: string, token: string): Promise<boolean>;
}
