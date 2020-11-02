const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
// ==> Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: "postgres://hswtiohntbbjra:7616145754cfa9cd2a7284130171b5f052d046c1429b3da9317179408f2c10ef@ec2-54-196-89-124.compute-1.amazonaws.com:5432/d4cgd659p4ie12",
  ssl: true
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};