import cron from "node-cron";
import { getEmailsByDate } from "../controller/campaign";
import sendMsg from "../mail-service/sendgrid";

export const sendMails = async () => {
  const todayDate = new Date();
  const data = await getEmailsByDate(todayDate);
  const emailsPromises = data.map(async ({ recipients, emails }) => {
    const receipents = recipients.map((d) => ({
      email: d.emailID,
      name: d.name,
    }));
    const { subject, body } = emails;
    const msgDetails = {
      to: receipents,
      from: "manojmukherjee777@gmail.com",
      subject,
      text: body,
    };
    return sendMsg(msgDetails);
  });
  Promise.all(emailsPromises).catch(console.error);
};

// eslint-disable-next-line prettier/prettier
const sendMailMorningTask = cron.schedule(
  process.env.CRON_MORNING_TASK,
  () => sendMails(),
  { scheduled: true, timezone: "Asia/Kolkata" },
);

export default sendMailMorningTask;
