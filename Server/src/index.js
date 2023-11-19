const server =  require ("./app")
const { conn } = require('./DB_connection');
const PORT = 3001;

server.listen(PORT, "localhost");

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
  });
});
