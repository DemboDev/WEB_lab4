const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /equipment
app.get("/equipment", async (req, res) => {
  try {
    const items = await db.getAllEquipment();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

// GET /equipment/:id
app.get("/equipment/:id", async (req, res) => {
  try {
    const item = await db.getEquipmentById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Оборудование не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

// POST /equipment
app.post("/equipment", async (req, res) => {
  try {
    const newItem = await db.createEquipment(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

// PUT /equipment/:id
app.put("/equipment/:id", async (req, res) => {
  try {
    const updatedItem = await db.updateEquipment(req.params.id, req.body);
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Оборудование не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

// DELETE /equipment/:id
app.delete("/equipment/:id", async (req, res) => {
  try {
    const deletedItem = await db.deleteEquipment(req.params.id);
    if (deletedItem) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Оборудование не найдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
