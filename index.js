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
      select tested, max(Best3SquatKg) as "Best Squat", max(Best3BenchKg) as "Best Bench", max(Best3DeadliftKg) as "Best Deadlift"
      from lifts
      where sanctioned = true and Dots > 400
      group by tested;
  `;

  const result = conn.runAndReadAll(query).then(
    (result) => {
      res.json(result.getColumnsObject())
    }
  );

});

app.get("/assignment1", (req, res) => {
  const query = `
      select tested, avg(best3benchkg) as "Average Bench", max(Best3BenchKg) as "Best Bench", median(Best3BenchKg) as "Median Bench"
      from lifts
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