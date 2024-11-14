import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // encontrar usuario
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuario não encontrado!");
      return res.render("auth/login");
    }

    // checar a senha
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha inválida!");
      return res.render("auth/login");
    }

    // iniciar sessao ao logar
    req.session.userid = user.id;

    req.flash("message", "Autenticação realizada com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
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
      const createdUser = await User.create(user);

      // iniciar sessao ao criar
      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}
