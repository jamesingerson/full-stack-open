const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

const { Op } = require("sequelize");

const { Note } = require("../models");

class User extends Model {
  async number_of_notes() {
    return (await this.getNotes()).length;
  }

  static async with_notes(limit) {
    return await User.findAll({
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("notes.id")), "note_count"],
        ],
      },
      include: [{ model: Note, attributes: [] }],
      group: ["user.id"],
      having: sequelize.literal(`COUNT(notes.id) > ${limit}`),
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user",
    defaultScope: { where: { disabled: false } },
    scopes: {
      admin: {
        where: {
          admin: true,
        },
      },
      disabled: {
        where: {
          disabled: true,
        },
      },
      name(value) {
        return {
          where: {
            name: {
              [Op.iLike]: value,
            },
          },
        };
      },
    },
  }
);

module.exports = User;

// all admins
// const adminUsers = await User.scope('admin').findAll()

// all inactive users
// const disabledUsers = await User.scope('disabled').findAll()

// users with the string jami in their name
// const jamiUsers = User.scope({ method: ['name', '%jami%'] }).findAll()

// admins with the string jami in their name
// const jamiUsers = User.scope('admin', { method: ['name', '%jami%'] }).findAll()

// const jami = await User.findOne({ name: "Jami Kousa" });
// const cnt = await jami.number_of_notes();
// console.log(`Jami has created ${cnt} notes`);

// const users = await User.with_notes(2);
// console.log(JSON.stringify(users, null, 2));
// users.forEach((u) => {
//   console.log(u.name);
// });

// npx sequelize-cli model:generate --name User --attributes name:string,username:string,admin:boolean
