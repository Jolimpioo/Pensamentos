import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import User from "./User.js";

const Tought = sequelize.define("Thought", {
  tittle: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

export default Tought;
