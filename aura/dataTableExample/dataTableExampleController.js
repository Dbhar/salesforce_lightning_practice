({
    /**
         * Webkul Software.
         *
         * @category  Webkul
         * @author    Webkul
         * @copyright Copyright (c) 2010-2016 Webkul Software Private Limited (https://webkul.com)
         * @license   https://store.webkul.com/license.html
         */
	
    init: function (cmp, event, helper) {
    cmp.set('v.democolumns', [
                {label: 'Account Name', fieldName: 'accountName', type: 'text'},
                {label: 'Industry', fieldName: 'industry', type: 'text'},
                {label: 'Account Number', fieldName: 'accountNumber', type: 'text'}
            ]);
        cmp.set('v.demodata', [{
                id: 'a',
                accountName: 'Edge Communications',
                industry: 'Education',
                accountNumber: 'CD451796'
            },
            {
                id: 'b',
                accountName: 'GenePoint',
                industry: 'Electronics',
                accountNumber: 'CC978213'
            }]);
    },
    getSelectedAccName: function (cmp, event) {
        var selectedAccRows = event.getParam('selectedRows');
        for (var i = 0; i < selectedAccRows.length; i++){
            alert(selectedAccRows[i].accountName+" is selected");
        }
    }
})