import Registration from '../models/Registration.js';
import Payment from '../models/Payment.js';
import Committee from '../models/Committee.js';
import AnalyticsLog from '../models/Analytics.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalRegistrations,
      verifiedPayments,
      pendingPayments,
      totalCommittees,
      totalPageViews,
      uniqueVisitorsArr,
      todayPageViews,
      topPages
    ] = await Promise.all([
      Registration.countDocuments(),
      Payment.countDocuments({ status: 'verified' }),
      Payment.countDocuments({ status: 'pending' }),
      Committee.countDocuments(),
      AnalyticsLog.countDocuments(),
      AnalyticsLog.distinct('visitorId'),
      AnalyticsLog.countDocuments({ createdAt: { $gte: startOfToday } }),
      AnalyticsLog.aggregate([
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        { $project: { _id: 0, path: '$_id', count: 1 } }
      ])
    ]);

    const recentRegistrations = await Registration.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName registrationId institution status createdAt');

    res.json({
      totalRegistrations,
      verifiedPayments,
      pendingPayments,
      totalCommittees,
      totalPageViews,
      uniqueVisitors: uniqueVisitorsArr.length,
      todayPageViews,
      topPages,
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
