const router = require("express").Router();

const { authMiddleware } = require("../middlewares/auth.middleware");

const { roleMiddleware } = require("../middlewares/role.middleware");

router.delete("user/:id",authMiddleware ,roleMiddleware('admin'))  // user id in token is admin , id in route is the user we want to delete

router.get("")