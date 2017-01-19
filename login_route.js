const express = require("express");
const router = express.Router();
const model = require("./../module/controller");


router.post("/registration",model.registration);
router.get("/getdata", model.getAll);
router.post("/insert", model.create);
router.put("/update", model.update);
router.delete("/delete", model.remove);

module.exports = router;