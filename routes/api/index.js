const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
// /books is the routes from bookRoutes? 
router.use("/books", bookRoutes);

module.exports = router;
