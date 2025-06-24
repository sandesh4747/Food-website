import nodemailer from "nodemailer";

// Create and export a reusable Ethereal transporter
export const createEtherealTransporter = async () => {
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

// Send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = await createEtherealTransporter();

  const message = {
    from: '"Sandesh" <no-reply@example.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Your verification code is: <b>${verificationToken}</b></p>`,
  };

  const info = await transporter.sendMail(message);
  console.log(
    "Verification email sent. Preview URL:",
    nodemailer.getTestMessageUrl(info)
  );
};

// Welcome email
export const sendWelcomeEmail = async (email, name) => {
  const transporter = await createEtherealTransporter();

  const message = {
    from: '"Sandesh" <no-reply@example.com>',
    to: email,
    subject: "Welcome!",
    html: `<h1>Welcome, ${name}!</h1><p>Thanks for joining our platform.</p>`,
  };

  const info = await transporter.sendMail(message);
  console.log(
    "Welcome email sent. Preview URL:",
    nodemailer.getTestMessageUrl(info)
  );
};

// Password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const transporter = await createEtherealTransporter();

  const message = {
    from: '"Sandesh" <no-reply@example.com>',
    to: email,
    subject: "Reset your password",
    html: `<p>Click this link to reset your password: <a href="${resetURL}">${resetURL}</a></p>`,
  };

  const info = await transporter.sendMail(message);
  console.log(
    "Password reset email sent. Preview URL:",
    nodemailer.getTestMessageUrl(info)
  );
};

// Password reset success email
export const sendResetSuccessEmail = async (email) => {
  const transporter = await createEtherealTransporter();

  const message = {
    from: '"Sandesh" <no-reply@example.com>',
    to: email,
    subject: "Password Reset Successful",
    html: `<p>Your password has been successfully reset.</p>`,
  };

  const info = await transporter.sendMail(message);
  console.log(
    "Reset success email sent. Preview URL:",
    nodemailer.getTestMessageUrl(info)
  );
};
