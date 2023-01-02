const { comparePassword } = require("../middlewares/bcrypt");
const { createToken } = require("../middlewares/jwt");
const { User, UserProfile } = require("../models/index");

const getUsers = async (req, res, next) => {
  try {
    const showAllUser = await User.findAll();

    res.json({ Users: showAllUser });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, fullName, age, dateOfBirth, address, education } =
      req.body;
    const nik = (dateOfBirth + Math.floor(Math.random() * 100))
      .split("-")
      .join("");
    const imageProfile = `https://avatars.dicebear.com/api/adventurer/${fullName}.svg`;

    const createUser = await User.create({
      email,
      password,
    });

    const createUserProfile = await UserProfile.create({
      nik,
      fullName,
      age,
      dateOfBirth,
      address,
      education,
      imageProfile,
      UserId: createUser.id,
    });

    res
      .status(201)
      .json({ message: `User with email ${email} has been created` });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { name: "INVALID_CREDENTIALS" };
    }

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      throw { name: "INVALID_CREDENTIALS" };
    }

    const comparehash = comparePassword(password, foundUser.password);
    if (!comparehash) {
      throw { name: "INVALID_CREDENTIALS" };
    }

    const payload = { id: foundUser.id };
    const access_token = createToken(payload);

    res.json({ access_token, foundUser });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundUser = await User.findByPk(id);
    if (!foundUser) {
      throw { name: "NOT_FOUND" };
    }

    await User.destroy({ where: { id } });

    res.json({ msg: `Delete user with id ${foundUser.id} successfully` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, register, login, deleteUser };
