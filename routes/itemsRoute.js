const express = require("express");
const ItemModel = require("../models/itemsModel");
const { Category } = require("../models/category")
const router = express.Router();

router.get("/get-all-items", async (req, res) => {
  try {
    const items = await ItemModel.find({}).populate(
      'category',
      'name'
    );
    res.send(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-item", async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    const newitem = new ItemModel(req.body)
    await newitem.save()
    res.send('Item added successfully')
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/edit-item", async (req, res) => {
  try {
    await ItemModel.findOneAndUpdate({_id : req.body.itemId} , req.body)
    res.send('Item updated successfully')
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/delete-item", async (req, res) => {
  try {
    await ItemModel.findOneAndDelete({_id : req.body.itemId})
    res.send('Item deleted successfully')
  } catch (error) {
    res.status(400).json(error);
  }
});







module.exports = router
