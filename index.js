const express = require("express");
const mongoose = require('mongoose')
const app = express();

require("dotenv").config();

app.use(express.json());

const connectDB = require("./connectMongo");

connectDB();
// Contact Schema and Model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  });
  
  const Contact = mongoose.model("Contact", contactSchema);

//CREATE
app.post("/contacts", async (req, res) => {
    try {
      const contact = new Contact(req.body);
      const savedContact = await contact.save();
      res.status(201).json(savedContact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  // READ
app.get("/contacts", async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // UPDATE
app.put("/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedContact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE
  app.delete("/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.json({ message: "Contact deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});