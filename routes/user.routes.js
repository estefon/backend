import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserprofile, followUnfollowUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",protectRoute, getUserprofile);
//router.get("/suggested/",protectRoute ,getUserProfile);
router.get("/follow/:id",protectRoute ,followUnfollowUser);
//router.get("/update/", protectRoute ,updateUserProfile);

export default router;