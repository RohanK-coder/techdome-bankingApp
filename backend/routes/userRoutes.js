import express from 'express';
import { user } from '../models/UserSchema.js';  // Correctly import user model
const router = express.Router();

// POST /users
router.post("/users", async (req, res) => {
  const { id, password } = req.body;

  // Validate the incoming request body
  if (!id || !password) {
    return res.status(400).send({
      message: "Please provide both 'id' and 'password'."
    });
  }

  // Check if the user already exists
  const existingUser = await user.findOne({ id: id });
  if (existingUser) {
    return res.status(400).send({
      message: "User with this ID already exists."
    });
  }

  // Create a new user document
  try {
    const newUser = new user({
      id: id,
      password: password,  // Store the password as plain text
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send the response
    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: savedUser.id,
        password: savedUser.password,  // Avoid sending password in real apps
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error. Could not create user."
    });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await user.find();  // Fetch all users from the database

    if (users.length === 0) {
      return res.status(404).send({
        message: "No users found."
      });
    }

    res.status(200).json({
      message: "Users retrieved successfully.",
      users: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error. Could not retrieve users."
    });
  }
});

// Get a user by id
router.get("/users/:id", async (req, res) => {
  try {
    const userById = await user.findOne({ id: req.params.id });  // Correctly query by 'id'

    if (!userById) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    res.status(200).json({
      message: "User retrieved successfully.",
      user: userById,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error. Could not retrieve user."
    });
  }
});

// Delete a user by id
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;  // Get the ID from the route parameter

  try {
    const deletedUser = await user.findOneAndDelete({ id: id });

    if (!deletedUser) {
      return res.status(404).send({
        message: `User with ID ${id} not found.`
      });
    }

    res.status(200).json({
      message: `User with ID ${id} has been deleted.`,
      user: deletedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error. Could not delete user."
    });
  }
});

export default router;
