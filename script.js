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

//loadJSONP('http://api.londrinaweb.com.br/PUC/Estados/BR/0/10000', 'generateState');
function generateState(data) {
    /*console.log("selectEstado");
    console.log(selectEstado[0]);*/
    selectEstado[0].innerHTML = '';
    
    var createSelect = document.createElement("option");
    createSelect.value = '';
    createSelect.text = 'Selecione seu estado';
    selectEstado[0].append(createSelect);
    
    selectEstado[0].setAttribute('onchange', 'getCitys()');
    for (var index = 0; index < data.length; index++) {
        var createSelect = document.createElement("option");
        createSelect.value = data[index].UF;
        createSelect.text = data[index].Estado;
        selectEstado[0].append(createSelect);
    }
}

function getCitys() {
    loadJSONP('https://api.funil.pro/api/v1/plugins/cidades/' + selectEstado[0].options[selectEstado[0].selectedIndex].value, 'generateCity');
}

function generateCity(data) {
    selectCidade[0].innerHTML = ''
    
    var createSelect = document.createElement("option");
    createSelect.value = '';
    createSelect.text = 'Selecione sua cidade';
    selectCidade[0].append(createSelect);

    for (var index = 0; index < data.length; index++) {
        var createSelect = document.createElement("option");
        createSelect.value = data[index];
        createSelect.text = data[index];
        selectCidade[0].append(createSelect);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM completamente carregado e analisado");
  loadJSONP('https://api.funil.pro/api/v1/plugins/estados', 'generateState');
    
    setTimeout(function() {
        document.querySelector("form").addEventListener("submit", function(e) {
            console.log("****** submit form ********");
            $('html, body').animate({ // FOCAR NA MENSAGEM DE SUCESSO
                scrollTop: $(".mauticform-message").offset().top
            });
        });
    }, 1000);
});
