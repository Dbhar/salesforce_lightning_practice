({
	goToRecordPage : function(recordId) {
        var goToRecordDetail = $A.get("e.force:navigateToSObject");
        goToRecordDetail.setParams({
            "recordId" : recordId,
            "slideDevName": "detail"
        });
        goToRecordDetail.fire();
	},
    
    refresh : function(){
        var refresh = $A.get("e.force:refreshView");
        refresh.fire();
    },
    
    showToast : function() {
        var toast = $A.get("e.force:showToast");
        toast.setParams({
            "message" : "record updated"
        });
        toast.fire();
	},
    
    save : function(component){
        var opportunityId = component.get("v.recordId");
        var selectedContactId = component.get("v.selectedContactId");
        var selectBillToContact = component.get("c.selectBillToContact");
        selectBillToContact.setParams({
            'opportunityId' : opportunityId,
            'selectedContactId' : selectedContactId
        });
        selectBillToContact.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                this.showToast();
                this.goToRecordPage(component.get("v.recordId"));
                this.refresh();
            }else{
                alert(state);
            }
        });
        $A.enqueueAction(selectBillToContact);
    }
})