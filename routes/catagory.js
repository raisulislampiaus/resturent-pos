const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList);
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({ message: 'The category with the given ID was not found.' })
    }
    res.status(200).send(category);
})



router.post('/', async (req, res) => {
    // let category = new Category({
    //     name: req.body.name
    // })
    // category = await category.save();

    // if(!category)
    // return res.status(400).send('the category cannot be created!')

    // res.send(category);
    try {
        let category = new Category({
            name: req.body.name
        })
        await category.save();


        res.send(category);
    } catch (error) {
        res.status(400).json(error);
    }
})


router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        { new: true }
    )

    if (!category)
        return res.status(400).send('the category cannot be created!')

    res.send(category);
})

// router.delete('/:id', (req, res) => {
//     Category.findByIdAndRemove(req.params.id).then(category => {
//         if (category) {
//             return res.status(200).json({ success: true, message: 'the category is deleted!' })
//         } else {
//             return res.status(404).json({ success: false, message: "category not found!" })
//         }
//     }).catch(err => {
//         return res.status(500).json({ success: false, error: err })
//     })
// })

router.delete("/:id", async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        await category.remove();
        res.json({ message: "Category removed" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;