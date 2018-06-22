
var xmlHttp;

function GetXmlHttpObject(){
	var xmlHttp=null;
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
			}
				catch (e)
				{
					xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
		}
	return xmlHttp;
}


function include(url){
	xmlHttp=GetXmlHttpObject();
	if (xmlHttp==null){return;}
	xmlHttp.open("GET",url,true); 
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function()
	{
		if (xmlHttp.readyState==4)
		{
			if (xmlHttp.status==200)
			{
				eval(xmlHttp.responseText);
				montaPais();
			}
		}
	};
}


//include('jquery-3.3.1.min.js');
//include('http://rawgit.com/celoseben/SELECT-Pa-ses-Estados-e-Cidades/master/jquery-3.3.1.min.js');

/*setTimeout(function(){
	$("form").on( "submit", function( event ) {
	  event.preventDefault();
	  console.log($( this ).serializeArray());
	});
},1000)*/

var campoPais = "";
var campoEstado = "select[name*='mauticform[estado']";
var campoCidade = "select[name*='mauticform[cidade]";
var estados_array = [];

function montaCidade(estado, pais){
	if (estado){
		var valorUnicoEstado = estados_array.filter( function( elem ) {
		    if (elem.Estado == estado){
		    	estado = elem.UF;
		    	//return elem.UF;
		    	return true;
		    }
		});
		$.ajax({
			type:'GET',
			url:'http://api.londrinaweb.com.br/PUC/Cidades/'+estado+'/'+pais+'/0/10000',
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			async:false
		}).done(function(response){
			//cidades='';
			cidades='<option value="">Selecione</option>';

			$.each(response, function(c, cidade){

				cidades+='<option value="'+cidade+'">'+cidade+'</option>';

			});

			// PREENCHE AS CIDADES DE ACORDO COM O ESTADO
			$(campoCidade).html(cidades);

		});
	}
}

function montaUF(pais){
	if (pais){
		$.ajax({
			type:'GET',
			url:'http://api.londrinaweb.com.br/PUC/Estados/'+pais+'/0/10000',
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			async:false
		}).done(function(response){
			estados_array = response;
			//estados='';
			estados='<option value="">Selecione</option>';
			$.each(response, function(e, estado){

				//estados+='<option value="'+estado.UF+'">'+estado.Estado+'</option>';
				estados+='<option value="'+estado.Estado+'">'+estado.Estado+'</option>';

			});
			// PREENCHE OS ESTADOS BRASILEIROS
			$(campoEstado).html(estados);

			// CHAMA A FUNÇÃO QUE PREENCHE AS CIDADES DE ACORDO COM O ESTADO
			montaCidade($(campoEstado).val(), pais);

			// VERIFICA A MUDANÇA NO VALOR DO CAMPO ESTADO E ATUALIZA AS CIDADES
			$(campoEstado).change(function(){
				montaCidade($(this).val(), pais);
			});

		});
	}
}

function montaPais(){
	montaUF('BR');
	return null;
	$.ajax({
		type:	'GET',
		url:	'http://api.londrinaweb.com.br/PUC/Paisesv2/0/1000',
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		async:false
	}).done(function(response){
		
		paises='';

		$.each(response, function(p, pais){

			if(pais.Pais == 'Brasil'){
				paises+='<option value="'+pais.Sigla+'" selected>'+pais.Pais+'</option>';
			} else {
				paises+='<option value="'+pais.Sigla+'">'+pais.Pais+'</option>';
			}

		});

		// PREENCHE O SELECT DE PAÍSES
		$('#pais').html(paises);

		// PREENCHE O SELECT DE ACORDO COM O VALOR DO PAÍS
		montaUF($('#pais').val());

		// VERIFICA A MUDANÇA DO VALOR DO SELECT DE PAÍS
		$('#pais').change(function(){
			if($('#pais').val() == 'BR'){
				// SE O VALOR FOR BR E CONFIRMA OS SELECTS
				$(campoEstado).remove();
				$(campoCidade).remove();
				$('#campo_estado').append('<select id="estado"></select>');
				$('#campo_cidade').append('<select id="cidade"></select>');

				// CHAMA A FUNÇÃO QUE MONTA OS ESTADOS
				montaUF('BR');		
			} else {
				// SE NÃO FOR, TROCA OS SELECTS POR INPUTS DE TEXTO
				$(campoEstado).remove();
				$(campoCidade).remove();
				$('#campo_estado').append('<input type="text" id="estado">');
				$('#campo_cidade').append('<input type="text" id="cidade">');
			}
		})

	});
}
