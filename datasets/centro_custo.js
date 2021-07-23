function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("filialCentroCusto");
	dsResult.addColumn("codigoCentroCusto");
	dsResult.addColumn("descricaoCentroCusto");
	dsResult.addColumn("zoom");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade 	 	= constraints[0].initialValue;
		var filial 		 	= constraints[1].initialValue;
		var codCentroCusto	= "";
		var descCentroCusto	= "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "codigoCentroCusto")
			{
				codCentroCusto = "codCtt="+c.initialValue;
			}else if(c.fieldName == "zoom")
			{
				descCentroCusto = "descCtt="+c.initialValue;
			}
		}
		
		var endpoint = '/consultarCentroCusto?';
		
		if(codCentroCusto != "")
		{
			endpoint += codCentroCusto + "&";
		}
		
		if(descCentroCusto != "")
		{
			endpoint += descCentroCusto + "&";
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
        
        for(var info in result.Retorno_WsConsultarCentroCusto)
        {
    		dsResult.addRow([
        	                  result.Retorno_WsConsultarCentroCusto[info].filial,
        	                  result.Retorno_WsConsultarCentroCusto[info].codigo, 
        	                  result.Retorno_WsConsultarCentroCusto[info].descricao,
        	                  result.Retorno_WsConsultarCentroCusto[info].codigo + " - " +result.Retorno_WsConsultarCentroCusto[info].descricao
        	                ])
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}