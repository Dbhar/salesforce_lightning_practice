public class ManageClassesController {
    @AuraEnabled
    public static Object getClasses(){
        String query = fieldsQuery();
        query += ' ORDER BY Name LIMIT 10';
        return Database.query(query);
    }
    
    @AuraEnabled
    public static void deleteClass(id classId){
        String query = fieldsQuery();
        query += ' WHERE Id = :classId';
        delete Database.query(query);
    }
    
    @AuraEnabled
    public static Object getEditedClass(Id classId){
        String query = fieldsQuery();
        query += ' WHERE Id = :classId';
        return Database.query(query);
    }
    
    private Static string fieldsQuery(){
        return 'SELECT Id, ClassName__c, Board__c, MaxSize__c, ClassTeacher__r.Name, Fee__c FROM Class__c';
    }
}