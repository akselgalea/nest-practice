import * as bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export async function encryptPassword(pass: string) {
	return bcrypt.hash(pass, SALT_ROUNDS);
}

export async function comparePasswords(pass: string, hash: string) {
	return bcrypt.compare(pass, hash);
}
