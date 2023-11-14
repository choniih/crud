$(document).ready(function () {
    // Variables para los elementos del DOM
    var inputGet1Id = $("#inputGet1Id");
    var inputPostNombre = $("#inputPostNombre");
    var inputPostApellido = $("#inputPostApellido");
    var inputPutId = $("#inputPutId");
    var inputDelete = $("#inputDelete");
    var btnGet1 = $("#btnGet1");
    var btnPost = $("#btnPost");
    var btnPut = $("#btnPut");
    var btnDelete = $("#btnDelete");
    var resultsList = $("#results");
    var alertError = $("#alert-error");
    var dataModal = $("#dataModal");
    var inputPutNombre = $("#inputPutNombre");
    var inputPutApellido = $("#inputPutApellido");
    var btnSendChanges = $("#btnSendChanges");
var url = "https://6553b3675449cfda0f2f1162.mockapi.io/users";


    // Función para desactivar o activar botones según la presencia de datos en los campos
    function toggleButtons() {
        btnPost.prop("disabled", inputPostNombre.val() === "" || inputPostApellido.val() === "");
        btnPut.prop("disabled", inputPutId.val() === "");
        btnDelete.prop("disabled", inputDelete.val() === "");
    }

    // Función para limpiar los campos de entrada
    function clearInputFields() {
        inputGet1Id.val("");
        inputPostNombre.val("");
        inputPostApellido.val("");
        inputPutId.val("");
        inputDelete.val("");
        inputPutNombre.val("");
        inputPutApellido.val("");
    }

    // Función para mostrar alerta de error
    function showErrorAlert(message) {
        alertError.text(message);
        alertError.addClass("show");
        setTimeout(function () {
            alertError.removeClass("show");
        }, 3000);
    }

    // Función para realizar una solicitud GET
    function getRequest(url, successCallback) {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                successCallback(data);
            },
            error: function () {
                showErrorAlert("Error al realizar la solicitud GET.");
            }
        });
    }

    // Función para realizar una solicitud POST
    function postRequest(url, data, successCallback) {
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (responseData) {
                successCallback(responseData);
            },
            error: function () {
                showErrorAlert("Error al realizar la solicitud POST.");
            }
        });
    }

    // Función para realizar una solicitud PUT
    function putRequest(url, data, successCallback) {
        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (responseData) {
                successCallback(responseData);
            },
            error: function () {
                showErrorAlert("Error al realizar la solicitud PUT.");
            }
        });
    }

    // Función para realizar una solicitud DELETE
    function deleteRequest(url, successCallback) {
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (responseData) {
                successCallback(responseData);
            },
            error: function () {
                showErrorAlert("Error al realizar la solicitud DELETE.");
            }
        });
    }

    // Función para manejar la respuesta de las solicitudes y actualizar la lista de resultados
    function handleResponse(response) {
        resultsList.empty();

        if (Array.isArray(response)) {
            response.forEach(function (item) {
                resultsList.append("<li class='list-group-item'>ID: " + item.id + ", Nombre: " + item.name + ", Apellido: " + item.lastname + "</li>");
            });
        } else {
            resultsList.append("<li class='list-group-item'>ID: " + response.id + ", Nombre: " + response.name + ", Apellido: " + response.lastname + "</li>");
        }
    }

    // Botón Buscar
    btnGet1.click(function () {
        var id = inputGet1Id.val();
        var url = "https://6553b3675449cfda0f2f1162.mockapi.io/users";

        if (id !== "") {
            url += "/" + id;
        }

        getRequest(url, handleResponse);
        clearInputFields();
    });

    // Botón Agregar
    btnPost.click(function () {
        var data = {
            name: inputPostNombre.val(),
            lastname: inputPostApellido.val()
        };

        postRequest("https://6553b3675449cfda0f2f1162.mockapi.io/users", data, function (responseData) {
            handleResponse(responseData);
            clearInputFields();
        });
    });

    // Botón Modificar
    btnPut.click(function () {
        var id = inputPutId.val();
    
        getRequest("https://6553b3675449cfda0f2f1162.mockapi.io/users/" + id, function (responseData) {
            inputPutNombre.val(responseData.name);
            inputPutApellido.val(responseData.lastname);
            btnSendChanges.prop("disabled", false);
            dataModal.modal("show");
        });
    });

    // Botón Guardar cambios en el modal
    btnSendChanges.click(function () {
        var id = inputPutId.val();
        var data = {
            name: inputPutNombre.val(),
            lastname: inputPutApellido.val()
        };

        putRequest("https://6553b3675449cfda0f2f1162.mockapi.io/users/" + id, data, function (responseData) {
            handleResponse(responseData);
            dataModal.modal("hide");
            clearInputFields();
        });
    });

    // Botón Eliminar
    btnDelete.click(function () {
        var id = inputDelete.val();

        deleteRequest("https://6553b3675449cfda0f2f1162.mockapi.io/users/" + id, function (responseData) {
            handleResponse(responseData);
            clearInputFields();
        });
    });

    // Eventos para desactivar o activar botones según la entrada del usuario
    inputGet1Id.keyup(toggleButtons);
    inputPostNombre.keyup(toggleButtons);
    inputPostApellido.keyup(toggleButtons);
    inputPutId.keyup(toggleButtons);
    inputDelete.keyup(toggleButtons);
});
