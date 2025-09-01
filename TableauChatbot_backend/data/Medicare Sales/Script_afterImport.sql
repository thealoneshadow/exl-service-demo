
select DISTINCT CallStatus from InteractionSummary  x

SELECT x.Enrollments, MA, COUNT(*) FROM InteractionSummary x GROUP BY x.Enrollments, MA
SELECT x.State,  COUNT(*) FROM InteractionSummary x GROUP BY x.State

--update InteractionSummary
--set CallStatus='Call Not Connected'
--where CallStatus IS NULL


--alter table InteractionSummary
--drop column County

--alter table InteractionSummary
--drop column CallVolume


--alter table InteractionSummary
--drop column ConversionRate


--alter table InteractionSummary
--drop column AepPeriod


--alter table InteractionSummary
--drop column BillableCallsPercentage

--UPDATE InteractionSummary
--SET AgentTime=45
--WHERE CallStatus = 'answered'

--UPDATE InteractionSummary
--SET AgentTime=0
--WHERE CallStatus != 'answered' 

--alter table InteractionSummary
--drop column appsPerDay

--Update InteractionSummary
--SET BadLead=1
--WHERE BadLead IS NULL

--Update InteractionSummary
--SET BillableCalls=0
--WHERE BillableCalls IS NULL


--alter table InteractionSummary
--drop column CallDatetime

--alter table InteractionSummary
--drop column OriginalLeadCost


--EXEC sp_RENAME 'InteractionSummary.TotalCost', 'OriginalLeadCost', 'COLUMN'

--alter table InteractionSummary
--drop column CPA


--Update InteractionSummary
--SET CallDuration=AgentTime
--WHERE CallDuration IS NULL

--alter table InteractionSummary
--drop column CallHour



--alter table InteractionSummary
--drop column Callbacks

--Update InteractionSummary
--SET Channel='Others' 
--WHERE Channel IS NULL



--Update InteractionSummary
--SET ma=0 
--WHERE Enrollments=0

--Update InteractionSummary
--SET ma=1
--WHERE MA IS NULL

Update InteractionSummary
SET State='Others'
WHERE State IS NULL



select DISTINCT x.MA from InteractionSummary x
--DROP TABLE InteractionSummary



