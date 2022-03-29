const { Router } = require("express");
const { isAuthenticated, hasRole } = require("../../auth/auth.services");
const {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
} = require("./session.controller");

const router = Router();

//CRUD
router.get("/", isAuthenticated(), getAllSessions);
router.get("/:id", isAuthenticated(), getSessionById);
// router.post('/', hasRole(['Developer', 'Admin']), createBusinessObject)
router.post("/", isAuthenticated(), createSession);
router.put("/:id", updateSession);
router.delete("/:id", hasRole("Developer"), deleteSession);

module.exports = router;
