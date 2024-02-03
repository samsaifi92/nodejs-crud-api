module.exports = (sequelize, Sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN
        }

    });

    return Posts;
}