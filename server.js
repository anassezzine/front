const express = require('express');
const app = express();

app.set('view engine', 'ejs')

// Route qui renvoie les données des clients
app.get('/clients', (req, res) => {
  const clients = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  ];

  res.render('clients', { clients });
});

// Autres routes et middleware...

// Lancement du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
