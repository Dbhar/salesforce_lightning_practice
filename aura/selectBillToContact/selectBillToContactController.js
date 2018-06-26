({
    doInit : function(component, event, helper) {
        var opportunityId = component.get('v.recordId');
        var getContacts = component.get('c.getEligibleContacts');
        getContacts.setParams({
            'opportunityId' : opportunityId
        });
        getContacts.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var contacts = response.getReturnValue();
                if(contacts.length > 0){
                    component.set("v.contacts", contacts);
                    for(var index in contacts){
                        if(contacts[index].isSelected){
                            component.set("v.selectedContactId", contacts[index].record.Id);
                            break;
                        }
                    }
                    
                }
                
            }else{
                alert(state);
            }
        });
        $A.enqueueAction(getContacts);
    },
    handleOnSelect : function(component, event, helper){
    	var selected = event.getSource().get("v.text");
        component.set("v.selectedContactId", selected);
    },
    
    handleOnSave : function(component, event, helper){
        helper.save(component);
    },
    
    handleOnClear : function(component, event, helper){
        component.set("v.selectedContactId", null);
        helper.save(component);
    }, 
    
    handleOnCancel : function(component, event, helper){
        helper.goToRecordPage(component.get("v.recordId"));
    }
  })