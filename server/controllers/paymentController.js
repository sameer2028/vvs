import Payment from '../models/Payment.js';
import Registration from '../models/Registration.js';

// @desc    Submit payment proof
// @route   POST /api/payments
// @access  Public
export const submitPayment = async (req, res) => {
  try {
    const { registrationId, amount, transactionId, screenshotUrl } = req.body;

    // Check if registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if payment already exists for this registration
    const existingPayment = await Payment.findOne({ registrationId });
    if (existingPayment) {
      return res.status(400).json({ message: 'Payment already submitted for this registration' });
    }

    // Check if transaction ID is already used
    const existingTxn = await Payment.findOne({ transactionId });
    if (existingTxn) {
      return res.status(400).json({ message: 'Transaction ID already used' });
    }

    const payment = new Payment({
      registrationId,
      amount,
      transactionId,
      screenshotUrl
    });

    const savedPayment = await payment.save();

    // Update registration status
    registration.status = 'payment_pending';
    await registration.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Server error during payment submission' });
  }
};

// @desc    Get payment by registration ID
// @route   GET /api/payments/:registrationId
// @access  Public
export const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ registrationId: req.params.registrationId });
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching payment status' });
  }
};
