({
    doInit : function(component, event, helper) {
        var getClasses = component.get('c.getClasses');
        getClasses.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var classes = response.getReturnValue();
                component.set('v.classes', classes);
            }
        });
        $A.enqueueAction(getClasses);
    },
    
    handleDelete : function(component, event, helper){
        var classId = event.getSource().get("v.value");
        var deleteAction = component.get("c.deleteClass");
        deleteAction.setParams({
            'classId' : classId
        });
        deleteAction.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var classes = component.get('v.classes');
                for(var index in classes){
                    if(classes[index].Id === classId){
                        classes.splice(index, 1);
                        break;
                    }
                }
                component.set('v.classes', classes);
            }
        });
        $A.enqueueAction(deleteAction);                         
    },
    
    handleEdit : function(component, event, helper){
        var recordId = event.getSource().get("v.value");
        component.set("v.recordId", recordId);
    },
    
   handleRecordEditFormSaveSuccess : function(component, event, helper){
        var fetchEditedClass = component.get("c.getEditedClass");
        var recordId = component.get('v.recordId')
        fetchEditedClass.setParams({
            'classId' : recordId
        });
        fetchEditedClass.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var classes = component.get("v.classes");
                var editedClass = response.getReturnValue()[0];
                for(var index in classes){
                    if(classes[index].Id === editedClass.Id){
                        classes[index] = editedClass;
                        break;
                    }
                }
                component.set("v.classes", classes);
                component.set("v.recordId", null);
            }
        });
        $A.enqueueAction(fetchEditedClass);
    },
    
    handleCancelAction : function(component, event, helper){
        component.set("v.recordId", null);
    }
})