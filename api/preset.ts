const express = require("express");
const router = express.Router();
const { Client } = require("pg");


// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    }
})

// GET all preset
router.get("/", async (req, res) => {
      try {
        const user = await client.query(`SELECT * FROM presets`);
        res.status(201).json(user.rows);
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});

// PATCH single preset from db (based on presetId)
router.post("/", async (req, res) => {
    try {
        const createQuery = `INSERT INTO presets (name, picurl, activities) VALUES(${req.body.name}, ${req.body.picurl}, ${req.body.activities});`;
        await client.query(createQuery);
        res.status(200).json({
            success: `User created.`,
        });
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});

// PATCH single preset from db (based on presetId)
router.patch("/", async (req, res) => { 
    let updateField = '';
    if (req.body.name) {
        updateField = updateField + "name='" + req.body.name + "',";
    }
    if (req.body.picurl) {
        updateField = updateField + "picurl='" + req.body.picurl + "',";
    }
    if (req.body.activities) {
        updateField = updateField + "activities='" + req.body.activities + "',";
    }
    const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
    const updateQuery = `UPDATE presets SET ${updateFieldEdited} WHERE userid='${req.userId}'`;
    try {
        const udpate = await client.query(updateQuery);
        if (udpate.rowCount > 0) {
            res.status(200).json({
                success: `Preset updated.`,
            });
        } else {
            res.status(400).json({
                error: `No preset found with id#${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});

// DELETE preset from table
router.delete("/", async (req, res) => {
    try {
        const deleteUser = `DELETE FROM presets WHERE presetid='${req.userId}'`;
        await client.query(deleteUser);
        res.status(201).json({ success: `Preset with id #${req.userId} was deleted.` });
    } catch (err) {
        res.status(400).json({
            error: `${err})`,
        });
    }
});


module.exports = router;
