function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("codAprovador");
	dsResult.addColumn("codUsuario");
	dsResult.addColumn("nome");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade = "01";//constraints[0].initialValue;
		var filial 	= "0101";//constraints[1].initialValue;
		var valorPedido	= "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "valorPedido")
			{
				valorPedido = "valorPedido="+c.initialValue;
			}
		}
		
		var endpoint = '/ConsultarAprovadores?';
		
		if(valorPedido != "")
		{
			endpoint += valorPedido + "&";
		}		
		
		var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'REST-PROTHEUS',
            endpoint : endpoint,
            method : 'get',
            timeoutService: '100', // segundos
        	headers: {
            	tenantID: unidade+","+filial
            }
        }
		
		var dados = clientService.invoke(JSON.stringify(data));
		 
        var result = JSON.parse( dados.getResult() );
        
        for(var info in result.Retorno_WsConsultarAprovadores)
        {
        	
        	dsResult.addRow([ result.Retorno_WsConsultarAprovadores[info].codAprovador, 
        	                  result.Retorno_WsConsultarAprovadores[info].codUsuario,
        	                  result.Retorno_WsConsultarAprovadores[info].nome
        	                  ])        	
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}