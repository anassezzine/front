const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Serveur web en cours d\'exécution sur le port 3000');
});
