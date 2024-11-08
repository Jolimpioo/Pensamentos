import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // validacao de igualdade de senha
    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");

      return;
    }

    // checar se o usuario já existe
    const checkIfUserExits = await User.findOne({ where: { email: email } });

    if (checkIfUserExits) {
      req.flash("message", "O e-mail já está em uso!");
      res.render("auth/register");

      return;
    }

    // criar uma senha
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      await User.create(user);

      req.flash("message", "Cadastro realizado com sucesso!");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
}
