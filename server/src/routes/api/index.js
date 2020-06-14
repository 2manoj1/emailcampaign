import { Router } from "express";
import campaign from "./campaign";

const router = Router();

router.use("/campaign", campaign);

export default router;
