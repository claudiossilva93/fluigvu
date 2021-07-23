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

	var atividade_aprovado 	= 9;
	
	if(sequenceId == atividade_aprovado)
	{
		
		if(hAPI.getCardValue("adiantamento") == "1")
		{
			log.info('Envio email: passo 1');			
			var cEmail=getTemplateEmail();
			cEmail=cEmail.replace('${DATA_EMISSAO}',hAPI.getCardValue("C1_EMISSAO"))
			 			  .replace('${VALOR}',hAPI.getCardValue("total_pedido"))
			             .replace('${FORNECEDOR}', hAPI.getCardValue("fornecedor"))
			             .replace('${USUARIO}', hAPI.getCardValue("C1_SOLICIT"));
			
			var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
			log.info('Envio email: passo 2');
			obj.simpleEmail(1,"Notificação sobre inclusão de Pagamento antecipado", "nao-responder@nao-responder.com.br", "gerencia.ti@bandeirantes.agr.br", cEmail, "text/html");
			log.info('Email enviado');
			
			return true;
		}	
		
		var obj = {};
		
		obj.incluirPedido = [];
		
		var pc = ("000000" + getValue("WKNumProces") ).slice(-6);
		
		var obj_pc = {};		
		obj_pc.numeroPedido 		= pc;
		obj_pc.dataEmissao 			= hAPI.getCardValue("C1_EMISSAO");
		obj_pc.fornecedor 			= hAPI.getCardValue("COD_FORNECEDOR");
		obj_pc.loja 				= hAPI.getCardValue("LOJA_FORNECEDOR");
		obj_pc.condicaoPagamento 	= hAPI.getCardValue("cod_condicao_pagamento");
		obj_pc.filialEntrega 		= hAPI.getCardValue("COD_C1_FILENT");
		obj_pc.tipoFrete 			= hAPI.getCardValue("tipo_frete");
		obj_pc.valorFrete 			= hAPI.getCardValue("valorFrete") == "" ? 0 : parseFloat( hAPI.getCardValue("valorFrete").replace(".","").replace(",",".") );
		obj_pc.despesa 				= hAPI.getCardValue("despesas") == "" ? 0 : parseFloat( hAPI.getCardValue("despesas").replace(".","").replace(",",".") );
		obj_pc.seguro 				= hAPI.getCardValue("seguro") == "" ? 0 : parseFloat( hAPI.getCardValue("seguro").replace(".","").replace(",",".") );
		
		obj_pc.Itens = [];		
		var processo = getValue("WKNumProces");
	    var campos = hAPI.getCardData(processo);
	    var contador = campos.keySet().iterator();
	    
	    while (contador.hasNext()) {
	        var id = contador.next();
	        
	        if (id.match(/item___/)) {
	        	
	        	var campo = campos.get(id);
	            var id   = id.split("___")[1];
	            
	            var item 	= {};
	            item.codigoProduto 		= hAPI.getCardValue("cod_produto___"+id);
	            item.quantidade 		= parseFloat(hAPI.getCardValue("quantidade___"+id));
	            item.preco 				= parseFloat( hAPI.getCardValue("preco___"+id).replace(".","").replace(",",".") );
	            item.total 				= parseFloat( hAPI.getCardValue("total___"+id).replace(".","").replace(",",".") );
	            item.tes 				= hAPI.getCardValue("cod_tes___"+id);
	            
	            obj_pc.Itens.push(item);
	        	
	        }
	    }
		
		
		obj.incluirPedido.push( obj_pc );
		
		var cnst = new Array();
		cnst.push(DatasetFactory.createConstraint("unidade", hAPI.getCardValue("COD_C1_UNIDREQ"), hAPI.getCardValue("COD_C1_UNIDREQ"), ConstraintType.MUST));
		cnst.push(DatasetFactory.createConstraint("filial", hAPI.getCardValue("COD_C1_FILIAL"), hAPI.getCardValue("COD_C1_FILIAL"), ConstraintType.MUST));
		
		var inclui_sc = DatasetFactory.getDataset("inclui_pc", [ JSON.stringify( obj, replacer ) ], cnst, null);		
		if(inclui_sc.getValue(0, "statusCode") != "200")
		{
			throw "Erro ao gerar PC: " + inclui_sc.getValue(0, "mensagem")
		}
		
		hAPI.setCardValue("json_pc", JSON.stringify( obj, replacer ) );
		hAPI.setCardValue("C1_NUM", inclui_sc.getValue(0, "numeroSolicitacao")  );
		
	}

}

function getTemplateEmail()
{
	return '<html> '+
			'<head> '+
			'    <meta charset="UTF-8">'+
			'	<title>Informações Pagamento Antecipado</title> '+
			'	<style> '+
			'		.DescrMsgForum { '+
			'						font-size: 14px;    '+
			'					   } '+
			'		.note { '+
			'				font-size: 14px; '+
			'				font-weight: bold; '+
			'			  } '+
			'       .container{'+
			'           margin-top: 15px;'+
			'           margin-left: 15px;'+
			'       }'+
			'</style> '+
			'</head> '+
			'<body class="container"> '+
			'	<div align="left"> '+
			'		<table cellspacing="0" cellpadding="0" border="0"> '+
			'			<tbody> '+
			'				<tr> '+
			'					<td> '+
			'						<p class="DescrMsgForum">Prezado(a),</p> '+
			'						<p class="DescrMsgForum">'+
			'                           Foi incluído no dia ${DATA_EMISSAO} um pagamento antecipado no valor de R$ ${VALOR} para o fornecedor ${FORNECEDOR} pelo usuário ${USUARIO}. <br>'+
			'                           Caso tenha alguma dúvida, por favor entrar em contato com o Departamento Financeiro. '+
			'                        </p> '+
			'						<p class="DescrMsgForum">Atenciosamente, </p> '+
			'						<p class="DescrMsgForum">Equipe Financeira.</p> '+
			'						<br>							 '+
			'					</td> '+
			'				</tr> '+
			'				<tr> '+
			'					<td>&nbsp;</td> '+
			'				</tr> '+
			'			</tbody> '+
			'		</table> '+
			'	</div> '+
			'	<br /> '+
			'</body> '+
			'</html> ';
}