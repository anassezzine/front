var url = new URL("http://localhost:3000/api/customers/:customerId");

function getTotalClients() {
    //on récupère le nombre de clients
    let nbclients;
    $.ajax({
        url: url,
        async: false,
        success: function (data) {
            nbclients = data.total;
        },
    });
    return nbclients;
}

function handleSubmit() {
    let id = parseInt($("#id").val());

    //on remplace l'ID dans l'URL
    var newUrl = url.replace(":customerId", id);

    //on envoie la requête de suppression
    $.ajax({
        url: newUrl,
        method: "DELETE",
        success: function (response) {
            if (response.success) {
                // Utilisateur supprimé avec succès
                alert("success");
            } else {
                // Erreur lors de la suppression de l'utilisateur
                alert("error");
            }
        },
    });
}
