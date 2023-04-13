const url = new URL("http://localhost:3000/api/customers/add");

function handleSubmit(event) {
  event.preventDefault();

  // Utilisation de la méthode getJSON de jQuery pour récupérer les données du dernier client
  $.getJSON(url, function (data) {
    const idMax = data.total;

    // Création d'un objet client à partir des valeurs du formulaire
    const client = {
      email: $("#email").val(),
      first: $("#name").val(),
      last: $("#name2").val(),
      company: $("#society").val(),
      created_at: new Date(),
      country: $("#country").val()
    };

    // Envoi du client au serveur
    $.ajax({
      url: url,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(client),
      success: function (response) {
        alert(response.message);
      }
    });
  });
}
