function validateForm(form){
	
	var QuebraLinha = "\n";
	var errorMsg = "";
	
	//WKCompletTask --> True se estiver enviando a atividade, false se for apenas salvar
	
	var WKCompletTask = getValue("WKCompletTask");
	
	if ( WKCompletTask == "true" ) //Só valido ao enviar o Processo
	{
		var Filial = form.getValue("C1_FILIAL");
		
		if (Filial == ""){
			errorMsg += "* O Campo Tipo Filial deve ser informado." + QuebraLinha;
		}
		
		var indexes = form.getChildrenIndexes("listaProduto");
		
		if(indexes.length == 0 )
		{
			errorMsg += "* Necessário adicionar itens a SC." + QuebraLinha;
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
			
			if(form.getValue( "datanescessidade___"+indexes[i] ) == "" || form.getValue( "datanescessidade___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar a data de necessidade do produto na linha " + (i+1) + QuebraLinha;
			}
			
			if(form.getValue( "centro_custo___"+indexes[i] ) == "" || form.getValue( "centro_custo___"+indexes[i] ) == null)
			{
				errorMsg += "* Necessário informar o centro de custo do produto na linha " + (i+1) + QuebraLinha;
			}
			
		}	
		
	}
	
	if (errorMsg != ""){
		throw QuebraLinha + errorMsg;
	}
	
}