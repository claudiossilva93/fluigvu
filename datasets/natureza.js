function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("codigoNatureza");
	dsResult.addColumn("descricaoNatureza");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var codNatureza	 = "";
		var descNatureza  = "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "codigoNatureza")
			{
				codNatureza = "codNatureza="+c.initialValue;
			}else if(c.fieldName == "descricaoNatureza")
			{
				descNatureza = "descNatureza="+c.initialValue;
			}
		}
		
		var endpoint = '/consultarNatureza?';
		
		if(codNatureza != "")
		{
			endpoint += codNatureza + "&";
		}
		
		if(descNatureza != "")
		{
			endpoint += descNatureza;
		}
		
		var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'REST-PROTHEUS',
            endpoint : endpoint,
            method : 'get',
            timeoutService: '100', // segundos,
            headers: {
            	tenantID: "01,0101"
            }
        }
		
		var dados = clientService.invoke(JSON.stringify(data));
		 
        var result = JSON.parse( dados.getResult() );
        
        for(var info in result.Retorno_WsConsultarNatureza)
        {
    		dsResult.addRow([
        	                  result.Retorno_WsConsultarNatureza[info].codigo,
        	                  result.Retorno_WsConsultarNatureza[info].descricao
        	                ])
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}