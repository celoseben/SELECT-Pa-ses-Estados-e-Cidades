function loadJSONP(url, callback) {
    // Create script with url and callback (if specified)
    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = url + (url.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback;

    // Insert script tag into the DOM (append to <head>)
    ref.parentNode.insertBefore(script, ref);

    // After the script is loaded (and executed), remove it
    script.onload = function () {
        this.remove();
    };
};

var selectEstado = document.querySelector("select[name*='mauticform[estado]");
var selectCidade = document.querySelector("select[name*='mauticform[cidade']");

loadJSONP('http://api.londrinaweb.com.br/PUC/Estados/BR/0/10000', 'generateState');
function generateState(data) {
    selectEstado.setAttribute('onchange', 'getCitys()');
    for (var index = 0; index < data.length; index++) {
        var createSelect = document.createElement("option");
        createSelect.value = data[index].UF;
        createSelect.text = data[index].Estado;
        selectEstado.append(createSelect);
    }
}

function getCitys() {
    loadJSONP('http://api.londrinaweb.com.br/PUC/Cidades/' + selectEstado.options[selectEstado.selectedIndex].value + '/BR/0/10000', 'generateCity');
}

function generateCity(data) {
    for (var index = 0; index < data.length; index++) {
        var createSelect = document.createElement("option");
        createSelect.value = data[index];
        createSelect.text = data[index];
        selectCidade.append(createSelect);
    }
}
