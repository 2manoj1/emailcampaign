import { Schema, model } from "mongoose";

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 150,
  },
  recipients: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
      },
      emailID: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
    },
  ],
  emails: [
    {
      dateToSend: {
        type: Date,
        default: Date.now,
      },
      subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
      },
      body: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const Campaign = model("campaign", campaignSchema);
export default Campaign;
