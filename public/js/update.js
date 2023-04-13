const url = new URL("http://localhost:3000//api/customers/:id");

$(document).ready(function () {
    const id = $("#id");
    id.on("input", handleChange);
});

function handleChange() {
    $.get(url, function (data) {
        const item = data.clients[parseInt($("#id").val()) - 1];
        console.log(item);

        $("#email").val(item.email);
        $("#name2").val(item.first);
        $("#name").val(item.last);
        $("#society").val(item.company);
        $("#country").val(item.country);

        const date = new Date(item.created_at);
        const newDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        $("#date").val(newDate);
    });
}

function getTotalClients() {
    let nbclients;
    $.ajax({
        url: url,
        async: false,
        success: function(data) {
            nbclients = data.total;
        }
    });
    return nbclients;
}

function handleSubmit() {
    const id = parseInt($("#id").val());
    const totalClients = getTotalClients();

    if (id > 0 && id <= totalClients) {
        const client = {
            id: id,
            email: $("#email").val(),
            first: $("#name").val(),
            last: $("#name2").val(),
            company: $("#society").val(),
            created_at: $("#date").val(),
            country: $("#country").val()
        };

        $.ajax({
            url: url,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(client),
            success: function (data) {
                console.log(data);
            }
        });
    } else {
        alert("ID incorrect");
    }
}
