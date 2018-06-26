public with sharing class AccountFilterController {
    @AuraEnabled
    public static Object performQuery(String query){
       	System.debug(query);
        if(query.containsIgnoreCase('COUNT()')){
            return Database.countQuery(query);
        }else{
            return Database.query(query);
        }
    }
    
    @AuraEnabled
    public static void updateAccounts(List<Account> accounts){
        update accounts;
    }
    
    @AuraEnabled
    public static void deleteAccount(Account account){
        delete account;
    }
}