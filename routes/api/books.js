const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
// get route to "/" will do a findAll on the booksController, which just references the model
  .get(booksController.findAll)
  // when there's a post request to /, do the create function from the controller
  .post(booksController.create);

// Matches with "/api/books/:id" - how???
// /api is set in routes/index.js 
// /books comes from routes/api/index.js - this is based on routes/index.js
router.route("/:id")
// when there's a get request to /:id
// go into bookscontroller an find the book by this id
  .get(booksController.findById)
  // when there's a put request, call the update method from bookscontroller
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
