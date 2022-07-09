import pg from "pg";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import { DB_NAME, DB_PASS, DB_USER } from "../constants.js";

const pool = new pg.Pool({
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: "localhost",
  port: 5432,
});

export const saveUser = async (firstName, lastName, email, password) => {
  const client = await pool.connect();

  console.log(password, typeof password);
  const hashedPass = await argon2.hash(password);
  console.log(hashedPass);
  const linkId = uuidv4();

  try {
    await client.query("BEGIN");
    const queryText = `INSERT INTO users(id, "firstName", "lastName", email, password, "isVerified") 
      VALUES($1,$2,$3,$4,$5,$6)`;
    const res = await client.query(queryText, [
      linkId,
      firstName,
      lastName,
      email,
      hashedPass,
      false,
    ]);
    // console.log(res);
    await client.query("COMMIT");
    return linkId;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return null;
  } finally {
    client.release();
  }
};

export const verifyUser = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const queryText = `UPDATE users
    SET "isVerified"=$1 WHERE users.id=$2;`;
    const res = await client.query(queryText, [true, userId]);
    console.log(res);
    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return false;
  } finally {
    client.release();
  }
};
