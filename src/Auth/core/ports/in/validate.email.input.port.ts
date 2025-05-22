export interface ValidateEmailInputPort {
  execute(email: string): Promise<void>;
}
