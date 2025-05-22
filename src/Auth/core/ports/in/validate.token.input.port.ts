export interface ValidateTokenInputPort {
  execute(email: string, token: string): Promise<boolean>;
}
