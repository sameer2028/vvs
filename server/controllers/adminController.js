import Registration from '../models/Registration.js';
import Payment from '../models/Payment.js';
import Committee from '../models/Committee.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    const verifiedPayments = await Payment.countDocuments({ status: 'verified' });
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });
    const totalCommittees = await Committee.countDocuments();

    const recentRegistrations = await Registration.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName registrationId institution status createdAt');

    res.json({
      totalRegistrations,
      verifiedPayments,
      pendingPayments,
      totalCommittees,
      recentRegistrations
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching dashboard stats' });
  }
};

// @desc    Get all registrations
// @route   GET /api/admin/registrations
// @access  Private/Admin
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ createdAt: -1 })
      .populate('committeePref1', 'name')
      .populate('committeePref2', 'name');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching registrations' });
  }
};

// @desc    Get pending payments
// @route   GET /api/admin/payments/pending
// @access  Private/Admin
export const getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: 'pending' })
      .populate('registrationId', 'fullName registrationId email phone')
      .sort({ createdAt: 1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching pending payments' });
  }
};

// @desc    Verify or reject a payment
// @route   PUT /api/admin/payments/:id/verify
// @access  Private/Admin
export const verifyPayment = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    
    if (status !== 'verified' && status !== 'rejected') {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = status;
    payment.verifiedBy = req.user._id; // Requires protect middleware to set req.user
    payment.verifiedAt = Date.now();
    if (status === 'rejected') {
      payment.rejectionReason = rejectionReason;
    }

    await payment.save();

    // Update registration status
    const registration = await Registration.findById(payment.registrationId);
    if (registration) {
      registration.status = status === 'verified' ? 'payment_verified' : 'payment_rejected';
      await registration.save();
    }

    res.json({ message: `Payment ${status}`, payment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error verifying payment' });
  }
};
