import { addUser, getUser } from "../models/User.js";
import { ApiError } from "../helper/ApiError.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const createUser = async (req, res, next) => {
  const { user } = req.body;
  if (!user || !user.email || !user.password) {
    const error = new ApiError("Email and password are required", 400);
    return next(error);
  }

  hash(user.password, 10, async (err, hashedPassword) => {
    if (err) return next(new ApiError(err, 500));

    try {
      const addedUser = await addUser(user.email, hashedPassword);
      if (!addedUser) {
        return next(new ApiError(err, 500));
      }

      return res
        .status(201)
        .json({ id: addedUser.rows[0].id, email: addedUser.rows[0].email });
    } catch (err) {
      return next(new ApiError(err, 500));
    }
  });
};

const signIn = async (req, res, next) => {
  const { user } = req.body;
  if (!req.body.user || !req.body.user.email || !req.body.user.password) {
    return next(new ApiError("Email and password is required", 400));
  }

  try {
    const result = await getUser(user.email, user.password);

    if (result.rows.length === 0) {
      throw new ApiError("User not found", 404);
    }
    const dbUser = result.rows[0];
    compare(user.password, dbUser.password, (err, isMatch) => {
      if (err) return next(new ApiError(err.message, 500));
      if (!isMatch) {
        const error = new ApiError("Invalid password", 401);
        return next(error);
      }

      const token = sign({ user: dbUser.email }, process.env.JWT_SECRET);
      res.status(200).json({ id: dbUser.id, email: dbUser.email, token });
    });
  } catch (err) {
    throw new ApiError("Error retrieving user", 500);
  }
};

export { createUser, signIn };
