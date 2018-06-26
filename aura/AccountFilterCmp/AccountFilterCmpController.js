(   {
    handleFilterAction : function(component, event, helper) {
        helper.fetchAccounts(component, 0);
  	},
    handleNext : function(component, event, helper) {
        var offset =  component.get('v.offset') + 10
        component.set('v.offset', offset);
        helper.applyOffset(component, offset);
  	},
    
    handlePrevious : function(component, event, helper) {
        var offset = component.get('v.offset') - 10
        component.set('v.offset', offset);
        helper.applyOffset(component, offset);
  	},
    
    handleFirst : function(component, event, helper) {
        var offset = 0;
        component.set('v.offset', offset);
        helper.applyOffset(component, offset);
  	},
    
    handleLast : function(component, event, helper) {
        var totalRecords = component.get('v.totalRecords');
        var offset = totalRecords - 10;
        if(totalRecords % 10 != 0){
            offset = totalRecords - totalRecords % 10;
        }
        component.set('v.offset', offset);
        helper.applyOffset(component, offset);
  	},
    
    handleOnSave : function(component, event, helper){
        var draftValues = event.getParam("draftValues");
        var updateAction = component.get("c.updateAccounts");
        updateAction.setParams({
            'accounts' : draftValues
        });
        helper.performDmlAction(component, updateAction);
    },
    
    handleRowAction : function(component, event, helper){
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch(action.name){
            case 'delete':
                var deleteAction = component.get('c.deleteAccount');
                deleteAction.setParams({
                    'account' : row
                });
                helper.performDmlAction(component, deleteAction);
        }
    }
})