import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user.roles';

export const ROLES_KEY = 'roles';
export const Roles = (...role: UserRole[]) => SetMetadata(ROLES_KEY, role);
