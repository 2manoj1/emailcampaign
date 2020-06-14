import { Router } from "express";
import multer from "multer";
import handleCrateCampaign from "../../controller/campaign";

const router = Router();
const uploadFile = multer({ dest: "tmp/csv/" });

router.get("/", (req, res) => {
  // eslint-disable-next-line no-console
  console.log("all campaign");
  res.send("hello");
});

router.post("/", uploadFile.single("recipientsfile"), handleCrateCampaign);

export default router;
