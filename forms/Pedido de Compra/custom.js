function init(){
	
	OcultaItensPaiFilho();
	
	$("#tipo_frete").change(function(){
		
		$("#valorFrete").val("")
		
		if($(this).val() == "F")
		{
			$("#valorFrete").removeAttr("readonly")
		}else{
			$("#valorFrete").attr("readonly", "readonly")
		}
		
	})
	
	
}

function  setSelectedZoomItem(selectedItem){
	
	var campo = selectedItem.inputId; //;Campo de Zoom Selecionado
	
	var campo = selectedItem.inputId; //;Campo de Zoom Selecionado
	
	if (campo == "NomeProduto" ){		
		$("#CodProduto").val( selectedItem["B1_COD"] );		
	}else if(campo == "C1_FILIAL"){
		$("#COD_C1_FILIAL").val(selectedItem["CODIGO"])
		$("#COD_C1_FILENT").val(selectedItem["CODIGO"])
		$("#C1_FILENT").val(selectedItem["NOME"])
	}else if(campo == "C1_FILENT"){
		$("#COD_C1_FILENT").val(selectedItem["CODIGO"])
	}else if(campo == "fornecedor"){
		$("#COD_FORNECEDOR").val(selectedItem["codigo"])
		$("#LOJA_FORNECEDOR").val(selectedItem["loja"])
	}else if(campo == "condicao_pagamento"){
		$("#cod_condicao_pagamento").val(selectedItem["codigo"])
		$("#adiantamento").val(selectedItem["adiantamento"])
	}else if(campo.indexOf('produto___') >=0 ){
		var linha =  campo.split("___")[1];
		$('#cod_produto___'+linha).val( selectedItem.codigoProduto );
		$('#unidade___'+linha).val( selectedItem.unidadeMedida );
		$('#armazem___'+linha).val( selectedItem.armazem );
	}else if(campo.indexOf('tes___') >=0 ){
		var linha =  campo.split("___")[1];
		$('#cod_tes___'+linha).val( selectedItem.codigo );
	}
	
	
}


function AtualizaBuscaProdutos(){
	
	var a = 'reloadZoomFilterValues()';
	
	
}

function removedZoomItem(removedItem) {
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


function incluiNovoItem(){
	
	if($("#COD_C1_FILIAL").val()=="")
	{
		return FLUIGC.toast({
				message: 'Necessário informar a filial!',
				type: 'WARNING'
			});
	}
	
	var item = wdkAddChild('listaProduto');
	
	$("input[name^='cod_produto___']").each(function() {
		if ( this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length) != item ){
			var icone = $(this.parentNode.parentNode.children[0].children[1])
		 	icone.switchClass('flaticon-div', 'flaticon-add-plus') ;
			$(this.parentElement.parentElement).siblings('.Detalhe').hide();
		}
	});
	
	reloadZoomFilterValues ('produto___'+item, 'unidade,'+$('#COD_C1_UNIDREQ').val()+',filial,'+$('#COD_C1_FILIAL').val())
	
	$("#dataEntrega___"+item).val($("#C1_EMISSAO").val());
	
	FLUIGC.calendar('.CampoData');
	
	var inputs = $("[mask]");
    MaskEvent.initMask(inputs);
	
	GeraItem();
	
	return item;
	
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

function calculaTotal( pObjeto )
{
	var indice  = pObjeto.name.split("___")[1];
	
	var quantidade 	= $("#quantidade___"+indice).val() == "" ? 0 : parseFloat( $("#quantidade___"+indice).val() );
	var preço	 	= getFloatValue( $("#preco___"+indice).val() );
	
	var valorTotal = quantidade * preço;
	
	$("#total___"+indice).val( m_moeda( valorTotal.toFixed(2) ) );
	
	calculaTotalPedido( );
}

function calculaTotalPedido( )
{
	var valorTotal = 0;
	
	$("input[name^='total___']").each(function() {
		valorTotal += getFloatValue($(this).val())
	});
	
	valorTotal += getFloatValue($("#valorFrete").val())
	valorTotal += getFloatValue($("#despesas").val())
	valorTotal += getFloatValue($("#seguro").val())
	
	$("#total_pedido").val( m_moeda( valorTotal.toFixed(2) ) );
	
}

function getFloatValue(string) {
	if(string == "") return 0;
	
	string = replaceAll(string, ".", "");
	string = replaceAll(string, ",", ".");
	return parseFloat(string)
}

function m_moeda(v){
	v = v.toString();
	v = v.replace(/\D/g,"");  				//permite digitar apenas números
	v = v.replace(/[0-9]{12}/,"inválido");    //limita pra máximo 999.999.999,99
	v = v.replace(/(\d{1})(\d{8})$/,"$1.$2"); //coloca ponto antes dos Ãºltimos 8 digitos
	v = v.replace(/(\d{1})(\d{5})$/,"$1.$2"); //coloca ponto antes dos Ãºltimos 5 digitos
	v = v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");	//coloca virgula antes dos Ãºltimos 2 digitos
	return v;
}

function replaceAll(value, old_value, new_value)
{
	while(value.indexOf(old_value) >= 0)
	{
		value = value.replace(old_value, new_value);
	}
	
	return value;
}

function consultaPedido(){
	
	if($("#COD_C1_FILIAL").val()=="")
	{
		return FLUIGC.toast({
				message: 'Necessário informar a filial!',
				type: 'WARNING'
			});
	}
	
	var numPedido = $("#C1_NUM").val();
	
	if(numPedido == ""){
		return FLUIGC.toast({
			message: 'Necessário informar o número do pedido!',
			type: 'WARNING'
		});
	}
	
	var c1 = DatasetFactory.createConstraint("unidade", $("#COD_C1_UNIDREQ").val(), $("#COD_C1_UNIDREQ").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("filial", $("#COD_C1_FILIAL").val(), $("#COD_C1_FILIAL").val(), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("nroPedido", numPedido, numPedido, ConstraintType.MUST);
	var constraints   = new Array(c1, c2, c3);
	
	var pedido_compra = DatasetFactory.getDataset("pedido_compra", null, constraints, null);
	
	console.log(pedido_compra)
	
	if(pedido_compra.values.length == 0)
	{
		return FLUIGC.toast({
			message: 'Pedido de compras não encontrada no servidor!',
			type: 'WARNING'
		});
	}
	
	window["fornecedor"].setValue( pedido_compra.values[0]["nome"] );
	$("#C1_EMISSAO").val(pedido_compra.values[0]["emissaoPC"]);
	$("#COD_FORNECEDOR").val(pedido_compra.values[0]["fornecedor"]);
	$("#LOJA_FORNECEDOR").val(pedido_compra.values[0]["loja"]);
	$("#cod_condicao_pagamento").val(pedido_compra.values[0]["condicaoPagamento"]);
	window["condicao_pagamento"].setValue(pedido_compra.values[0]["descCondicaoPagamento"]);
	$("#tipo_frete").val(pedido_compra.values[0]["tipoFrete"]);
	$("#valorFrete").val( m_moeda( parseFloat( pedido_compra.values[0]["frete"] ).toFixed(2) ));
	$("#despesas").val(m_moeda( parseFloat( pedido_compra.values[0]["despesa"] ).toFixed(2) ));
	$("#seguro").val(m_moeda( parseFloat( pedido_compra.values[0]["seguro"] ).toFixed(2) ));
	
	for(var i = 0; i < pedido_compra.values.length; i++){
		var item = incluiNovoItem();
		
		$("#cod_produto___" + item).val( pedido_compra.values[i]["produto"] );
		window["produto___" + item].setValue( pedido_compra.values[i]["descricao"] )
		$("#quantidade___" + item).val(m_moeda( parseFloat(  pedido_compra.values[i]["quantidade"] ).toFixed(2) ) );
		$("#preco___" + item).val(m_moeda( parseFloat(  pedido_compra.values[i]["preco"] ).toFixed(2) ) );
		$("#total___" + item).val(m_moeda( parseFloat(  pedido_compra.values[i]["total"] ).toFixed(2) ) );
		$("#unidade___" + item).val( pedido_compra.values[i]["unidadeMedida"] );
		$("#armazem___" + item).val( pedido_compra.values[i]["armazem"] );
		$("#dataEntrega___" + item).val( pedido_compra.values[i]["dataEntrega"] );
		$("#cod_tes___" + item).val( pedido_compra.values[i]["tes"] );		
		$("#observacao___" + item).val( pedido_compra.values[i]["observacao"] );
		if(pedido_compra.values[0]["tes"] != "")
			window["tes___1"].setValue( pedido_compra.values[i]["tes"] )
		
	}
	
	calculaTotalPedido( );
	
}

//reloadZoomFilterValues(inputName, filterValues)