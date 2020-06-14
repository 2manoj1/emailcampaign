import fs from "fs";
import { parseFile } from "fast-csv";
import Campaign from "../db/models/campaign";

// dayjs.extend(utc);

// eslint-disable-next-line arrow-body-style
const getCsvData = (filePath) => {
  return new Promise((resolve, reject) => {
    const csvData = [];
    parseFile(filePath, {
      ignoreEmpty: "true",
      trim: "true",
      headers: true,
    })
      .transform((data) => ({
        name: data.name,
        emailID: data.emailId,
      }))
      .on("data", (data) => {
        // push row by row data in array
        csvData.push(data);
      })
      .on("error", (err) => reject(err))
      .on("end", () => {
        // Remove temp csv file
        fs.unlinkSync(filePath);
        resolve(csvData);
      });
  });
};

// Insert data to mongodb
const insertCampaignData = async (filePath, body) => {
  try {
    const recipients = await getCsvData(filePath);
    const { name, emaildata } = body;
    const emails = JSON.parse(emaildata);
    const campaign = new Campaign({
      name,
      recipients,
      emails,
    });
    return campaign.save();
  } catch (err) {
    return err;
  }
};

// Find data by date
export const getEmailsByDate = async (
  startDate = new Date(),
  endDate = new Date(),
) => {
  try {
    endDate.setDate(endDate.getUTCDate() + 1);
    endDate.setUTCHours(0, 0, 0, 0);
    startDate.setUTCHours(0, 0, 0, 0);
    const data = await Campaign.aggregate([
      {
        $unwind: {
          path: "$emails",
        },
      },
      {
        $match: {
          "emails.dateToSend": {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
    ]);
    return data;
  } catch (err) {
    return err;
  }
};

// API - campaign post handler
const handleCrateCampaign = async (req, res, next) => {
  try {
    await insertCampaignData(req.file.path, req.body);
    res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

export default handleCrateCampaign;
