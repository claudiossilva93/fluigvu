function inputFields(form)
{
	
	if(form.getValue("aprovadores_pc") == "")
	{
		var cnst = new Array();
		cnst.push(DatasetFactory.createConstraint("unidade", form.getValue("COD_C1_UNIDREQ"), form.getValue("COD_C1_UNIDREQ"), ConstraintType.MUST));
		cnst.push(DatasetFactory.createConstraint("filial", form.getValue("COD_C1_FILIAL"), form.getValue("COD_C1_FILIAL"), ConstraintType.MUST));
		cnst.push(DatasetFactory.createConstraint("valorPedido", parseFloat( form.getValue("total_pedido").replace(".","").replace(",",".") ), parseFloat( form.getValue("total_pedido").replace(".","").replace(",",".") ), ConstraintType.MUST));
		
		var aprovadores_pc = DatasetFactory.getDataset("aprovadores_pc", null, cnst, null);	
		var aprovadores = "";
		
		for(var i = 0; i < aprovadores_pc.rowsCount; i++)
		{
			aprovadores += aprovadores_pc.getValue(i, "codUsuario")+",";
		}		
		form.setValue("aprovadores_pc", aprovadores);		
	}

}