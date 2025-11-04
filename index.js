import express from 'express';
import { DuckDBInstance } from '@duckdb/node-api';


const app = express();
const port = 3000;

const db = await DuckDBInstance.create('resources/openpowerlifting.ddb');
const conn = await db.connect();
console.log("connected to db")

app.use(express.static("public"));

app.get("/assignment0", (req, res) => {
  const query = `
      select tested, max(Dots), avg(Dots), median(Dots), max(TotalKg), avg(TotalKg), median(TotalKg), max(Best3SquatKg) as "Best Squat", max(Best3BenchKg) as "Best Bench", max(Best3DeadliftKg) as "Best Deadlift"
      from lifts
      where sanctioned = true and Dots > 400 and Dots < 550
      group by tested;
  `;

  const result = conn.runAndReadAll(query).then(
    (result) => {
      res.json(result.getColumnsObject())
    }
  );

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});