import bcrypt from "bcrypt";

import db from '../../utils/db';

import { User } from "@prisma/client";

export function findUserByEmail(email: any) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUserByEmailAndPassword(user: User) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

export function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}