function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("filial");
	dsResult.addColumn("codigo");
	dsResult.addColumn("loja");
	dsResult.addColumn("razaoSocial");
	dsResult.addColumn("nomeFantasia");
	dsResult.addColumn("email");
	dsResult.addColumn("cgc");
	dsResult.addColumn("zoom");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade = "01";//constraints[0].initialValue;
		var filial 	= "0101";//constraints[1].initialValue;
		var codFornecedor = "";
		var descFornecedor = "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "codigo")
			{
				codFornecedor = "codFornecedor="+c.initialValue;
			}else if(c.fieldName == "zoom")
			{
				descFornecedor = "descFornecedor="+c.initialValue;
			}
		}
		
		var endpoint = '/consultarFornecedor?';
		
		if(codFornecedor != "")
		{
			endpoint += codFornecedor + "&";
		}
		
		if(descFornecedor != "")
		{
			endpoint += descFornecedor + "&";
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
        
        for(var info in result.Retorno_WsConsultarFornecedor)
        {
        	
        	dsResult.addRow([ result.Retorno_WsConsultarFornecedor[info].filial, 
        	                  result.Retorno_WsConsultarFornecedor[info].codigo,
        	                  result.Retorno_WsConsultarFornecedor[info].loja,
        	                  result.Retorno_WsConsultarFornecedor[info].razaoSocial,
        	                  result.Retorno_WsConsultarFornecedor[info].nomeFantasia,
        	                  result.Retorno_WsConsultarFornecedor[info].email,
        	                  result.Retorno_WsConsultarFornecedor[info].cpf_cnpj,
        	                  result.Retorno_WsConsultarFornecedor[info].cpf_cnpj + " - " + result.Retorno_WsConsultarFornecedor[info].razaoSocial])
        	
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}