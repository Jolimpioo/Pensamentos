import Tought from "../models/Tought.js";
import User from "../models/User.js";

export default class ToughtController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    // checar se usuario existe
    if (!user) {
      res.redirect("/login");
    }

    const toughts = user.Thoughts.map((result) => result.dataValues);
    res.render("toughts/dashboard", { toughts });
  }

  static createTought(req, res) {
    res.render("toughts/create");
  }

  static async createToughtSave(req, res) {
    try {
      const tought = {
        title: req.body.title,
        UserId: req.session.userid,
      };

      // Criar o pensamento no banco de dados
      await Tought.create(tought);

      req.flash("message", "Pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log("Aconteceu um erro: " + error);
    }
  }
}
