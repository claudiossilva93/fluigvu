function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("filial");
	dsResult.addColumn("filialEntrega");
	dsResult.addColumn("numeroSC");
	dsResult.addColumn("numeroPC");
	dsResult.addColumn("condicaoPagamento");
	dsResult.addColumn("descCondicaoPagamento");
	dsResult.addColumn("emissaoPC");
	dsResult.addColumn("dataEntrega");	
	dsResult.addColumn("item");
	dsResult.addColumn("produto");
	dsResult.addColumn("quantidade");
	dsResult.addColumn("armazem");	
	dsResult.addColumn("unidadeMedida");
	dsResult.addColumn("tes");
	dsResult.addColumn("descricao");
	dsResult.addColumn("fornecedor");
	dsResult.addColumn("loja");
	dsResult.addColumn("nome");
	dsResult.addColumn("preco");
	dsResult.addColumn("total");	
	dsResult.addColumn("observacao");
	dsResult.addColumn("tipoFrete");
	dsResult.addColumn("frete");
	dsResult.addColumn("seguro");
	dsResult.addColumn("despesa");
	dsResult.addColumn("solicitante");	
	dsResult.addColumn("cotacao");	
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var unidade 	 	= constraints[0].initialValue;
		var filial 		 	= constraints[1].initialValue;
		var nroPedido		= "";
		
		for each(var c in constraints)
		{
			if(c.fieldName == "nroPedido")
			{
				nroPedido = "nroPedido="+c.initialValue;
			}
		}
		
		var endpoint = '/consultaPedidos?';
		
		if(nroPedido != "")
		{
			endpoint += nroPedido + "&";
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
        
        for(var info in result.Retorno_consultarPedido)
        {
    		dsResult.addRow([
        	                  result.Retorno_consultarPedido[info].filial,
        	                  result.Retorno_consultarPedido[info].filialEntrega, 
        	                  result.Retorno_consultarPedido[info].numeroSC,
        	                  result.Retorno_consultarPedido[info].numeroPC,        	                  
        	                  result.Retorno_consultarPedido[info].condicaoPagamento,
        	                  result.Retorno_consultarPedido[info].descCondicaoPagamento, 
        	                  result.Retorno_consultarPedido[info].emissaoPC,
        	                  result.Retorno_consultarPedido[info].dataEntrega,        	                  
        	                  result.Retorno_consultarPedido[info].item,
        	                  result.Retorno_consultarPedido[info].produto, 
        	                  result.Retorno_consultarPedido[info].quantidade,
        	                  result.Retorno_consultarPedido[info].armazem,        	                  
        	                  result.Retorno_consultarPedido[info].unidadeMedida,
        	                  result.Retorno_consultarPedido[info].tes, 
        	                  result.Retorno_consultarPedido[info].descricao,
        	                  result.Retorno_consultarPedido[info].fornecedor,        	                  
        	                  result.Retorno_consultarPedido[info].loja,        	                  
        	                  result.Retorno_consultarPedido[info].nome,
        	                  result.Retorno_consultarPedido[info].preco, 
        	                  result.Retorno_consultarPedido[info].total,
        	                  result.Retorno_consultarPedido[info].observacao,        	                  
        	                  result.Retorno_consultarPedido[info].tipoFrete,
        	                  result.Retorno_consultarPedido[info].frete, 
        	                  result.Retorno_consultarPedido[info].seguro,
        	                  result.Retorno_consultarPedido[info].despesa,        	                  
        	                  result.Retorno_consultarPedido[info].solicitante,
        	                  result.Retorno_consultarPedido[info].cotacao
        	                ])
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}