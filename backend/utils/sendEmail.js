import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "Gmail", // e.g., 'Gmail', 'SendGrid', 'Mailgun'
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USERNAME}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send email");
  }
};
