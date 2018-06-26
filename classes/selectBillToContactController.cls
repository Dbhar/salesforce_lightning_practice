public class selectBillToContactController {
    @AuraEnabled
    public static List<EligibleContact> getEligibleContacts(Id opportunityId){
        Opportunity opp = [SELECT Manager__c, Bill_To_Contact__c FROM Opportunity WHERE Id = :opportunityId];
        List<EligibleContact> contacts = new List<EligibleContact>();
        for(Contact con : [SELECT Id, Name, Subjects__c, Account.Name FROM Contact WHERE AccountId = :opp.Manager__c]){
            Boolean isSelected = false;
            if(opp.Bill_To_Contact__c != null && opp.Bill_To_Contact__c == con.Id){
                isSelected = true;
            }
            contacts.add(new EligibleContact(isSelected, con));
        }
        return contacts;
    }
    
    @AuraEnabled
    public static void selectBillToContact(Id opportunityId, Id selectedContactId){
        update new Opportunity(Id = opportunityId, Bill_To_Contact__c = selectedContactId);
    }
    
    public class EligibleContact{
        @AuraEnabled
        public Boolean isSelected{get;set;}
        @AuraEnabled
        public Contact record{get;set;}
        public EligibleContact(Boolean isSelected, Contact record){
            this.isSelected = isSelected;
            this.record = record;
        }
    }
}