function createDataset(fields, constraints, sortFields) {

	var dsResult = DatasetBuilder.newDataset();
	
	dsResult.addColumn("CODIGO");
	dsResult.addColumn("NOME");
	dsResult.addColumn("CGC");
	dsResult.addColumn("ZOOM");
	
	try{
		
		var codUnidade = constraints[0].initialValue;
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'REST-PROTHEUS',
            endpoint : '/ConsultarFilial',
            method : 'get',
            timeoutService: '100', // segundos
            headers: {
            	tenantID: "01"
            }
        }
		
		var dados = clientService.invoke(JSON.stringify(data));
		
        var result = JSON.parse( dados.getResult() );
        
        for(var info in result.Retorno_ConsultarFilial)
        {
        	
        	dsResult.addRow([ result.Retorno_ConsultarFilial[info].codigoFilial, 
        	                  result.Retorno_ConsultarFilial[info].nomeFilial,
        	                  result.Retorno_ConsultarFilial[info].cgcFilial,
        	                  result.Retorno_ConsultarFilial[info].nomeFilial + " - " + result.Retorno_ConsultarFilial[info].cgcFilial])
        	
        }
		
	} catch(err) {
		dsResult.addRow([ err.message ]);
    }
	
	return dsResult;
}