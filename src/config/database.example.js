require('dotenv').config();
// O sequelize da suporte aos bancos de dados: MYSQL, MARIADB, SQLITE E SQLSERVER
// instalar as dependencias pertinentes ao banco escolhido
// documentacao: https://sequelize.org/v5/manual/dialects.html
module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};
