({
	handleSubmit : function(component, event, helper) {
   		helper.showToastMessage("Record Saved Successfully");
        helper.redirectToDetailPage(component);
	},
    handleCancelAction : function(component, event, helper){
        helper.redirectToDetailPage(component);
    }
})