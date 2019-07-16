public with sharing class ChartJsSoqlRetriever {

    @AuraEnabled
    public static AggregateResult[] myNewFunction(String iQuery)
    {
        List<SObject> s = Database.query(iQuery);
        return s;
    }
}
