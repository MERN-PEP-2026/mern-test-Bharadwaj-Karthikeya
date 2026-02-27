import {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUser,
} from "../services/auth.service.js";

export const registerController = async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserController = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const user = await updateUserProfile({ userId: req.user.userId, updateData: req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const result = await deleteUser(req.user.userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};