
module.exports = (sequelize, DataTypes) => {
    const Url = sequelize.define("Url", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: "urls"
    })

    return Url
}