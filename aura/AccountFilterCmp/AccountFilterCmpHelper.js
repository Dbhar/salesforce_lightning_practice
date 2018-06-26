({
	buildQuery : function(component, fieldsToQuery) {
        var city = component.get('v.billingCity');
        var state = component.get('v.billingState');
        var country = component.get('v.billingCountry');
        var query = 'SELECT ' + fieldsToQuery.join(',') + ' FROM Account';
        var whereConditions = [];
        if(city && city.length > 0 ){
            whereConditions.push('BillingCity = \'' + city + '\''); 
        }
        if(state && state.length > 0){
            whereConditions.push('BillingState = \'' + state + '\''); 
        }
        if(country && country.length > 0){
            whereConditions.push('BillingCountry = \'' + country + '\''); 
        }
        if(whereConditions.length > 0){
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        if(!fieldsToQuery.includes('COUNT()')){
        	query += ' Order BY Name LIMIT 50000';    
        }
        console.log(query);
		return query;
	},
    
    fetchAccounts : function(component, offset){
    	var query = this.buildQuery(component, ['Name', 'BillingCity', 'BillingState', 'BillingCountry']);
        var filterAction = component.get("c.performQuery");
        filterAction.setParams({
            query : query
        });
        filterAction.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var accounts = response.getReturnValue();
                var totalRecords = accounts.length;
                if(totalRecords > 0){
                	component.set('v.displayResultsCard', true);
                    var actions=[
                        {'label' : 'delete', 'name' : 'delete'}
                    ];
                    component.set("v.columns",[
                        {"label" : "Name", "fieldName" : "Name", "type" : "text"},
                        {"label" : "Billing City", "fieldName" : "BillingCity", "type" : "text", "editable" : "true"},
                        {"label" : "Billing State", "fieldName" : "BillingState", "type" : "text", "editable" : "true"},
                        {"label" : "Billing Country", "fieldName" : "BillingCountry", "type" : "text", "editable" : "true"},
                        {'type' : 'action', 'typeAttributes' : {'rowActions' : actions}}
                	]);
                    console.log(accounts);
                    component.set('v.totalRecords', totalRecords);    
                	component.set('v.queriedAccounts', accounts);
                	this.applyOffset(component, offset);
                    component.set('v.offset', offset);
                	console.log(JSON.stringify(accounts));    
                }else{
                    component.set('v.displayResultsCard', false);
                }
                
            }else{
                alert(state);
                alert(JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(filterAction);
	},
    
    applyOffset : function(component, offset){
        component.set("v.accounts", component.get('v.queriedAccounts').slice(offset, offset + 10));
    },
    
    performDmlAction : function(component, dmlAction){
        dmlAction.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var offset = component.get("v.offset") - 1;
                this.fetchAccounts(component, offset);
            }else{
                alert(state);
                var error = response.getError();
                alert(JSON.stringify(error[0].pageErrors[0].message));
            }
        });
        $A.enqueueAction(dmlAction);
    }
})