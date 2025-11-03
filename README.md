## Database setup

Download dataset from `https://openpowerlifting.gitlab.io/opl-csv/files/openpowerlifting-latest.zip`

Extract csv

On windows:
```powershell
duckdb.exe openpowerlifting.ddb
CREATE TABLE lifts AS FROM [your .csv file];
```