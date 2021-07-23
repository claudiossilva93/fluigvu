function enableFields(form)
{ 
	var atividade_corrente 	= getValue("WKNumState") == 0 ? 4 : getValue("WKNumState");
	var atividade_inicio 	= 4;
	
    var habilitar = atividade_corrente == atividade_inicio; // Informe True para Habilitar ou False para Desabilitar os campos
    var mapaForm = new java.util.HashMap();
    mapaForm = form.getCardData();
    var it = mapaForm.keySet().iterator();

    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		var key = it.next();
        form.setEnabled(key, habilitar, true);
    }
    
}