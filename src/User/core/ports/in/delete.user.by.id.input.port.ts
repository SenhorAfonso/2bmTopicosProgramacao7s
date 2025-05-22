export interface DeleteUserByIdInputPort {
  execute(userId: string): Promise<void>;
}
