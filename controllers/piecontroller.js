

const router = require("express").Router()
const { PieModel } = require("../models");
const {validateSession} = require('../middleware');
// router.get("/", (req, res) => {
//     res.send("Main Route Hit!")
// })

router.get("/", async (req, res) =>{
    try {
        const allPies = await PieModel.findAll();
        res.status(200).json(allPies);
    } catch(err) {
        res.status(500).json({
            error: err,
        })
    }
})

router.post("/", validateSession, async (req, res) => {
const {
    nameOfPie,
    baseOfPie,
    crust,
    timeToBake,
    servings,
    rating,
} = req.body;

try{
    const Pie = await PieModel.create({
        nameOfPie,
        baseOfPie,
        crust,
        timeToBake,
        servings,
        rating,  
    });
    res.status(201).json({
        message: "Pie successfully created",
        Pie,
    });
} catch(err) {
    res.status(500).json({
        message: `Failed to create pie: ${err}`
    })
}
})

// findOne()
router.get("/:name", async (req, res) => {
    try {
      const locatedPie = await PieModel.findOne({
        where: {
          nameOfPie: req.params.name
        }
      });
      res.status(200).json({
        message: "Pies successfully retrieved",
        locatedPie,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve pies: ${err}`,
      });
    }
  });


  // update()
  router.put("/:id", async (req, res) => {
    const {
      nameOfPie,
      baseOfPie,
      crust,
      timeToBake,
      servings,
      rating,
    } = req.body;

    try {
     await PieModel.update(
        { nameOfPie, baseOfPie, crust, timeToBake, servings, rating },
        { where: { id: req.params.id }, returning: true }
      ).then((result) => {
        res.status(200).json({
          message: "Pie successfully updated",
          updatedPie: result,
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to update pie: ${err}`,
      });
    }
  });
  //Delete
  router.delete("/:id", async(req, res) =>{
    // const pieId = req.params.id;

    try{
      await PieModel.destroy(
        { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
          res.status(200).json({
            message: "Pie destroyed",
            deletedPie: result,
          });
        });
    } catch (err) {
      res.status(500).json({
        message: `Failed to delete pie: ${err}`,
      });
    }
  })
module.exports = router