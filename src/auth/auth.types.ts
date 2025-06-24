export interface JwtPayload {
  userId: number;
  email: string;
  roleId: number;
}

export type UserConflictField = 'email' | 'phone' | 'username';
