({
	handleRecordUpdated : function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "LOADED" ){
            component.set("v.targetRecordAsJson", JSON.stringify(component.get("v.simplifiedRecord"),null,"\n"));
        }
		
	}
})