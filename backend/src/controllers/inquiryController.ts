import { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';
import { sendEmail } from '../utils/emailService';

/**
 * @desc    Submit a new inquiry from the contact form
 * @route   POST /api/inquiries
 * @access  Public
 */
export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, inquiryType, message } = req.body;

    // 1. Validate request
    if (!name || !email || !inquiryType || !message) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // 2. Save inquiry to the database
    const inquiry = await Inquiry.create({
      name,
      email,
      inquiryType,
      message,
    });

    // 3. Send notification email to the admin
    const adminEmail = process.env.SMTP_USER as string; // E.g., jean@ridlab.xyz
    const emailSubject = `New RID Lab Inquiry: ${inquiryType}`;
    const emailHtml = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // We don't await this so it doesn't block the API response to the user
    sendEmail(adminEmail, emailSubject, emailHtml);

    // 4. Send response to frontend
    res.status(201).json({
      message: 'Inquiry submitted successfully.',
      data: inquiry,
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ message: 'Server error while submitting inquiry.' });
  }
};