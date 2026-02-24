const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
db.run(`
    CREATE TABLE IF NOT EXISTS job_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_title TEXT NOT NULL,
        company TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Applied',
        date_applied DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

app.post("/applications", (req, res) => {
  const { job_title, company, status, date_applied } = req.body;

  const sql = `
    INSERT INTO job_applications (job_title, company, status, date_applied)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [job_title, company, status, date_applied], function (err) {
    if (err) {
      console.error("Error inserting application:", err.message);
      return res.status(500).json({ error: "Failed to add application" });
    }

    res.status(201).json({ id: this.lastID });
  });
});
app.get("/applications", (req, res) => {
  const sql = `SELECT * FROM job_applications ORDER BY created_at DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching applications:", err.message);
      res.status(500).json({ error: "Failed to fetch applications" });
    } else {
      res.json(rows);
    }
  });
});

// Update application status
app.put("/applications/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const sql = `UPDATE job_applications SET status = ? WHERE id = ?`;

  db.run(sql, [status, id], function (err) {
    if (err) {
      console.error("Error updating application:", err.message);
      res.status(500).json({ error: "Failed to update application" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Application not found" });
    } else {
      res.json({ message: "Application updated successfully" });
    }
  });
});

app.delete("/applications/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM job_applications WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting application:", err.message);
      res.status(500).json({ error: "Failed to delete application" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Application not found" });
    } else {
      res.status(204).send();
    }
  });
});
app.get("/applications/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM job_applications WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch application" });
    } else if (!row) {
      res.status(404).json({ error: "Application not found" });
    } else {
      res.json(row);
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
