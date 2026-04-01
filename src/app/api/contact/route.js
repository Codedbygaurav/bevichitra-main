import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { service, message, name, email, availability, contactMethod } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Request from ${name}`,
      html: `

      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>New Contact Submission</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>

    <p><b>Selected Services:</b></p>
  <ul>
  ${service?.map((item) => `<li>${item}</li>`).join("")}
  </ul>

<p><b>Project Details:</b></p>
<p>${message}</p>

<p><b>Contact Preference:</b></p>
<p>
  ${
    contactMethod === "calendly"
      ? "User has already scheduled a call on Calendly."
      : "User wants us to reach out manually."
  }
</p>

${
  contactMethod === "manual"
    ? `
      <p><b>Preferred Time:</b></p>
      <p>${availability || "Not provided"}</p>
    `
    : ""
}

  </div>
`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
