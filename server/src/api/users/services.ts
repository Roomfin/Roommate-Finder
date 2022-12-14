import bcrypt from "bcrypt";

import db from '../../utils/db';

export function findUserByEmail(email: any) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUserByEmailAndPassword(addy:string, password:string) {
  const hashed = bcrypt.hashSync(password, 12);
  return db.user.create({
    data: {
      email: addy,
      password: hashed,
    },
  });
}

export function UpdatePassword(password:string, id:string) {
  const hashed = bcrypt.hashSync(password, 12);
  return db.user.update({
    where: {
      id,
    },
    data: {
      password: hashed
    },
  });
}

export function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}