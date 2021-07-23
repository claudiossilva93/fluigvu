function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("codigo");
	dsResult.addColumn("tipo");
	dsResult.addColumn("texto");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade = "01";//constraints[0].initialValue;
		var filial 	= "0101";//constraints[1].initialValue;
		var tipo	= "";
		var descTes	= "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "tipo")
			{
				tipo = "tipo="+c.initialValue;
			}else if(c.fieldName == "texto")
			{
				descTes = "descTes="+c.initialValue;
			}
		}
		
		var endpoint = '/consultarTes?';
		
		if(tipo != "")
		{
			endpoint += tipo + "&";
		}
		
		if(descTes != "")
		{
			endpoint += descTes + "&";
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
        
        for(var info in result.Retorno_consultarTes)
        {
        	
        	dsResult.addRow([ result.Retorno_consultarTes[info].codigo, 
        	                  result.Retorno_consultarTes[info].tipo,
        	                  result.Retorno_consultarTes[info].texto
        	                  ])        	
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}