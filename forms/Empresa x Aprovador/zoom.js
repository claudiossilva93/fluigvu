function  setSelectedZoomItem(selectedItem){
	
	if (selectedItem.inputId == "aprovador" ){		
		$("#codAprovador").val( selectedItem["colleagueId"] );		
	}
}