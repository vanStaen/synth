const express = require("express");
const router = express.Router();
const { Client } = require("pg");

// Init Postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  }
});

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

// POST single preset from db (based on presetId)
router.post("/", async (req, res) => {
  try {
    const createQuery = `INSERT INTO presets (noise, sine, square, attack, decay, sustain, release, filter) VALUES(${req.body.noise}, ${req.body.sine}, ${req.body.square}, ${req.body.attack}, ${req.body.decay}, ${req.body.sustain}, ${req.body.release}, ${req.body.filter});`;
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
router.patch("/:presetid", async (req, res) => {
  let updateField = "";
  if (req.body.noise) {
    updateField = updateField + "noise='" + req.body.noise + "',";
  }
  if (req.body.sine) {
    updateField = updateField + "sine='" + req.body.sine + "',";
  }
  if (req.body.square) {
    updateField = updateField + "square='" + req.body.square + "',";
  }
  if (req.body.attack) {
    updateField = updateField + "attack='" + req.body.attack + "',";
  }
  if (req.body.decay) {
    updateField = updateField + "decay='" + req.body.decay + "',";
  }
  if (req.body.sustain) {
    updateField = updateField + "sustain='" + req.body.sustain + "',";
  }
  if (req.body.release) {
    updateField = updateField + "release='" + req.body.release + "',";
  }
  if (req.body.filter) {
    updateField = updateField + "filter='" + req.body.filter + "',";
  }
  const updateFieldEdited = updateField.slice(0, -1); // delete the last comma
  const updateQuery = `UPDATE presets SET ${updateFieldEdited} WHERE presetid='${req.params.presetid}'`;
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
router.delete("/:presetid", async (req, res) => {
  try {
    const deleteUser = `DELETE FROM presets WHERE presetid='${req.params.presetid}'`;
    await client.query(deleteUser);
    res
      .status(201)
      .json({ success: `Preset with id #${req.userId} was deleted.` });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
