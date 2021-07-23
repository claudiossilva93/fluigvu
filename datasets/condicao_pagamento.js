function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("codigo");
	dsResult.addColumn("condicao");
	dsResult.addColumn("descricao");
	dsResult.addColumn("adiantamento");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade = "01";//constraints[0].initialValue;
		var filial 	= "0101";//constraints[1].initialValue;
		
		var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'REST-PROTHEUS',
            endpoint : '/consultarCondicaoPagamento',
            method : 'get',
            timeoutService: '100', // segundos
        	headers: {
            	tenantID: unidade+","+filial
            }
        }
		
		var dados = clientService.invoke(JSON.stringify(data));
		 
        var result = JSON.parse( dados.getResult() );
        
        for(var info in result.Retorno_consultarCondicaoPagamento)
        {
        	
        	dsResult.addRow([ result.Retorno_consultarCondicaoPagamento[info].codigo, 
        	                  result.Retorno_consultarCondicaoPagamento[info].condicao,
        	                  result.Retorno_consultarCondicaoPagamento[info].descricao,
        	                  result.Retorno_consultarCondicaoPagamento[info].adiantamento
        	                  ])
        	
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}