import Tought from "../models/Tought.js";
import User from "../models/User.js";

export default class ToughtController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  }
}
