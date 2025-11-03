# Assignments for 193.187 Information Visualization (VU 4,0) 2025W

## Database setup

Download dataset from `https://openpowerlifting.gitlab.io/opl-csv/files/openpowerlifting-latest.zip`

Extract csv

On windows:
```powershell
duckdb.exe [repository location]\public\openpowerlifting.ddb
CREATE TABLE lifts AS FROM [your .csv file];
```

## Usage

```shell
npm install
node index.js
```