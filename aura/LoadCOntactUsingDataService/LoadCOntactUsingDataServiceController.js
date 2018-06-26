({
    handleRecordUpdate : function(component, event, helper) {
		var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED"){
            var resultToast = $A.get("e.force:showToast");
            resultToast.setParams(
                {
                    "title" : "Saved",
                    "message" : "Record was saved successfully"
                }
            )
            resultToast.fire();
        }else if(eventParams.changeType === "LOADED"){
            var availableSubjects = [];
            var allSubjects = ['Hindi', 'English', 'Maths', 'Science'];
            allSubjects.forEach(function(value){
                    availableSubjects.push({value: value, label: value});
            });
            console.log("Available Subjects : " + availableSubjects);
            component.set("v.subjects", availableSubjects);
            var selectedSubjects = component.get("v.simpleRecord.Subjects__c");
            if(selectedSubjects != null){
                selectedSubjects = selectedSubjects.split(";")
            }else{
                selectedSubjects = [];
            }
            component.set("v.selectedSubjects", selectedSubjects)
            console.log("Selected Subjects : " + component.get("v.selectedSubjects"));
        }
    },    
    
    handleSaveRecord : function(component, event, helper){
        var selectedSubjects = component.get("v.selectedSubjects").join(";");
        console.log("Selected Subjects : " + selectedSubjects)
        component.set("v.simpleRecord.Subjects__c", selectedSubjects);
        console.log("Selected Subjects on record : " + component.get("v.simpleRecord.Subjects__c")); 
        component.find("recordHandler").saveRecord($A.getCallback(function(saveResult){
            if(saveResult.state === "SUCCCESS" || saveResult.state === "DRAFT"){
                
            }else{
                
            }
        }));
    }
})