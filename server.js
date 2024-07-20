import express from 'express';
import pg from 'pg';
import env from 'dotenv';
const { Pool } = pg

//Load your environment variables
env.config();
const app = express();
const PORT = process.env.PORT;

//Setup connection pool
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET All Posts 
app.get("/posts", async (req, res) => {
    try {
        //{rows} -> simple destructuring
        const { rows } = await db.query("SELECT * FROM posts");
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET a specific Post by id
app.get("/posts/:id", async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Post not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Creating a new Post
app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const { rows } = await db.query("INSERT INTO posts (title, content, author, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, author, new Date()]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Updating a Post
app.patch("/posts/:id", async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const { rows } = await db.query("UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), author = COALESCE($3, author) WHERE id = $4 RETURNING *",
            [title, content, author, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: "Post not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Deleting a Post
app.delete("/posts/:id", async (req, res) => {
    try {
        const { rowCount } = await db.query("DELETE FROM posts WHERE id = $1", [req.params.id])
        if (rowCount === 0) return res.status(404).json({ message: "Post not found" });
        res.status(204).json({ message: "Post Deleted" }); //No content, 204 status code.

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`API is running at http://localhost:${PORT}`);
});