function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("codigoProduto");
	dsResult.addColumn("descricaoProduto");
	dsResult.addColumn("tipoProduto");
	dsResult.addColumn("armazem");
	dsResult.addColumn("unidadeMedida");
	dsResult.addColumn("grupoProduto");
	dsResult.addColumn("contaProduto");
	dsResult.addColumn("zoom");
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade 	 = "01";//constraints[0].initialValue;
		var filial 		 = "0101";//constraints[1].initialValue;
		var codProduto	 = "";
		var descProduto  = "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "codigoProduto")
			{
				codProduto = "codProduto="+c.initialValue;
			}else if(c.fieldName == "zoom")
			{
				descProduto = "descProduto="+c.initialValue;
			}
		}
		
		var endpoint = '/consultarProduto?';
		
		if(codProduto != "")
		{
			endpoint += codProduto + "&";
		}
		
		if(descProduto != "")
		{
			endpoint += descProduto + "&";
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
        
        for(var info in result.Retorno_WsConsultarProduto)
        {
    		dsResult.addRow([
        	                  result.Retorno_WsConsultarProduto[info].codigoProduto,
        	                  result.Retorno_WsConsultarProduto[info].descricaoProduto, 
        	                  result.Retorno_WsConsultarProduto[info].tipoProduto,
        	                  result.Retorno_WsConsultarProduto[info].armazem,
        	                  result.Retorno_WsConsultarProduto[info].unidadeMedida, 
        	                  result.Retorno_WsConsultarProduto[info].grupoProduto,
        	                  result.Retorno_WsConsultarProduto[info].contaProduto, 
        	                  result.Retorno_WsConsultarProduto[info].codigoProduto + " - " + result.Retorno_WsConsultarProduto[info].descricaoProduto])
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}