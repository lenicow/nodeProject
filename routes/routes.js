import express from "express";
import HomeController from "../controllers/home";
import { loginPost, loginGet, register } from "../controllers/login";
import { dashboardGet } from "../controllers/dashboard";

const router = express.Router();

router.get("/", HomeController);
router.get("/login", loginGet);
router.get("/dashboard", dashboardGet);

router.post("/login", loginPost);
router.post("/register", register);

export default router;
