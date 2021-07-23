function init(){
	
	OcultaItensPaiFilho();
	
	
}

function  setSelectedZoomItem(selectedItem){
	
	var campo = selectedItem.inputId; //;Campo de Zoom Selecionado
	
	if (campo == "NomeProduto" ){		
		$("#CodProduto").val( selectedItem["B1_COD"] );		
	}else if(campo == "C1_FILIAL"){
		$("#COD_C1_FILIAL").val(selectedItem["CODIGO"])
		$("#COD_C1_FILENT").val(selectedItem["CODIGO"])
		$("#C1_FILENT").val(selectedItem["NOME"])
		
		var c1 = DatasetFactory.createConstraint("codEmpresa", selectedItem["CODIGO"].substring(0,2), selectedItem["CODIGO"].substring(0,2), ConstraintType.MUST);
		var constraints   = new Array(c1);
		
		var dsAprovador = DatasetFactory.getDataset("dsEmpresaxAprovador", null, constraints, null);
		
		if(dsAprovador.values.length === 0){
			return FLUIGC.toast({
					message: 'Empresa sem aprovador cadastrado!',
					type: 'warning'
				});
		}
		
		$("#aprovador_sc").val(dsAprovador.values[0]["codAprovador"])
		
	}else if(campo == "C1_FILENT"){
		$("#COD_C1_FILENT").val(selectedItem["CODIGO"])
	}else if(campo.indexOf('produto___') >=0 ){
		var linha =  campo.split("___")[1];
		$('#cod_produto___'+linha).val( selectedItem.codigoProduto );
		$('#unidade___'+linha).val( selectedItem.unidadeMedida );		
	}else if(campo.indexOf('natureza___') >=0 ){
		var linha =  campo.split("___")[1];
		$('#cod_natureza___'+linha).val( selectedItem.codigoNatureza );
	}else if(campo.indexOf('centro_custo___') >=0 ){
		var linha =  campo.split("___")[1];
		$('#cod_ccusto___'+linha).val( selectedItem.codigoCentroCusto );
	}
	
	
	
}


function AtualizaBuscaProdutos(){
	
	var a = 'reloadZoomFilterValues()';
	
	
}

function removedZoomItem(removedItem) {
	
	var campo = removedItem.inputId;
	
	if(campo == "C1_FILIAL"){
		$("#COD_C1_FILIAL").val("")
	}
	
}


function ExibeDetalhe(objeto){
	
	if (objeto.classList.contains("flaticon-add-plus")){
		objeto.classList.replace("flaticon-add-plus","flaticon-div")
		$(objeto.parentElement.parentElement).siblings('.Detalhe').show()
	}
	else {
		objeto.classList.replace("flaticon-div","flaticon-add-plus")
		$(objeto.parentElement.parentElement).siblings('.Detalhe').hide();

	}
	
	
}


function incluiNovoItem(objeto){
	
	if($("#COD_C1_FILIAL").val()=="")
	{
		return FLUIGC.toast({
				message: 'Necessário informar a filial!',
				type: 'WARNING'
			});
	}
	
	var item = wdkAddChild('listaProduto');
	
	$("input[name^='item___']").each(
		function() {
		 if ( this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length) != item ){
			 
			 var icone = $(this.parentNode.parentNode.children[0].children[1])
			 	icone.switchClass('flaticon-div', 'flaticon-add-plus') ;
				$(this.parentElement.parentElement).siblings('.Detalhe').hide();
			}
	});
	
	reloadZoomFilterValues ('produto___'+item, 'unidade,'+$('#COD_C1_UNIDREQ').val()+',filial,'+$('#COD_C1_FILIAL').val())
	reloadZoomFilterValues ('centro_custo___'+item, 'unidade,'+$('#COD_C1_UNIDREQ').val()+',filial,'+$('#COD_C1_FILIAL').val())
	
	$("#datanescessidade___"+item).val($("#C1_EMISSAO").val());
	
	FLUIGC.calendar('.CampoData');
	
	var inputs = $("[mask]");
    MaskEvent.initMask(inputs);
	
    $("#datanescessidade___"+item).change(function(){
    	
    	var dtAux = $(this).val().split("/").map(x => parseInt(x)).reverse().join("-");
    	
    	var dtNecessidade = new Date( dtAux );
    	
    	if(dtNecessidade < new Date())
    	{
    		FLUIGC.toast({
				message: 'FOI SELECIONADA UMA DATA ANTERIOR A DATABASE DO SISTEMA.',
				type: 'WARNING'
			});
    	}
    	
    });
    
	GeraItem();
	
}


function OcultaItensPaiFilho(){

	$("input[name^='item___']").each(
			function() {
					 	var icone = $(this.parentNode.parentNode.children[0].children[1])
					 	icone.switchClass('flaticon-div', 'flaticon-add-plus') ;
						$(this.parentElement.parentElement).siblings('.Detalhe').hide();
			});
	
	
}


function GeraItem(){

	var str = "0";
	var lista = $("input[name^='item___']")
	
	for (var i = 0; i < lista.length ; i++) {
		var base = (i+1).toString();	
		var item = str.repeat(4 - base .length ) + base ;
		$(lista[i]).val(item);
	}
	
}


//reloadZoomFilterValues(inputName, filterValues)