module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
        task: {
            type: Sequelize.STRING,
        },
        doneStatus: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });

    return List;
}

