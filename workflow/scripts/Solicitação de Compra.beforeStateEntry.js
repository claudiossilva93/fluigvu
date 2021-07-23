var replacer = function(key, value) {
   var returnValue = value;
   try {
      if (value.getClass() !== null) { // If Java Object
         // qie.debug(key + ': value.getClass() = ' + value.getClass());
         if (value instanceof java.lang.Number) {
            returnValue = 1 * value;
         } else if (value instanceof java.lang.Boolean) {
            returnValue = value.booleanValue();
         } else { // if (value instanceof java.lang.String) {
            returnValue = '' + value;
         }
      }
   } catch (err) {
      // No worries... not a Java object
   }
   return returnValue;
};

function beforeStateEntry(sequenceId)
{
	var sc_aprovada = 9;
	
	if(sequenceId == sc_aprovada)
	{
		
		var obj = {};
		
		obj.solicitarCompra = [];
		
		var sc = ("000000000" + getValue("WKNumProces") ).slice(-9);
		
		var obj_sc = {};		
		obj_sc.numeroSolicitacao = sc;
		obj_sc.solicitante = getValue("WKUser");
		obj_sc.dataEmissao = hAPI.getCardValue("C1_EMISSAO");
		obj_sc.necessidade = hAPI.getCardValue("C1_XNECES");
		obj_sc.filialEntrega = hAPI.getCardValue("COD_C1_FILENT");
		obj_sc.Itens = [];
		
		var processo = getValue("WKNumProces");
	    var campos = hAPI.getCardData(processo);
	    var contador = campos.keySet().iterator();
	    
	    while (contador.hasNext()) {
	        var id = contador.next();
	        
	        if (id.match(/item___/)) {
	        	
	        	var campo = campos.get(id);
	            var id   = id.split("___")[1];
	            
	            var item 	= {};
	            item.item 				= hAPI.getCardValue("item___"+id);
	            item.codigoProduto 		= hAPI.getCardValue("cod_produto___"+id);
	            item.unidadeMedida 		= hAPI.getCardValue("unidade___"+id);
	            item.armazem 			= "01";
	            item.quantidade 		= parseFloat(hAPI.getCardValue("quantidade___"+id));
	            item.observacao 		= hAPI.getCardValue("observacao___"+id);
	            item.codCentrocusto 	= hAPI.getCardValue("cod_ccusto___"+id);
	            item.descCentrocusto 	= hAPI.getCardValue("centro_custo___"+id);
	            item.codNatureza 		= "";
	            item.descNatureza 		= "";
	            item.dataNecessidade 	= hAPI.getCardValue("datanescessidade___"+id);
	            item.frota 				= hAPI.getCardValue("frota___"+id);
	            
	            obj_sc.Itens.push(item);
	        	
	        }
	    }
		
		
		obj.solicitarCompra.push( obj_sc );
		
		var cnst = new Array();
		cnst.push(DatasetFactory.createConstraint("unidade", hAPI.getCardValue("COD_C1_UNIDREQ"), hAPI.getCardValue("COD_C1_UNIDREQ"), ConstraintType.MUST));
		cnst.push(DatasetFactory.createConstraint("filial", hAPI.getCardValue("COD_C1_FILIAL"), hAPI.getCardValue("COD_C1_FILIAL"), ConstraintType.MUST));
		
		var inclui_sc = DatasetFactory.getDataset("inclui_sc", [ JSON.stringify( obj, replacer ) ], cnst, null);
		
		log.info("---- inclui_sc ----")
		log.info("statusCode" +  inclui_sc.getValue(0, "statusCode"))
		log.info("mensagem" +  inclui_sc.getValue(0, "statusCode"))
		
		if(inclui_sc.getValue(0, "statusCode") != "200")
		{
			throw "Oop, problema ao gerar a solicitação de compras, favor contatar o administrador."
		}
		
		hAPI.setCardValue("json_sc", JSON.stringify( obj, replacer ) );
		hAPI.setCardValue("C1_NUM", sc );
	}
	
}