function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("cotacao");
	dsResult.addColumn("produto");
	dsResult.addColumn("quantidade");
	dsResult.addColumn("preco");
	dsResult.addColumn("total");
	dsResult.addColumn("dataEmissao");
	dsResult.addColumn("fornecedor");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade 	 	= constraints[0].initialValue;
		var filial 		 	= constraints[1].initialValue;
		var numPedido		= "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "numPedido")
			{
				numPedido = "cNumPedido="+c.initialValue;
			}
		}
		
		var endpoint = '/consultarCotacao?';
		
		if(numPedido != "")
		{
			endpoint += numPedido + "&";
		}
		
		var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'REST-PROTHEUS',
            endpoint : endpoint,
            method : 'get',
            timeoutService: '100', // segundos,
            headers: {
            	tenantID: unidade+","+filial
            }
        }
		
		var dados = clientService.invoke(JSON.stringify(data));
		 
        var result = JSON.parse( dados.getResult() );
        
        for(var info in result.Retorno_consultarCotacao)
        {
    		dsResult.addRow([
        	                  result.Retorno_consultarCotacao[info].cotacao,
        	                  result.Retorno_consultarCotacao[info].produto, 
        	                  result.Retorno_consultarCotacao[info].quantidade,
        	                  result.Retorno_consultarCotacao[info].preco,
        	                  result.Retorno_consultarCotacao[info].total, 
        	                  result.Retorno_consultarCotacao[info].dataEmissao,
        	                  result.Retorno_consultarCotacao[info].fornecedor
        	                ])
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}