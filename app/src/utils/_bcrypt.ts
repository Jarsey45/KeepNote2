'use server';

import { compare, hash } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
	return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	return compare(password, hashedPassword);
}