({
	showToastMessage : function(message) {
        var toast = $A.get("e.force:showToast");
        toast.setParams({
            "message" : message
        });
        toast.fire();
	},
    redirectToDetailPage : function(component){
        var recordId = component.get("v.recordId");
        console.log("redirecting to record with id " + recordId);
        var navigate = $A.get("e.force:navigateToSObject");
        navigate.setParams({
            "recordId" : recordId 
        });
        navigate.fire();
    }
})