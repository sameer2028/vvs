import Registration from '../models/Registration.js';
import Committee from '../models/Committee.js';
import Portfolio from '../models/Portfolio.js';
import Payment from '../models/Payment.js';
import bcrypt from 'bcryptjs';

// @desc    Register a new delegate
// @route   POST /api/registrations
// @access  Public
export const createRegistration = async (req, res) => {
  try {
    const {
      email, password, fullName, phone, institution, classYear, studentIdUrl,
      committeePref1, committeePref2,
      portfolioPref1Comm1, portfolioPref2Comm1,
      portfolioPref1Comm2, portfolioPref2Comm2,
      munExperience, referralCode, marketingSource, needsAccommodation,
      transactionId, screenshotUrl, amount
    } = req.body;

    // Check if email already registered
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    if (!transactionId || !screenshotUrl) {
      return res.status(400).json({ message: 'Payment Transaction ID and Screenshot are required' });
    }

    // Generate unique Registration ID (e.g. VVS26-A1B2C)
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    const registrationId = `VVS26-${randomStr}`;

    // Hash the custom password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRegistration = new Registration({
      registrationId,
      email, password: hashedPassword, fullName, phone, institution, classYear, studentIdUrl,
      committeePref1, committeePref2,
      portfolioPref1Comm1, portfolioPref2Comm1,
      portfolioPref1Comm2, portfolioPref2Comm2,
      munExperience, referralCode, marketingSource, needsAccommodation
    });

    const savedRegistration = await newRegistration.save();

    try {
      const newPayment = new Payment({
        registration: savedRegistration._id,
        amount: amount || 1500,
        transactionId,
        screenshotUrl,
        status: 'pending'
      });
      await newPayment.save();
    } catch (paymentError) {
      await Registration.findByIdAndDelete(savedRegistration._id);
      console.error('Payment creation error:', paymentError);
      return res.status(500).json({ message: 'Failed to process payment details', error: paymentError.message });
    }

    res.status(201).json({
      message: 'Registration submitted successfully',
      registrationId: savedRegistration.registrationId,
      id: savedRegistration._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Get registration status
// @route   GET /api/registrations/:id
// @access  Public
export const getRegistrationStatus = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('committeePref1', 'name')
      .populate('committeePref2', 'name');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({
      registrationId: registration.registrationId,
      fullName: registration.fullName,
      status: registration.status,
      committees: {
        pref1: registration.committeePref1?.name,
        pref2: registration.committeePref2?.name
      }
    });
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({ message: 'Server error fetching registration status' });
  }
};
