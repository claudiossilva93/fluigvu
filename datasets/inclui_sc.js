function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("statusCode");
	dsResult.addColumn("codigoUnidade");
	dsResult.addColumn("codigoFilial");
	dsResult.addColumn("numeroSolicitacao");
	dsResult.addColumn("mensagem");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade = constraints[0].initialValue;
		var filial 	= constraints[1].initialValue;
		
		var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'REST-PROTHEUS',
            endpoint : '/solicitarCompra',
            method : 'post',
            timeoutService: '100', // segundos
            params : JSON.parse( fields[0] ) ,
        	headers: {
            	tenantID: unidade+","+filial
            }
        }
		
		var dados = clientService.invoke(JSON.stringify(data));
		
		console.log('JSON.stringify(data) -> ' + JSON.stringify(data));
		 
        var result = JSON.parse( dados.getResult() );
        
        console.log('JSON.stringify(result) -> ' + JSON.stringify(result));
        
        if(result.errorCode)
        {
        	dsResult.addRow([ result.errorCode, "","","",result.errorMessage ]);
        	return dsResult;
        }
        
        for(var info in result.retorno_solicitarCompra)
        {
        	
        	dsResult.addRow([ result.retorno_solicitarCompra[info].statusCode, 
        	                  result.retorno_solicitarCompra[info].codigoUnidade,
        	                  result.retorno_solicitarCompra[info].codigoFilial,
        	                  result.retorno_solicitarCompra[info].numeroSolicitacao,
        	                  result.retorno_solicitarCompra[info].mensagem])
        	
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}