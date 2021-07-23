function validateForm(form){
	
	var QuebraLinha = "\n";
	var errorMsg = "";
	
	//WKCompletTask --> True se estiver enviando a atividade, false se for apenas salvar
	
	var WKCompletTask = getValue("WKCompletTask");
	
	if ( WKCompletTask == "true" ) //Só valido ao enviar o Processo
	{
		var Filial = form.getValue("C1_FILIAL");
		var Fornecedor = form.getValue("fornecedor");
		var FilialEntrega = form.getValue("C1_FILENT");
		var CondicaoPagamento = form.getValue("condicao_pagamento");
		var TipoFrete = form.getValue("tipo_frete");
		
		
		if(Filial == "" || Filial == null)
		{
			errorMsg += "* Necessário informar a filial"+ QuebraLinha;
		}
		
		if(Fornecedor == "" || Fornecedor == null)
		{
			errorMsg += "* Necessário informar o fornecedor"+ QuebraLinha;
		}
		
		if(FilialEntrega == "" || FilialEntrega == null)
		{
			errorMsg += "* Necessário informar a filial de entrega"+ QuebraLinha;
		}
		
		if(CondicaoPagamento == "" || CondicaoPagamento == null)
		{
			errorMsg += "* Necessário informar a condição de pagamento"+ QuebraLinha;
		}
		
		if(TipoFrete == "" || TipoFrete == null)
		{
			errorMsg += "* Necessário informar o tipo do frete"+ QuebraLinha;
		}
		
		var indexes = form.getChildrenIndexes("listaProduto");
		
		if(indexes.length == 0 )
		{
			errorMsg += "* Necessário adicionar itens ao Pedido." + QuebraLinha;
		}
		
		for(var i = 0; i < indexes.length; i++)
		{			
			if(form.getValue( "produto___"+indexes[i] ) == "" || form.getValue( "produto___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar o produto na linha " + (i+1) + QuebraLinha;
			}
			
			if(form.getValue( "quantidade___"+indexes[i] ) == "")
			{
				errorMsg += "* Necessário informar a quantidade do produto na linha " + (i+1) + QuebraLinha;
			}
			
			if(form.getValue( "preco___"+indexes[i] ) == "" || form.getValue( "preco___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar o preço do produto na linha " + (i+1) + QuebraLinha;
			}
			
			if(form.getValue( "dataEntrega___"+indexes[i] ) == "" || form.getValue( "dataEntrega___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar a data de entrega do produto na linha " + (i+1) + QuebraLinha;
			}
			
			if(form.getValue( "centro_custo___"+indexes[i] ) == "" || form.getValue( "centro_custo___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar o centro de custo do produto na linha " + (i+1) + QuebraLinha;
			}
			
			if(form.getValue( "tes___"+indexes[i] ) == "" || form.getValue( "tes___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar a TES do produto na linha " + (i+1) + QuebraLinha;
			}
			
		}	
		
	}
	
	if (errorMsg != ""){
		throw QuebraLinha + errorMsg;
	}
	
}