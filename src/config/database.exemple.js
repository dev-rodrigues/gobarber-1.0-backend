module.exports = {
    // O sequelize da suporte aos bancos de dados: MYSQL, MARIADB, SQLITE E SQLSERVER
    // instalar as dependencias pertinentes ao banco escolhido
    // documentacao: https://sequelize.org/v5/manual/dialects.html
    dialect: 'postgress',
    host: 'COLOQUE-AQUI-O-HOST',
    username: 'COLOQUE-AQUI-O-USERNAME',
    password: 'COLOQUE-AQUI-A-SENHA',
    database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};
