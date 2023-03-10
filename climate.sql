CREATE TABLE climate(
atom_id VARCHAR(20),
propertyLatitude   VARCHAR(20),
PropertyLongitude VARCHAR(20),
SitusStateCountyFIPS VARCHAR(20),
ParcelNumberRaw VARCHAR(20),
PropertyAddressFull VARCHAR(150),
PropertyAddressHouseNumber VARCHAR(50),
PropertyAddressStreetDirection VARCHAR(50),
PropertyAddressStreetName VARCHAR(100),
PropertyAddressStreetSuffix VARCHAR(20),
PropertyAddressStreetPostDirection VARCHAR(20),
PropertyAddressUnitPrefix VARCHAR(10),
PropertyAddressUnitValue VARCHAR(20),
PropertyAddressCity VARCHAR(20),
PropertyAddressState VARCHAR(20),
PropertyAddressZIP VARCHAR(20),
PropertyAddressZIP4 VARCHAR(20),
PropertyAddressCRRT VARCHAR(20),
HeatRiskScore VARCHAR(10),
HeatThresholdFahrenheit VARCHAR(10),
HeatBaselineAverage VARCHAR(10),
HeatFutureAverage  VARCHAR(10),
StormRiskScore VARCHAR(10),
StormBaselineAverageCounts VARCHAR(10),
StormBaselineAverageTotals VARCHAR(10),
StormFutureAverageCounts VARCHAR(10),
StormFutureAverageTotals VARCHAR(10),
WildfireRiskScore VARCHAR(10),
WildfireBaselineAverage VARCHAR(10),
WildfireMaxFutureAverage VARCHAR(10),
DroughtRiskScore VARCHAR(10),
DroughtBaselineAverage VARCHAR(10),
DroughtFutureAverage VARCHAR(10),
FloodHighTideFuture VARCHAR(10),
FloodDepthFuture VARCHAR(10),
FloodChanceFuture VARCHAR(10),
FloodFemaRisk VARCHAR(50),
FloodRiskScore VARCHAR(10),
TotalRisk VARCHAR(10)
);


select * from climate where propertyaddresszip = '80118' AND (propertyaddressfull ILIKE 'INCA%' OR propertyaddressfull ILIKE '%INCA%' OR propertyaddressfull ILIKE '%INCA');

select * from climate where (propertyaddressfull ILIKE 'INCA%' OR propertyaddressfull ILIKE '%INCA%' OR propertyaddressfull ILIKE '%INCA');

select * from climate where to_tsvector(propertyaddressfull) @@ to_tsquery('INCA')