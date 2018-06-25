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

//var selectEstado = document.querySelector("select[name*='mauticform[estado]'");
//var selectCidade = document.querySelector("select[name*='mauticform[cidade]'");
var selectEstado = document.getElementsByName("mauticform[estado]");
var selectCidade = document.getElementsByName("mauticform[cidade]");

loadJSONP('http://api.londrinaweb.com.br/PUC/Estados/BR/0/10000', 'generateState');
function generateState(data) {
    /*console.log("selectEstado");
    console.log(selectEstado[0]);*/
    selectEstado[0].setAttribute('onchange', 'getCitys()');
    for (var index = 0; index < data.length; index++) {
        var createSelect = document.createElement("option");
        createSelect.value = data[index].UF;
        createSelect.text = data[index].Estado;
        selectEstado[0].append(createSelect);
    }
}

function getCitys() {
    loadJSONP('http://api.londrinaweb.com.br/PUC/Cidades/' + selectEstado[0].options[selectEstado[0].selectedIndex].value + '/BR/0/10000', 'generateCity');
}

function generateCity(data) {
    selectCidade[0].innerHTML = ''
    
    var createSelect = document.createElement("option");
    createSelect.value = '';
    createSelect.text = 'Selecione';
    selectCidade[0].append(createSelect);

    for (var index = 0; index < data.length; index++) {
        var createSelect = document.createElement("option");
        createSelect.value = data[index];
        createSelect.text = data[index];
        selectCidade[0].append(createSelect);
    }
}
