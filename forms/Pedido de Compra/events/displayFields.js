function displayFields(form,customHTML){ 
	
	var usuario = getValue("WKUser");

	
	var C1_SOLICIT = form.getValue("C1_SOLICIT");
	if (C1_SOLICIT == '' || C1_SOLICIT == null  ){
		form.setValue("C1_SOLICIT",usuario );
	}
	
	var C1_EMISSAO = form.getValue("C1_EMISSAO") 
	if (C1_EMISSAO == '' || C1_EMISSAO == null  ){

		var data =new Date()
		var dia=data.getDate();
		var mes=data.getMonth();
		var ano=data.getFullYear();
		data = dia + '/' + (++mes) + '/' + ano;
		
		form.setValue("C1_EMISSAO",data );
		
	}
	
}