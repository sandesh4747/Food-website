import nodemailer from "nodemailer";

// Dynamically create Ethereal test account transporter
const createEtherealTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendEmail = async (options) => {
  try {
    const transporter = await createEtherealTransporter();

    const info = await transporter.sendMail({
      from: `"Your App Name" <no-reply@example.com>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });

    console.log(
      "📧 Email sent. Preview it at:",
      nodemailer.getTestMessageUrl(info)
    );
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send email");
  }
};
