def getMedicareSales2DBInfo():
    return """There is one table in DB ie. InteractionSummary and following is the description of each column:

            ColumnName: State || Description: State Code in US. (Do not use actual state name but the code for where clause like for Alabama use AL)
            ColumnName: AgentName || Description: Licensed agent/agent/broker  calling the customer. || Type [primary]
            ColumnName: CallStatus || Description: Call Connection Status or Call Handling Status.
            ColumnName: CallType || Description: Inbound - To the agent, OUtbound - By the agent, Callback - inbound followed by Outbound."
            ColumnName: CampaignPocName || Description: Campaign Name. || Type [primary]
            ColumnName: Channel || Description: Media Channel . || Type [primary]
            ColumnName: Factor1 || Description: Dynamic Selector of the dimension. By default this is the campaign name. Dimensions refers to the parameter which helps in keeping the visualization dynamic. No need ot map factor1 to thew questions a user would ask to th bot . || Type [primary]
            ColumnName: Manager || Description: Manager of the agent. || Type [primary]
            ColumnName: Partner || Description: Campaign has a hierarchy. Media Channel - Partner - Campaign. Partner can be internal or external partner.. || Type [primary]
            ColumnName: SalesHead || Description: Sales director responsible for the sales line. . || Type [primary]
            ColumnName: Season || Description: Time Segregation. From 1st October to 7 December it is referred to AEP. Rest is lockin.
            ColumnName: StartDate || Description: Calling Date..
            ColumnName: Tactic || Description: Similar to campaign hierarchy, tactic is one level higher than media channel.
            ColumnName: TeamName || Description: Alias of team captain. Team contains a group of agents. || Type [primary]
            ColumnName: ContactId || Description: Primary Key.
            ColumnName: Disposition || Description: Disposition refers to call leveling. Description of the call in pre formatted way. Refers to what was the result of the call or interaction with the customer..
            ColumnName: Enrollments || Description: Flag variable indicates whether enrollment happened or not.
            ColumnName: AgentTime || Description: Duration of call..
            ColumnName: ANI || Description: Customer's phone number.
            ColumnName: BadLead || Description: If disposition = bad lead then 1 else 0.
            ColumnName: BillableCalls || Description: Calls satisfying billable criteria. Criteria include eligible hours of operation and eligible geo footprint.
            ColumnName: Campaignid || Description: Foreign key for campaign table.
            ColumnName: City || Description: City in which customer resides.        
            ColumnName: Dnis || Description: Toll Free number of the campaign.
            ColumnName: DOB || Description: Date of birth of the customer.
            ColumnName: Fips || Description: Fips code which is mapped to the county. 1: 1 mapping with the county.
            ColumnName: Firstname || Description: First name of the customer.
            ColumnName: HourGroup || Description: Calculated field to divide call hours into buckets.
            ColumnName: Lastname || Description: Last name of the customer.
            ColumnName: Newani || Description: Equivalent to ANI.
            ColumnName: OriginalLeadCost || Description: Cost for the call.
            ColumnName: Recordid || Description: Customer Unique identification number.
            ColumnName: StatTime || Description: STart Time of the call.
            ColumnName: Sub Disposition || Description: Granular level details of the disposition.
            ColumnName: TeamCaptain || Description: .
            ColumnName: UniqueCalls  || Description: Unique calls per customer per day.
            ColumnName: ZIP || Description: ZIP Code is a 5-digit number that specifies an individual destination post office or mail delivery area in United States.
            ColumnName: MA || Description: Used to calculate MA Mix
            
            Terminologies:

            1. Sales or Apps or conversion: all these refers to Enrollments.

            2. Call Volume: It is defined as the count of contactId group by certain  factor.
                    Example: Find callVolume by Partner. Query will be Select Count(ContactId) GRoup by Partners
            2.1 High Call Volume: A call volume is defined as call volume greater than average.
            3. Conversion Rate: It is calculated as "sum(enrollments)/Call Volume"
            4. Billable call percentage: It is calculated as sum(BillableCalls)/Call Volume.
            5. Apps Per Day: Defined as Average number of enrollment per day and  It is calculated as Sum(enrollments) / count distinct startDate.
            6. Total Cost: It is calculated as Sum(OriginalLeadCost)
            7. MA mix: It is calculated as sum(ma)/ sum(enrollments)
            8. COA: Calculated field. Cost of Acquisition. If Apps = 0, then sum(leadCost) else sum(lead cost) divided by sum(apps).
            9. TotalBillableCalls: It is defined as the SUM of BillableCalls group by certain  factor.
            10. Broker or Agent Name or Producer refers to same thing.
"""
