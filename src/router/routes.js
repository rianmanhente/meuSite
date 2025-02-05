const { Router } = require("express");
const router = Router();
const CartController = require("../controllers/CartController")
const ProductController = require("../controllers/ProductController");
// const UserController = require("../controllers/UserController");

//authentication 


router.post("/product", ProductController.create);
router.get("/product/:id", ProductController.show); 
router.get("/product", ProductController.index); 
router.put("/product/:id", ProductController.update);
router.delete("/product/:id", ProductController.destroy);

router.post("/cart", CartController.create);  
router.get("/cart/:id", CartController.show); 
router.get("/cart", CartController.index); 
router.put("/cart/:id", CartController.update);
router.delete("/cart/:id", CartController.destroy);


module.exports = router;