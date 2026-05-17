import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService, billingService } from '../services/api';
import LANGUAGES, { getTargetLangName, getNativeLangName, getTargetLangCode, getNativeLangCode, getTargetField, getNativeField } from '../config/languages';
import AdminSpeakingDemo from './AdminSpeakingDemo';
import './AdminDashboard.css';

// Country code → flag emoji
function countryFlag(code) {
  if (!code || code.length !== 2) return '🌍';
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map(c => 0x1F1E0 + c.charCodeAt(0) - 65)
  );
}

function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState({
    overview: {
      totalUsers: 0, activeUsers: 0, suspendedUsers: 0, adminCount: 0,
      totalLessons: 0, totalFlashcards: 0, totalProgress: 0, totalLogins: 0,
      challengeModeUsers: 0, relaxedModeUsers: 0,
      totalContactMessages: 0, openContactMessages: 0,
    },
    activity: { activeUsersToday: 0, activeUsersThisWeek: 0, avgTimeSpent: 0, newUsersLastWeek: 0, newUsersLastMonth: 0 },
    userGrowth: [],
    recentActiveUsers: [],
  });
  const [users, setUsers] = useState([]);
  const [userFlashcards, setUserFlashcards] = useState([]);
  const [guests, setGuests] = useState({
    sessions: [], total: 0, page: 1, totalPages: 1,
    stats: {
      todayCount: 0, weekCount: 0, uniqueCountries: 0, topLanguagePairs: [],
      conversions: 0, conversionRate: 0,
      avgTimeSpent: 0, avgCardsStudied: 0,
      totalCardsStudied: 0, totalAudioPlays: 0, totalLessonsViewed: 0,
      engagedSessions: 0, deviceBreakdown: [],
    },
  });
  const [errorReports, setErrorReports] = useState({
    reports: [], total: 0, page: 1, totalPages: 1, openCount: 0, criticalOpenCount: 0,
  });
  const [contactMessages, setContactMessages] = useState({
    messages: [], total: 0, page: 1, totalPages: 1, openCount: 0, registeredCount: 0, guestCount: 0, senderType: 'all',
  });
  const [billingAdmin, setBillingAdmin] = useState({
    counts: { activeIndividual: 0, activeInstitutional: 0, openInstitutionLeads: 0 },
    subscriptions: [],
    organizations: [],
    leads: [],
    recentEvents: [],
    plans: { individual: [], institutional: [] },
    planOverrides: [],
    discounts: [],
  });
  const [billingLoading, setBillingLoading] = useState(false);
  const [selectedPricingPlanId, setSelectedPricingPlanId] = useState('plus');
  const [planOverrideForm, setPlanOverrideForm] = useState({
    active: true,
    name: '',
    tagline: '',
    monthlyPrice: '',
    annualPrice: '',
    seatPriceMonthly: '',
    seatPriceAnnual: '',
    minimumSeats: '',
    stripeMonthlyPriceId: '',
    stripeAnnualPriceId: '',
    notes: '',
  });
  const [discountForm, setDiscountForm] = useState({
    applicationMode: 'code',
    code: '',
    active: true,
    description: '',
    discountType: 'percent',
    percentOff: '20',
    amountOff: '',
    appliesToAudience: 'all',
    appliesToPlanIds: [],
    startsAt: '',
    expiresAt: '',
    maxRedemptions: '',
    stripePromotionCodeId: '',
    stripeCouponId: '',
    notes: '',
  });
  const [manualPlanForm, setManualPlanForm] = useState({
    userIdOrEmail: '',
    planId: 'pro',
    status: 'active',
    reason: '',
    expiresAt: '',
  });
  const [organizationForm, setOrganizationForm] = useState({
    name: '',
    type: 'school',
    planId: 'institution_pro',
    seatsPurchased: 25,
    billingEmail: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [guestsLoading, setGuestsLoading] = useState(false);
  const [errorReportsLoading, setErrorReportsLoading] = useState(false);
  const [errorReportsClearing, setErrorReportsClearing] = useState(false);
  const [contactMessagesLoading, setContactMessagesLoading] = useState(false);
  const [contactMessagesClearing, setContactMessagesClearing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [contactSenderFilter, setContactSenderFilter] = useState('all');
  const [suspendModal, setSuspendModal] = useState({ show: false, user: null, reason: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchGuests = useCallback(async (page = 1) => {
    try {
      setGuestsLoading(true);
      const res = await adminService.getGuests(page);
      setGuests(res.data);
    } catch (err) {
      console.error('Guests fetch error:', err);
    } finally {
      setGuestsLoading(false);
    }
  }, []);

  const fetchErrorReports = useCallback(async (page = 1) => {
    try {
      setErrorReportsLoading(true);
      const res = await adminService.getErrorReports({ page, status: 'open' });
      setErrorReports(res.data);
    } catch (err) {
      console.error('Failure reports fetch error:', err);
    } finally {
      setErrorReportsLoading(false);
    }
  }, []);

  const fetchContactMessages = useCallback(async (page = 1) => {
    try {
      setContactMessagesLoading(true);
      const res = await adminService.getContactMessages({ page, status: 'open', senderType: contactSenderFilter });
      setContactMessages(res.data);
    } catch (err) {
      console.error('Contact messages fetch error:', err);
    } finally {
      setContactMessagesLoading(false);
    }
  }, [contactSenderFilter]);

  const fetchBillingAdmin = useCallback(async () => {
    try {
      setBillingLoading(true);
      const res = await billingService.getAdminOverview();
      setBillingAdmin({
        counts: res.data?.counts || { activeIndividual: 0, activeInstitutional: 0, openInstitutionLeads: 0 },
        subscriptions: res.data?.subscriptions || [],
        organizations: res.data?.organizations || [],
        leads: res.data?.leads || [],
        recentEvents: res.data?.recentEvents || [],
        plans: res.data?.plans || { individual: [], institutional: [] },
        planOverrides: res.data?.planOverrides || [],
        discounts: res.data?.discounts || [],
      });
    } catch (err) {
      console.error('Billing admin fetch error:', err);
    } finally {
      setBillingLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'guests') fetchGuests(1);
    if (activeTab === 'failures') fetchErrorReports(1);
    if (activeTab === 'messages') fetchContactMessages(1);
    if (activeTab === 'billing') fetchBillingAdmin();
  }, [activeTab, fetchGuests, fetchErrorReports, fetchContactMessages, fetchBillingAdmin]);

  const billingPlans = [
    ...(billingAdmin.plans?.individual || []),
    ...(billingAdmin.plans?.institutional || []),
  ];

  const selectedPricingPlan = billingPlans.find((plan) => plan.id === selectedPricingPlanId) || billingPlans[0] || null;

  const centsToPriceInput = (cents) => (
    cents === undefined || cents === null || cents === '' ? '' : (Number(cents) / 100).toFixed(2)
  );

  const priceInputToCents = (value) => {
    if (value === undefined || value === null || String(value).trim() === '') return null;
    const amount = Number(value);
    return Number.isFinite(amount) ? Math.max(Math.round(amount * 100), 0) : null;
  };

  const formatAdminPrice = (cents) => {
    if (cents === undefined || cents === null) return t('adminBilling.customPrice');
    const value = Number(cents) / 100;
    return new Intl.NumberFormat(i18n.resolvedLanguage || i18n.language || 'en', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: Number(cents) % 100 === 0 ? 0 : 2,
    }).format(value);
  };

  const adminPlanName = (planOrId) => {
    const planId = typeof planOrId === 'string' ? planOrId : planOrId?.id;
    const fallback = typeof planOrId === 'string' ? planOrId : planOrId?.name || planId;
    return t(`pricing.planNames.${planId}`, fallback);
  };

  const adminAudienceLabel = (audience) => t(`adminBilling.audiences.${audience}`, audience);
  const adminStatusLabel = (status) => t(`adminBilling.statuses.${status}`, status);
  const adminOrgTypeLabel = (type) => t(`pricing.organizationTypes.${type}`, type);
  const adminLeadStatusLabel = (status) => t(`adminBilling.leadStatuses.${status}`, status);
  const formatAdminDate = (value) => {
    if (!value) return t('profilePage.unknown');
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return t('profilePage.unknown');
    return date.toLocaleDateString(i18n.resolvedLanguage || i18n.language || undefined);
  };

  useEffect(() => {
    if (!selectedPricingPlan) return;
    const override = (billingAdmin.planOverrides || []).find((entry) => entry.planId === selectedPricingPlan.id);
    setPlanOverrideForm({
      active: override?.active !== false,
      name: override?.name || '',
      tagline: override?.tagline || '',
      monthlyPrice: centsToPriceInput(override?.monthlyPriceCents),
      annualPrice: centsToPriceInput(override?.annualPriceCents),
      seatPriceMonthly: centsToPriceInput(override?.seatPriceMonthlyCents),
      seatPriceAnnual: centsToPriceInput(override?.seatPriceAnnualCents),
      minimumSeats: override?.minimumSeats || '',
      stripeMonthlyPriceId: override?.stripeMonthlyPriceId || '',
      stripeAnnualPriceId: override?.stripeAnnualPriceId || '',
      notes: override?.notes || '',
    });
  }, [selectedPricingPlanId, billingAdmin.planOverrides, billingAdmin.plans, selectedPricingPlan]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse, flashcardsResponse] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getUserFlashcards(),
      ]);
      const data = statsResponse.data || {};
      setStats(prev => ({
        overview: { ...prev.overview, ...(data.overview || {}) },
        activity: { ...prev.activity, ...(data.activity || {}) },
        userGrowth: data.userGrowth || [],
        recentActiveUsers: data.recentActiveUsers || [],
      }));
      setUsers(usersResponse.data || []);
      setUserFlashcards(flashcardsResponse.data || []);
      // Pre-populate guest total from stats so the tab label is correct before the tab is clicked
      const guestTotal = data.overview?.totalGuestSessions;
      if (typeof guestTotal === 'number') {
        setGuests(prev => ({ ...prev, total: guestTotal }));
      }
      if (typeof data.overview?.openErrorReports === 'number') {
        setErrorReports(prev => ({
          ...prev,
          openCount: data.overview.openErrorReports,
          total: data.overview.totalErrorReports || prev.total,
        }));
      }
      if (typeof data.overview?.openContactMessages === 'number') {
        setContactMessages(prev => ({
          ...prev,
          openCount: data.overview.openContactMessages,
          total: data.overview.totalContactMessages || prev.total,
        }));
      }
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(`Error: ${errorMsg}. Try logging out and back in.`);
    } finally {
      setLoading(false);
    }
  };

  const openUserDetail = async (user) => {
    setSelectedUser(user);
    setUserDetail(null);
    setDetailLoading(true);
    try {
      const res = await adminService.getUser(user._id);
      setUserDetail(res.data);
    } catch (err) {
      console.error('User detail error:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeUserDetail = () => { setSelectedUser(null); setUserDetail(null); };
  const closeGuestDetail = () => setSelectedGuest(null);

  const acknowledgeErrorReport = async (reportId) => {
    try {
      await adminService.acknowledgeErrorReport(reportId);
      setErrorReports(prev => ({
        ...prev,
        reports: prev.reports.filter(report => report._id !== reportId),
        openCount: Math.max((prev.openCount || 1) - 1, 0),
      }));
      showSuccess('Failure acknowledged');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to acknowledge failure');
    }
  };

  const clearOpenErrorReports = async () => {
    const openCount = errorReports.openCount || 0;
    if (openCount <= 0) return;

    const confirmed = window.confirm(
      `Clear all ${openCount} open user-side failure${openCount === 1 ? '' : 's'}? This acknowledges them and removes them from the open queue.`
    );
    if (!confirmed) return;

    try {
      setErrorReportsClearing(true);
      const res = await adminService.clearOpenErrorReports();
      const acknowledgedCount = res.data?.acknowledgedCount ?? openCount;
      setErrorReports(prev => ({
        ...prev,
        reports: [],
        total: 0,
        page: 1,
        totalPages: 1,
        openCount: 0,
        criticalOpenCount: 0,
      }));
      showSuccess(`${acknowledgedCount} failure${acknowledgedCount === 1 ? '' : 's'} cleared`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear failures');
    } finally {
      setErrorReportsClearing(false);
    }
  };

  const errorReportUserLabel = (report) => {
    const user = report.userId || {};
    const snapshot = report.userSnapshot || {};
    return user.username || snapshot.username || report.reportedUserId || report.deviceId || 'Unknown user';
  };

  const acknowledgeContactMessage = async (messageId) => {
    try {
      await adminService.acknowledgeContactMessage(messageId);
      const acknowledgedMessage = contactMessages.messages.find(message => message._id === messageId);
      const acknowledgedGuest = acknowledgedMessage?.session?.isGuest === true;
      setContactMessages(prev => ({
        ...prev,
        messages: prev.messages.filter(message => message._id !== messageId),
        total: Math.max((prev.total || 1) - 1, 0),
        openCount: Math.max((prev.openCount || 1) - 1, 0),
        guestCount: acknowledgedGuest ? Math.max((prev.guestCount || 1) - 1, 0) : prev.guestCount,
        registeredCount: acknowledgedGuest ? prev.registeredCount : Math.max((prev.registeredCount || 1) - 1, 0),
      }));
      showSuccess('Message marked as read');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark message as read');
    }
  };

  const clearOpenContactMessages = async () => {
    const openCount = contactMessages.openCount || 0;
    if (openCount <= 0) return;

    const confirmed = window.confirm(
      `Clear all ${openCount} open contact message${openCount === 1 ? '' : 's'}? This marks them as read and removes them from the open queue.`
    );
    if (!confirmed) return;

    try {
      setContactMessagesClearing(true);
      const res = await adminService.clearOpenContactMessages();
      const acknowledgedCount = res.data?.acknowledgedCount ?? openCount;
      setContactMessages(prev => ({
        ...prev,
        messages: [],
        total: 0,
        page: 1,
        totalPages: 1,
        openCount: 0,
        registeredCount: 0,
        guestCount: 0,
      }));
      showSuccess(`${acknowledgedCount} message${acknowledgedCount === 1 ? '' : 's'} cleared`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear messages');
    } finally {
      setContactMessagesClearing(false);
    }
  };

  const handleManualPlanSubmit = async (event) => {
    event.preventDefault();
    try {
      await billingService.assignManualPlan({
        ...manualPlanForm,
        expiresAt: manualPlanForm.expiresAt || null,
      });
      setManualPlanForm({
        userIdOrEmail: '',
        planId: 'pro',
        status: 'active',
        reason: '',
        expiresAt: '',
      });
      showSuccess(t('adminBilling.planAccessUpdated'));
      fetchBillingAdmin();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || t('adminBilling.planAccessUpdateFailed'));
    }
  };

  const handleOrganizationSubmit = async (event) => {
    event.preventDefault();
    try {
      await billingService.createOrganization({
        ...organizationForm,
        seatsPurchased: Number(organizationForm.seatsPurchased) || 1,
      });
      setOrganizationForm({
        name: '',
        type: 'school',
        planId: 'institution_pro',
        seatsPurchased: 25,
        billingEmail: '',
        notes: '',
      });
      showSuccess(t('adminBilling.organizationCreated'));
      fetchBillingAdmin();
    } catch (err) {
      setError(err.response?.data?.message || t('adminBilling.organizationCreateFailed'));
    }
  };

  const handlePlanOverrideSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPricingPlan) return;
    try {
      await billingService.updatePlanOverride(selectedPricingPlan.id, {
        active: planOverrideForm.active,
        name: planOverrideForm.name,
        tagline: planOverrideForm.tagline,
        monthlyPriceCents: selectedPricingPlan.audience === 'individual' ? priceInputToCents(planOverrideForm.monthlyPrice) : null,
        annualPriceCents: selectedPricingPlan.audience === 'individual' ? priceInputToCents(planOverrideForm.annualPrice) : null,
        seatPriceMonthlyCents: selectedPricingPlan.audience === 'institution' ? priceInputToCents(planOverrideForm.seatPriceMonthly) : null,
        seatPriceAnnualCents: selectedPricingPlan.audience === 'institution' ? priceInputToCents(planOverrideForm.seatPriceAnnual) : null,
        minimumSeats: selectedPricingPlan.audience === 'institution' ? planOverrideForm.minimumSeats : null,
        stripeMonthlyPriceId: selectedPricingPlan.audience === 'individual' ? planOverrideForm.stripeMonthlyPriceId : '',
        stripeAnnualPriceId: selectedPricingPlan.audience === 'individual' ? planOverrideForm.stripeAnnualPriceId : '',
        notes: planOverrideForm.notes,
      });
      showSuccess(t('adminBilling.planPricingUpdated'));
      fetchBillingAdmin();
    } catch (err) {
      setError(err.response?.data?.message || t('adminBilling.planPricingUpdateFailed'));
    }
  };

  const resetDiscountForm = () => {
    setDiscountForm({
      applicationMode: 'code',
      code: '',
      active: true,
      description: '',
      discountType: 'percent',
      percentOff: '20',
      amountOff: '',
      appliesToAudience: 'all',
      appliesToPlanIds: [],
      startsAt: '',
      expiresAt: '',
      maxRedemptions: '',
      stripePromotionCodeId: '',
      stripeCouponId: '',
      notes: '',
    });
  };

  const handleDiscountSubmit = async (event) => {
    event.preventDefault();
    try {
      await billingService.createDiscount({
        ...discountForm,
        code: discountForm.code.toUpperCase(),
        percentOff: discountForm.discountType === 'percent' ? Number(discountForm.percentOff) || 1 : null,
        amountOffCents: discountForm.discountType === 'fixed' ? priceInputToCents(discountForm.amountOff) : null,
        startsAt: discountForm.startsAt || null,
        expiresAt: discountForm.expiresAt || null,
        maxRedemptions: discountForm.maxRedemptions || null,
      });
      resetDiscountForm();
      showSuccess(t('adminBilling.discountCreated'));
      fetchBillingAdmin();
    } catch (err) {
      setError(err.response?.data?.message || t('adminBilling.discountCreateFailed'));
    }
  };

  const toggleDiscountActive = async (discount) => {
    try {
      await billingService.updateDiscount(discount._id, {
        ...discount,
        active: !discount.active,
        startsAt: discount.startsAt || null,
        expiresAt: discount.expiresAt || null,
      });
      showSuccess(discount.active ? t('adminBilling.discountPaused') : t('adminBilling.discountEnabled'));
      fetchBillingAdmin();
    } catch (err) {
      setError(err.response?.data?.message || t('adminBilling.discountUpdateFailed'));
    }
  };

  const updateLeadStatus = async (leadId, status) => {
    try {
      await billingService.updateInstitutionalLeadStatus(leadId, status);
      showSuccess(t('adminBilling.institutionRequestUpdated'));
      fetchBillingAdmin();
    } catch (err) {
      setError(err.response?.data?.message || t('adminBilling.institutionRequestUpdateFailed'));
    }
  };

  const contactMessageUserLabel = (message) => {
    const user = message.userId || {};
    const snapshot = message.userSnapshot || {};
    if (message.session?.isGuest) return `${message.name || 'Guest'} (guest user)`;
    return user.username || snapshot.username || message.name || message.email || 'Unknown user';
  };

  // Parse a User-Agent string into human-readable components
  const parseUA = (ua) => {
    if (!ua) return { browser: 'Unknown', os: 'Unknown' };
    const u = ua.toLowerCase();
    let browser = 'Unknown';
    if      (u.includes('edg/') || u.includes('edge/')) browser = 'Edge';
    else if (u.includes('opr/') || u.includes('opera'))  browser = 'Opera';
    else if (u.includes('samsungbrowser'))                browser = 'Samsung Browser';
    else if (u.includes('ucbrowser'))                    browser = 'UC Browser';
    else if (u.includes('firefox'))                      browser = 'Firefox';
    else if (u.includes('chrome'))                       browser = 'Chrome';
    else if (u.includes('safari'))                       browser = 'Safari';
    let os = 'Unknown';
    if      (u.includes('windows nt 10') || u.includes('windows nt 11')) os = 'Windows 10/11';
    else if (u.includes('windows nt 6.3'))  os = 'Windows 8.1';
    else if (u.includes('windows nt 6.1'))  os = 'Windows 7';
    else if (u.includes('windows'))         os = 'Windows';
    else if (u.includes('android')) {
      const m = ua.match(/Android\s+([\d.]+)/i);
      os = m ? `Android ${m[1]}` : 'Android';
    }
    else if (u.includes('iphone')) {
      const m = ua.match(/iPhone OS\s+([\d_]+)/i);
      os = m ? `iOS ${m[1].replace(/_/g, '.')} (iPhone)` : 'iOS (iPhone)';
    }
    else if (u.includes('ipad')) {
      const m = ua.match(/CPU OS\s+([\d_]+)/i);
      os = m ? `iPadOS ${m[1].replace(/_/g, '.')}` : 'iPadOS';
    }
    else if (u.includes('mac os x') || u.includes('macos')) {
      const m = ua.match(/Mac OS X\s+([\d_.]+)/i);
      os = m ? `macOS ${m[1].replace(/_/g, '.')}` : 'macOS';
    }
    else if (u.includes('cros'))  os = 'ChromeOS';
    else if (u.includes('linux')) os = 'Linux';
    return { browser, os };
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSuspendUser = async () => {
    try {
      await adminService.suspendUser(suspendModal.user._id, suspendModal.reason);
      setUsers(users.map(u =>
        u._id === suspendModal.user._id ? { ...u, status: 'suspended', suspendReason: suspendModal.reason } : u
      ));
      setSuspendModal({ show: false, user: null, reason: '' });
      showSuccess(`User ${suspendModal.user.username} has been suspended`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to suspend user');
    }
  };

  const handleUnsuspendUser = async (user) => {
    try {
      await adminService.unsuspendUser(user._id);
      setUsers(users.map(u => u._id === user._id ? { ...u, status: 'active', suspendReason: null } : u));
      showSuccess(`User ${user.username} has been reactivated`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unsuspend user');
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(t('admin.deleteUserConfirm', { username: user.username }))) {
      try {
        await adminService.deleteUser(user._id);
        setUsers(users.filter(u => u._id !== user._id));
        if (selectedUser?._id === user._id) closeUserDetail();
        showSuccess(`User ${user.username} has been deleted`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleDeleteFlashcard = async (flashcard) => {
    if (window.confirm(t('admin.deleteFlashcardConfirm', { word: flashcard[getTargetField()] || flashcard.korean, username: flashcard.userId?.username || 'unknown' }))) {
      try {
        await adminService.deleteFlashcard(flashcard._id);
        setUserFlashcards(userFlashcards.filter(f => f._id !== flashcard._id));
        showSuccess('Flashcard deleted');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete flashcard');
      }
    }
  };

  const handlePromoteToAdmin = async (user) => {
    if (window.confirm(t('admin.promoteConfirm', { username: user.username }))) {
      try {
        await adminService.updateUserRole(user._id, 'admin');
        setUsers(users.map(u => u._id === user._id ? { ...u, role: 'admin' } : u));
        showSuccess(`${user.username} is now an admin`);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update role');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('home.never');
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString(i18n.language, {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const formatMode = (xpDecayEnabled) =>
    xpDecayEnabled
      ? <span className="mode-badge challenge">🔥 {t('admin.challenge')}</span>
      : <span className="mode-badge relaxed">😊 {t('admin.relaxed')}</span>;

  const formatActivity = (activityType) => {
    if (activityType === 'quiz' || activityType === 'lesson') return `📝 ${t('navbar.quiz', 'Quiz')}`;
    if (activityType === 'flashcard') return `🎴 ${t('navbar.flashcards')}`;
    return '—';
  };

  const formatTimeSpent = (minutes) => {
    if (!minutes || minutes === 0) return '0m';
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const langPair = (native, target) => {
    const nl = LANGUAGES[native];
    const tl = LANGUAGES[target];
    return (
      <span className="lang-pair-badge">
        {nl?.flag || '🌍'} {(native || '?').toUpperCase()}
        <span className="lang-pair-arrow">→</span>
        {tl?.flag || '🌍'} {(target || '?').toUpperCase()}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
      (filterStatus === 'active' && user.status === 'active') ||
      (filterStatus === 'suspended' && user.status === 'suspended') ||
      (filterStatus === 'admin' && user.role === 'admin');
    return matchesSearch && matchesFilter;
  });

  const detail = userDetail?.user || selectedUser;
  const detailStats = userDetail?.stats;

  if (loading) return <div className="loading">{t('admin.loadingAdmin')}</div>;

  if (error && stats.overview.totalUsers === 0 && !loading) {
    return (
      <div className="admin-container">
        <div className="container">
          <div className="error-banner">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-content">
            <h1>
              {t('admin.title').split('<1>')[0]}
              <span className="text-accent">
                {t('admin.title').match(/<1>(.*?)<\/1>/)?.[1] || t('admin.title')}
              </span>
            </h1>
            <p>{t('admin.subtitle')}</p>
          </div>
          <button className="btn btn-primary" onClick={fetchData}>{t('admin.refreshData')}</button>
        </div>

        {successMessage && <div className="success-banner">{successMessage}</div>}
        {error && <div className="error-banner">{error}</div>}

        {/* Tabs */}
        <div className="admin-tabs">
          {[
            { id: 'dashboard', icon: '📊', label: t('admin.dashboard') },
            { id: 'users', icon: '👥', label: `${t('admin.users')} (${users.length})` },
            { id: 'activity', icon: '📈', label: t('admin.activity') },
            { id: 'guests', icon: '👤', label: `${t('admin.guests', 'Guests')} (${guests.total})` },
            { id: 'flashcards', icon: '🎴', label: `${t('admin.userFlashcards')} (${userFlashcards.length})` },
            { id: 'billing', icon: '$', label: `${t('admin.billing', 'Billing')} (${billingAdmin.counts.openInstitutionLeads || 0})` },
            { id: 'demo', icon: '▶', label: t('admin.demo', 'Demo') },
          ].map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="tab-icon">{tab.icon}</span>{tab.label}
            </button>
          ))}
          <button className={`tab-btn ${activeTab === 'failures' ? 'active' : ''}`} onClick={() => setActiveTab('failures')}>
            <span className="tab-icon">!</span>{t('admin.failures', 'Failures')} ({errorReports.openCount || stats?.overview?.openErrorReports || 0})
          </button>
          <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <span className="tab-icon">✉</span>{t('admin.messages', 'Messages')} ({contactMessages.openCount || stats?.overview?.openContactMessages || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">

          {/* ── Dashboard Tab ── */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-section">
              <div className="stats-row">
                <div className="stat-card large primary">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">👥</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.totalUsers || 0}</span>
                    <span className="stat-label">{t('admin.totalUsers')}</span>
                    <span className="stat-sub">{t('admin.thisWeekStat', { count: stats?.activity?.newUsersLastWeek || 0 })}</span>
                  </div>
                </div>
                <div className="stat-card large success">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">✅</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.activeUsers || 0}</span>
                    <span className="stat-label">{t('admin.activeUsers')}</span>
                    <span className="stat-sub">{t('admin.onlineToday', { count: stats?.activity?.activeUsersToday || 0 })}</span>
                  </div>
                </div>
                <div className="stat-card large warning">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">⏱️</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{formatTimeSpent(stats?.activity?.avgTimeSpent)}</span>
                    <span className="stat-label">{t('admin.avgTimeSpent')}</span>
                    <span className="stat-sub">{t('admin.perUserSession')}</span>
                  </div>
                </div>
                <div className="stat-card large danger">
                  <div className="stat-icon-wrapper"><span className="stat-emoji">🚫</span></div>
                  <div className="stat-details">
                    <span className="stat-number">{stats?.overview?.suspendedUsers || 0}</span>
                    <span className="stat-label">{t('admin.suspended')}</span>
                    <span className="stat-sub">{t('admin.accountsBlocked')}</span>
                  </div>
                </div>
              </div>

              <div className="section-title"><h2>{t('admin.contentOverview')}</h2></div>
              <div className="stats-row small">
                {[
                  { emoji: '📚', value: stats?.overview?.totalLessons || 0, label: t('admin.totalLessons') },
                  { emoji: '🎴', value: stats?.overview?.totalFlashcards || 0, label: t('admin.totalFlashcards') },
                  { emoji: '📈', value: stats?.overview?.totalProgress || 0, label: t('admin.progressRecords') },
                  { emoji: '🔐', value: stats?.overview?.totalLogins || 0, label: t('admin.totalLogins') },
                  { emoji: '👑', value: stats?.overview?.adminCount || 0, label: t('admin.admins') },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-emoji">{s.emoji}</span>
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="section-title"><h2>{t('admin.learningModeBreakdown')}</h2></div>
              <div className="stats-row small">
                <div className="stat-card">
                  <span className="stat-emoji">🔥</span>
                  <span className="stat-number">{stats?.overview?.challengeModeUsers || 0}</span>
                  <span className="stat-label">{t('admin.challengeMode')}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">😊</span>
                  <span className="stat-number">{stats?.overview?.relaxedModeUsers || 0}</span>
                  <span className="stat-label">{t('admin.relaxedMode')}</span>
                </div>
              </div>

              <div className="section-title"><h2>{t('admin.userRegistrations')}</h2></div>
              <div className="card growth-chart">
                <div className="chart-bars">
                  {stats.userGrowth && stats.userGrowth.length > 0 ? (
                    stats.userGrowth.map((day, idx) => {
                      const maxCount = Math.max(...stats.userGrowth.map(d => d.count), 1);
                      return (
                        <div key={idx} className="chart-bar-wrapper">
                          <div className="chart-bar-value">{day.count}</div>
                          <div className="chart-bar" style={{ height: `${Math.max((day.count / maxCount) * 100, 5)}%` }} />
                          <div className="chart-bar-label">
                            {new Date(day.date).toLocaleDateString(i18n.language, { weekday: 'short' })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-data">{t('admin.noDataAvailable')}</div>
                  )}
                </div>
              </div>

              <div className="section-title"><h2>{t('admin.recentActivity')}</h2></div>
              <div className="card">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>{t('admin.user')}</th>
                      <th>{t('admin.lastActive')}</th>
                      <th>{t('admin.timeSpent')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActiveUsers && stats.recentActiveUsers.length > 0 ? (
                      stats.recentActiveUsers.slice(0, 5).map((user) => (
                        <tr key={user._id} className="clickable-row" onClick={() => openUserDetail(user)}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td>{formatDate(user.lastActive)}</td>
                          <td>{formatTimeSpent(user.totalTimeSpent)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="3" className="no-data">{t('admin.noRecentActivity')}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Users Tab ── */}
          {activeTab === 'users' && (
            <div className="users-section">
              <div className="filters-row">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={t('admin.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-pills">
                  {[
                    { id: 'all', label: `${t('admin.allFilter')} (${users.length})` },
                    { id: 'active', label: `${t('admin.activeFilter')} (${users.filter(u => u.status === 'active').length})` },
                    { id: 'suspended', label: `${t('admin.suspendedFilter')} (${users.filter(u => u.status === 'suspended').length})` },
                    { id: 'admin', label: `${t('admin.adminsFilter')} (${users.filter(u => u.role === 'admin').length})` },
                  ].map(f => (
                    <button key={f.id} className={`filter-pill ${filterStatus === f.id ? 'active' : ''}`} onClick={() => setFilterStatus(f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card users-table-card">
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>{t('admin.user')}</th>
                        <th>Languages</th>
                        <th>Location</th>
                        <th>{t('admin.status')}</th>
                        <th>{t('admin.role')}</th>
                        <th>{t('admin.mode')}</th>
                        <th>XP</th>
                        <th>{t('admin.timeSpent')}</th>
                        <th>{t('admin.joined')}</th>
                        <th>{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className={`clickable-row ${user.status === 'suspended' ? 'suspended-row' : ''}`}
                          onClick={() => openUserDetail(user)}
                        >
                          <td>
                            <div className="user-cell">
                              <div className={`user-avatar-sm ${user.role === 'admin' ? 'admin' : ''}`}>
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div className="user-info">
                                <span className="user-name">{user.username}</span>
                                <span className="user-email">{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td>{langPair(user.nativeLanguage, user.targetLanguage)}</td>
                          <td className="location-cell">
                            {user.lastCountry && user.lastCountry !== 'Unknown' ? (
                              <span title={user.lastCity ? `${user.lastCity}, ${user.lastCountry}` : user.lastCountry}>
                                {countryFlag(user.lastCountry)} {user.lastCountry}
                              </span>
                            ) : '—'}
                          </td>
                          <td>
                            <span className={`status-badge ${user.status}`}>
                              {user.status === 'active' ? `✓ ${t('admin.active')}` : `✕ ${t('admin.suspended')}`}
                            </span>
                          </td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role === 'admin' ? `👑 ${t('admin.adminRole')}` : t('admin.userRole')}
                            </span>
                          </td>
                          <td>{formatMode(user.xpDecayEnabled)}</td>
                          <td className="center-cell xp-cell">⭐ {user.totalXP || 0}</td>
                          <td className="center-cell">{formatTimeSpent(user.totalTimeSpent)}</td>
                          <td className="date-cell">{formatDateShort(user.createdAt)}</td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div className="actions-cell">
                              {user.role !== 'admin' && (
                                <>
                                  {user.status === 'active' ? (
                                    <button className="action-btn suspend" onClick={() => setSuspendModal({ show: true, user, reason: '' })} title={t('admin.suspendUser')}>🚫</button>
                                  ) : (
                                    <button className="action-btn unsuspend" onClick={() => handleUnsuspendUser(user)} title={t('admin.unsuspend')}>✅</button>
                                  )}
                                  <button className="action-btn promote" onClick={() => handlePromoteToAdmin(user)} title={t('admin.promoteToAdmin')}>👑</button>
                                  <button className="action-btn delete" onClick={() => handleDeleteUser(user)} title={t('admin.deleteUser')}>🗑️</button>
                                </>
                              )}
                              {user.role === 'admin' && <span className="protected-text">{t('admin.protected')}</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredUsers.length === 0 && (
                  <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <p>{t('admin.noUsersFound')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Activity Tab ── */}
          {activeTab === 'activity' && (
            <div className="activity-section">
              <div className="activity-stats">
                {[
                  { emoji: '📅', label: t('admin.today'), value: stats?.activity?.activeUsersToday || 0, sub: t('admin.activeUsers') },
                  { emoji: '📆', label: t('admin.thisWeek'), value: stats?.activity?.activeUsersThisWeek || 0, sub: t('admin.activeUsers') },
                  { emoji: '🆕', label: t('admin.newThisWeek'), value: stats?.activity?.newUsersLastWeek || 0, sub: t('admin.registrations') },
                  { emoji: '📊', label: t('admin.thisMonth'), value: stats?.activity?.newUsersLastMonth || 0, sub: t('admin.newUsers') },
                ].map((c, i) => (
                  <div key={i} className="activity-card">
                    <div className="activity-header"><span className="activity-emoji">{c.emoji}</span><h3>{c.label}</h3></div>
                    <div className="activity-value">{c.value}</div>
                    <div className="activity-label">{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="section-title"><h2>{t('admin.allRecentActivity')}</h2></div>
              <div className="card">
                <table className="activity-table full">
                  <thead>
                    <tr>
                      <th>{t('admin.user')}</th>
                      <th>{t('admin.emailCol')}</th>
                      <th>Languages</th>
                      <th>{t('admin.mode')}</th>
                      <th>{t('admin.lastActivity')}</th>
                      <th>{t('admin.lastActive')}</th>
                      <th>{t('admin.totalTime')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentActiveUsers && stats.recentActiveUsers.length > 0 ? (
                      stats.recentActiveUsers.map((user) => (
                        <tr key={user._id} className="clickable-row" onClick={() => openUserDetail(user)}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-sm">{user.username.charAt(0).toUpperCase()}</div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="email-cell">{user.email}</td>
                          <td>{langPair(user.nativeLanguage, user.targetLanguage)}</td>
                          <td>{formatMode(user.xpDecayEnabled)}</td>
                          <td className="center-cell">{formatActivity(user.lastActivityType)}</td>
                          <td>{formatDate(user.lastActive)}</td>
                          <td>{formatTimeSpent(user.totalTimeSpent)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="7" className="no-data">{t('admin.noRecentActivity')}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Guests Tab ── */}
          {activeTab === 'guests' && (
            <div className="guests-section">

              {/* ── Row 1: Volume & Reach ── */}
              <div className="guest-stat-group-label">Volume &amp; Reach</div>
              <div className="stats-row small" style={{ marginBottom: 8 }}>
                {[
                  { emoji: '📅', value: guests.stats.todayCount,      label: 'Today' },
                  { emoji: '📆', value: guests.stats.weekCount,       label: 'This Week' },
                  { emoji: '👥', value: guests.total,                 label: 'All-Time Sessions' },
                  { emoji: '🌍', value: guests.stats.uniqueCountries, label: 'Countries' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-emoji">{s.emoji}</span>
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Row 2: Engagement ── */}
              <div className="guest-stat-group-label" style={{ marginTop: 16 }}>Engagement</div>
              <div className="stats-row small" style={{ marginBottom: 8 }}>
                {[
                  {
                    emoji: '⏱️',
                    value: guests.stats.avgTimeSpent >= 60
                      ? `${Math.floor(guests.stats.avgTimeSpent / 60)}m ${guests.stats.avgTimeSpent % 60}s`
                      : `${guests.stats.avgTimeSpent}s`,
                    label: 'Avg Session Time',
                  },
                  { emoji: '🃏', value: guests.stats.totalCardsStudied,  label: 'Cards Studied (total)' },
                  { emoji: '📊', value: guests.stats.avgCardsStudied,    label: 'Avg Cards / Session' },
                  { emoji: '🔊', value: guests.stats.totalAudioPlays,    label: 'Audio Plays (total)' },
                  { emoji: '📖', value: guests.stats.totalLessonsViewed, label: 'Lessons Viewed (total)' },
                  { emoji: '✅', value: guests.stats.engagedSessions,    label: 'Sessions w/ Activity' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-emoji">{s.emoji}</span>
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Row 3: Conversion, Device, Language ── */}
              <div className="guest-stat-group-label" style={{ marginTop: 16 }}>Conversion &amp; Device</div>
              <div className="stats-row small" style={{ marginBottom: 24 }}>
                <div className="stat-card">
                  <span className="stat-emoji">🎯</span>
                  <span className="stat-number">{guests.stats.conversions}</span>
                  <span className="stat-label">Signed Up</span>
                  <span className="stat-sub">{guests.stats.conversionRate}% conversion rate</span>
                </div>
                {/* Device breakdown */}
                {guests.stats.deviceBreakdown?.length > 0 && (
                  <div className="stat-card">
                    <span className="stat-emoji">📱</span>
                    <span className="stat-label" style={{ fontWeight: 700, marginBottom: 6 }}>Devices</span>
                    {guests.stats.deviceBreakdown.map((d, i) => (
                      <span key={i} className="stat-sub">
                        {d._id === 'mobile' ? '📱' : d._id === 'tablet' ? '📟' : d._id === 'desktop' ? '💻' : '❓'}{' '}
                        {d._id || 'unknown'}: {d.count}
                      </span>
                    ))}
                  </div>
                )}
                {/* Top language pairs */}
                {guests.stats.topLanguagePairs?.length > 0 && (
                  <div className="stat-card">
                    <span className="stat-emoji">🗣️</span>
                    <span className="stat-label" style={{ fontWeight: 700, marginBottom: 6 }}>Top Lang Pairs</span>
                    {guests.stats.topLanguagePairs.slice(0, 4).map((p, i) => (
                      <span key={i} className="stat-sub">
                        {langPair(p._id.native, p._id.target)} × {p.count}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Sessions Table ── */}
              <div className="section-title"><h2>Session Log</h2></div>
              <div className="card users-table-card">
                {guestsLoading ? (
                  <div className="no-data" style={{ padding: 40 }}>Loading guest sessions…</div>
                ) : (
                  <div className="table-container">
                    <table className="users-table guest-sessions-table">
                      <thead>
                        <tr>
                          <th>Location</th>
                          <th>Device</th>
                          <th>Language Pair</th>
                          <th>Time Spent</th>
                          <th>Cards</th>
                          <th>Accuracy</th>
                          <th>Lessons</th>
                          <th>Audio</th>
                          <th>Last Page</th>
                          <th>Referrer</th>
                          <th>First Seen</th>
                          <th>Duration</th>
                          <th>Converted</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guests.sessions.length > 0 ? (
                          guests.sessions.map((s) => {
                            const sessionSecs = s.timeSpent || 0;
                            const durationSecs = s.firstSeen && s.lastSeen
                              ? Math.floor((new Date(s.lastSeen) - new Date(s.firstSeen)) / 1000)
                              : 0;
                            const accuracy = s.cardsStudied > 0
                              ? Math.round((s.cardsCorrect / s.cardsStudied) * 100)
                              : null;
                            const fmtSecs = (sec) => sec >= 60
                              ? `${Math.floor(sec / 60)}m ${sec % 60}s`
                              : `${sec}s`;
                            const shortRef = (s.referrer || '').replace(/^https?:\/\//, '').split('/')[0];
                            return (
                              <tr
                                key={s._id}
                                className={`clickable-row${s.convertedToUser ? ' guest-row-converted' : ''}`}
                                onClick={() => setSelectedGuest(s)}
                              >
                                <td>
                                  <div className="guest-location-cell">
                                    <span className="location-flag">{countryFlag(s.countryCode)}</span>
                                    <span className="guest-location-text">
                                      {s.country !== 'Unknown' ? s.country : '—'}
                                      {s.city ? <span className="guest-city">, {s.city}</span> : null}
                                    </span>
                                  </div>
                                </td>
                                <td className="center-cell">
                                  <span className="guest-device-badge" title={s.userAgent || 'unknown'}>
                                    {s.deviceType === 'mobile'  ? '📱' :
                                     s.deviceType === 'tablet'  ? '📟' :
                                     s.deviceType === 'desktop' ? '💻' : '❓'}
                                    <span className="guest-device-label">{s.deviceType || '—'}</span>
                                  </span>
                                </td>
                                <td>{langPair(s.nativeLanguage, s.targetLanguage)}</td>
                                <td className="center-cell guest-metric">
                                  {sessionSecs > 0 ? fmtSecs(sessionSecs) : '—'}
                                </td>
                                <td className="center-cell guest-metric">
                                  {s.cardsStudied > 0
                                    ? <span>{s.cardsStudied} <span className="guest-sub-stat">({s.cardsCorrect}✓ {s.cardsIncorrect}✗)</span></span>
                                    : '—'}
                                </td>
                                <td className="center-cell">
                                  {accuracy !== null
                                    ? <span className={`guest-accuracy ${accuracy >= 70 ? 'good' : accuracy >= 40 ? 'mid' : 'low'}`}>{accuracy}%</span>
                                    : '—'}
                                </td>
                                <td className="center-cell guest-metric">{s.lessonsViewed > 0 ? s.lessonsViewed : '—'}</td>
                                <td className="center-cell guest-metric">{s.audioPlays > 0 ? s.audioPlays : '—'}</td>
                                <td className="center-cell">
                                  {s.lastActivity
                                    ? <span className="guest-activity-badge">{s.lastActivity}</span>
                                    : '—'}
                                </td>
                                <td className="date-cell" title={s.referrer || ''}>
                                  {shortRef || '—'}
                                </td>
                                <td className="date-cell">{formatDate(s.firstSeen)}</td>
                                <td className="center-cell guest-metric">
                                  {durationSecs > 0 ? fmtSecs(durationSecs) : '—'}
                                </td>
                                <td className="center-cell">
                                  {s.convertedToUser
                                    ? <span className="guest-converted-badge">✔ Signed Up</span>
                                    : <span className="guest-no-convert">—</span>}
                                </td>
                                <td className="ip-cell">{s.ip}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr><td colSpan="14" className="no-data">No guest sessions recorded yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Pagination */}
                {guests.totalPages > 1 && (
                  <div className="pagination-row">
                    <button className="btn btn-outline" disabled={guests.page <= 1} onClick={() => fetchGuests(guests.page - 1)}>← Prev</button>
                    <span className="page-info">Page {guests.page} of {guests.totalPages} ({guests.total} sessions)</span>
                    <button className="btn btn-outline" disabled={guests.page >= guests.totalPages} onClick={() => fetchGuests(guests.page + 1)}>Next →</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Flashcards Tab ── */}
          {activeTab === 'failures' && (
            <div className="failures-section">
              <div className="section-title">
                <h2>User-side failures</h2>
              </div>
              <div className="failure-toolbar">
                <div>
                  <strong>{errorReports.openCount || 0}</strong> open failures
                  {errorReports.criticalOpenCount > 0 && (
                    <span className="failure-critical-note"> {errorReports.criticalOpenCount} critical</span>
                  )}
                </div>
                <div className="failure-toolbar-actions">
                  <button className="btn btn-outline" onClick={() => fetchErrorReports(errorReports.page || 1)} disabled={errorReportsLoading || errorReportsClearing}>
                    Refresh
                  </button>
                  <button className="btn btn-danger" onClick={clearOpenErrorReports} disabled={errorReportsLoading || errorReportsClearing || !(errorReports.openCount > 0)}>
                    {errorReportsClearing ? 'Clearing...' : 'Clear all'}
                  </button>
                </div>
              </div>

              <div className="card failures-card">
                {errorReportsLoading ? (
                  <div className="no-data" style={{ padding: 40 }}>Loading failures...</div>
                ) : errorReports.reports.length > 0 ? (
                  <div className="failure-list">
                    {errorReports.reports.map((report) => (
                      <div key={report._id} className={`failure-item severity-${report.severity}`}>
                        <div className="failure-item-header">
                          <div>
                            <div className="failure-title">
                              <span className="failure-severity">{report.severity}</span>
                              <span>{report.message}</span>
                            </div>
                            <div className="failure-meta">
                              {formatDate(report.createdAt)} | {report.source} | {report.kind} | {errorReportUserLabel(report)}
                            </div>
                          </div>
                          <button className="btn btn-outline failure-ack" onClick={() => acknowledgeErrorReport(report._id)}>
                            Acknowledge
                          </button>
                        </div>

                        <div className="failure-detail-grid">
                          <div><span>Page</span><strong>{report.route || report.screen || 'Unknown'}</strong></div>
                          <div><span>Device</span><strong>{report.deviceId || 'Unknown'}</strong></div>
                          <div><span>Language Pair</span><strong>{report.session?.nativeLanguage || '?'} -> {report.session?.targetLanguage || '?'}</strong></div>
                          <div><span>Status</span><strong>{report.api?.statusCode || 'Client'} {report.api?.statusText || ''}</strong></div>
                        </div>

                        {report.api?.url && (
                          <div className="failure-code-line">
                            {report.api.method || 'GET'} {report.api.url}
                          </div>
                        )}

                        {report.api?.responseMessage && report.api.responseMessage !== report.message && (
                          <div className="failure-response">{report.api.responseMessage}</div>
                        )}

                        {report.stack && (
                          <details className="failure-stack">
                            <summary>Stack trace</summary>
                            <pre>{report.stack}</pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <span className="no-results-icon">OK</span>
                    <p>No open user-side failures.</p>
                  </div>
                )}
              </div>

              {errorReports.totalPages > 1 && (
                <div className="pagination-row">
                  <button className="btn btn-outline" disabled={errorReports.page <= 1 || errorReportsLoading} onClick={() => fetchErrorReports(errorReports.page - 1)}>
                    Previous
                  </button>
                  <span className="page-info">Page {errorReports.page} of {errorReports.totalPages}</span>
                  <button className="btn btn-outline" disabled={errorReports.page >= errorReports.totalPages || errorReportsLoading} onClick={() => fetchErrorReports(errorReports.page + 1)}>
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-section">
              <div className="section-title">
                <h2>Contact messages</h2>
              </div>
              <div className="failure-toolbar">
                <div>
                  <strong>{contactMessages.openCount || 0}</strong> unread messages
                </div>
                <div className="failure-toolbar-actions">
                  <button className="btn btn-outline" onClick={() => fetchContactMessages(contactMessages.page || 1)} disabled={contactMessagesLoading || contactMessagesClearing}>
                    Refresh
                  </button>
                  <button className="btn btn-danger" onClick={clearOpenContactMessages} disabled={contactMessagesLoading || contactMessagesClearing || !(contactMessages.openCount > 0)}>
                    {contactMessagesClearing ? 'Clearing...' : 'Clear all'}
                  </button>
                </div>
              </div>

              <div className="contact-message-filters" role="group" aria-label="Contact message sender filter">
                {[
                  { id: 'all', label: 'All messages', count: contactMessages.openCount || 0 },
                  { id: 'registered', label: 'Registered users', count: contactMessages.registeredCount || 0 },
                  { id: 'guest', label: 'Guest users', count: contactMessages.guestCount || 0 },
                ].map(filter => (
                  <button
                    key={filter.id}
                    type="button"
                    className={`contact-message-filter ${contactSenderFilter === filter.id ? 'active' : ''}`}
                    onClick={() => {
                      setContactSenderFilter(filter.id);
                      setContactMessages(prev => ({ ...prev, messages: [], page: 1, senderType: filter.id }));
                    }}
                  >
                    <span>{filter.label}</span>
                    <strong>{filter.count}</strong>
                  </button>
                ))}
              </div>

              <div className="card failures-card contact-messages-card">
                {contactMessagesLoading ? (
                  <div className="no-data" style={{ padding: 40 }}>Loading messages...</div>
                ) : contactMessages.messages.length > 0 ? (
                  <div className="failure-list">
                    {contactMessages.messages.map((message) => {
                      const senderIsGuest = message.session?.isGuest === true;
                      const senderLabel = senderIsGuest ? 'Guest user' : 'Registered user';
                      return (
                        <div key={message._id} className={`failure-item contact-message-item ${senderIsGuest ? 'guest' : 'registered'}`}>
                          <div className="failure-item-header">
                            <div>
                              <div className="failure-title contact-message-title">
                                <span className={`contact-message-badge ${senderIsGuest ? 'guest' : 'registered'}`}>{senderLabel}</span>
                                <span>{message.subject || 'Contact message'}</span>
                              </div>
                              <div className="failure-meta">
                                {formatDate(message.createdAt)} | {message.source || 'web'} | {contactMessageUserLabel(message)}
                              </div>
                            </div>
                            <button className="btn btn-outline failure-ack" onClick={() => acknowledgeContactMessage(message._id)}>
                              Mark read
                            </button>
                          </div>

                          <div className="failure-detail-grid contact-message-grid">
                            <div><span>Sender Type</span><strong>{senderLabel}</strong></div>
                            <div><span>Name</span><strong>{message.name || 'Unknown'}</strong></div>
                            <div><span>Email</span><strong>{message.email || 'Unknown'}</strong></div>
                            <div><span>Account Tier</span><strong>{message.session?.subscriptionTier || message.userSnapshot?.subscriptionTier || 'free'}</strong></div>
                            <div><span>Language Pair</span><strong>{message.session?.nativeLanguage || '?'} -> {message.session?.targetLanguage || '?'}</strong></div>
                            <div><span>Page</span><strong>{message.page || 'Unknown'}</strong></div>
                            <div><span>Device</span><strong>{message.deviceId || 'Unknown'}</strong></div>
                            <div><span>Browser Language</span><strong>{message.client?.language || 'Unknown'}</strong></div>
                            <div><span>IP</span><strong>{message.request?.ip || 'Unknown'}</strong></div>
                          </div>

                          <div className="contact-message-body">
                            {message.message}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-results">
                    <span className="no-results-icon">OK</span>
                    <p>No unread contact messages.</p>
                  </div>
                )}
              </div>

              {contactMessages.totalPages > 1 && (
                <div className="pagination-row">
                  <button className="btn btn-outline" disabled={contactMessages.page <= 1 || contactMessagesLoading} onClick={() => fetchContactMessages(contactMessages.page - 1)}>
                    Previous
                  </button>
                  <span className="page-info">Page {contactMessages.page} of {contactMessages.totalPages}</span>
                  <button className="btn btn-outline" disabled={contactMessages.page >= contactMessages.totalPages || contactMessagesLoading} onClick={() => fetchContactMessages(contactMessages.page + 1)}>
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="billing-admin-section">
              <div className="section-header-row">
                <div>
                  <h2>{t('adminBilling.title')}</h2>
                  <p>{t('adminBilling.subtitle')}</p>
                </div>
                <button className="btn btn-outline btn-sm" onClick={fetchBillingAdmin} disabled={billingLoading}>
                  {billingLoading ? t('common.loading') : t('adminBilling.refresh')}
                </button>
              </div>

              <div className="stats-row small">
                <div className="stat-card">
                  <span className="stat-emoji">$</span>
                  <span className="stat-number">{billingAdmin.counts.activeIndividual || 0}</span>
                  <span className="stat-label">{t('adminBilling.activeIndividual')}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">🏫</span>
                  <span className="stat-number">{billingAdmin.counts.activeInstitutional || 0}</span>
                  <span className="stat-label">{t('adminBilling.activeInstitutions')}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-emoji">✉</span>
                  <span className="stat-number">{billingAdmin.counts.openInstitutionLeads || 0}</span>
                  <span className="stat-label">{t('adminBilling.openRequests')}</span>
                </div>
              </div>

              <div className="billing-pricing-grid">
                <form className="card billing-admin-form pricing-control-card" onSubmit={handlePlanOverrideSubmit}>
                  <div className="billing-card-title-row">
                    <div>
                      <h3>{t('adminBilling.planPricing')}</h3>
                      <p>{t('adminBilling.planPricingHint')}</p>
                    </div>
                    <label className="billing-switch">
                      <input
                        type="checkbox"
                        checked={planOverrideForm.active}
                        onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, active: event.target.checked })}
                      />
                      {t('admin.active')}
                    </label>
                  </div>
                  <label>
                    {t('adminBilling.plan')}
                    <select value={selectedPricingPlanId} onChange={(event) => setSelectedPricingPlanId(event.target.value)}>
                      {billingPlans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {adminPlanName(plan)} ({adminAudienceLabel(plan.audience)})
                        </option>
                      ))}
                    </select>
                  </label>
                  {selectedPricingPlan && (
                    <div className="billing-price-summary">
                      <span>{t('adminBilling.currentPublicPrice')}</span>
                      <strong>
                        {selectedPricingPlan.audience === 'institution'
                          ? t('adminBilling.pricePerSeat', { price: formatAdminPrice(selectedPricingPlan.seatPriceMonthlyCents) })
                          : t('adminBilling.priceMonthly', { price: formatAdminPrice(selectedPricingPlan.monthlyPriceCents) })}
                      </strong>
                    </div>
                  )}
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.displayName')}
                      <input
                        value={planOverrideForm.name}
                        onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, name: event.target.value })}
                        placeholder={selectedPricingPlan?.name || ''}
                      />
                    </label>
                    <label>
                      {t('adminBilling.shortDescription')}
                      <input
                        value={planOverrideForm.tagline}
                        onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, tagline: event.target.value })}
                        placeholder={selectedPricingPlan?.tagline || ''}
                      />
                    </label>
                  </div>

                  {selectedPricingPlan?.audience === 'individual' ? (
                    <>
                      <div className="billing-admin-form-row">
                        <label>
                          {t('adminBilling.monthlyPrice')}
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={planOverrideForm.monthlyPrice}
                            onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, monthlyPrice: event.target.value })}
                            placeholder={centsToPriceInput(selectedPricingPlan.monthlyPriceCents)}
                          />
                        </label>
                        <label>
                          {t('adminBilling.annualPrice')}
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={planOverrideForm.annualPrice}
                            onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, annualPrice: event.target.value })}
                            placeholder={centsToPriceInput(selectedPricingPlan.annualPriceCents)}
                          />
                        </label>
                      </div>
                      <div className="billing-admin-form-row">
                        <label>
                          {t('adminBilling.stripeMonthlyPriceId')}
                          <input
                            value={planOverrideForm.stripeMonthlyPriceId}
                            onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, stripeMonthlyPriceId: event.target.value })}
                            placeholder="price_..."
                          />
                        </label>
                        <label>
                          {t('adminBilling.stripeAnnualPriceId')}
                          <input
                            value={planOverrideForm.stripeAnnualPriceId}
                            onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, stripeAnnualPriceId: event.target.value })}
                            placeholder="price_..."
                          />
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="billing-admin-form-row">
                      <label>
                        {t('adminBilling.monthlySeatPrice')}
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={planOverrideForm.seatPriceMonthly}
                          onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, seatPriceMonthly: event.target.value })}
                          placeholder={centsToPriceInput(selectedPricingPlan?.seatPriceMonthlyCents)}
                        />
                      </label>
                      <label>
                        {t('adminBilling.annualSeatPrice')}
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={planOverrideForm.seatPriceAnnual}
                          onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, seatPriceAnnual: event.target.value })}
                          placeholder={centsToPriceInput(selectedPricingPlan?.seatPriceAnnualCents)}
                        />
                      </label>
                      <label>
                        {t('adminBilling.minimumSeats')}
                        <input
                          type="number"
                          min="1"
                          value={planOverrideForm.minimumSeats}
                          onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, minimumSeats: event.target.value })}
                          placeholder={selectedPricingPlan?.minimumSeats || ''}
                        />
                      </label>
                    </div>
                  )}
                  <label>
                    {t('adminBilling.internalNotes')}
                    <textarea
                      value={planOverrideForm.notes}
                      onChange={(event) => setPlanOverrideForm({ ...planOverrideForm, notes: event.target.value })}
                    />
                  </label>
                  <button className="btn btn-primary" type="submit" disabled={!selectedPricingPlan}>{t('adminBilling.savePricing')}</button>
                </form>

                <form className="card billing-admin-form pricing-control-card" onSubmit={handleDiscountSubmit}>
                  <h3>{t('adminBilling.discounts')}</h3>
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.applyMethod')}
                      <select
                        value={discountForm.applicationMode}
                        onChange={(event) => setDiscountForm({ ...discountForm, applicationMode: event.target.value })}
                      >
                        <option value="code">{t('adminBilling.customerEntersCode')}</option>
                        <option value="automatic">{t('adminBilling.automaticForEligibleUsers')}</option>
                      </select>
                    </label>
                    <label>
                      {t('adminBilling.code')}
                      <input
                        value={discountForm.code}
                        onChange={(event) => setDiscountForm({ ...discountForm, code: event.target.value.toUpperCase() })}
                        placeholder={discountForm.applicationMode === 'automatic' ? t('adminBilling.optionalInternalLabel') : 'LAUNCH20'}
                        required={discountForm.applicationMode !== 'automatic'}
                      />
                    </label>
                  </div>
                  {discountForm.applicationMode === 'automatic' && (
                    <p className="billing-admin-hint">
                      {t('adminBilling.automaticDiscountHint')}
                    </p>
                  )}
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.type')}
                      <select
                        value={discountForm.discountType}
                        onChange={(event) => setDiscountForm({ ...discountForm, discountType: event.target.value })}
                      >
                        <option value="percent">{t('adminBilling.percent')}</option>
                        <option value="fixed">{t('adminBilling.fixedAmount')}</option>
                      </select>
                    </label>
                  </div>
                  <div className="billing-admin-form-row">
                    {discountForm.discountType === 'percent' ? (
                      <label>
                        {t('adminBilling.percentOff')}
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={discountForm.percentOff}
                          onChange={(event) => setDiscountForm({ ...discountForm, percentOff: event.target.value })}
                        />
                      </label>
                    ) : (
                      <label>
                        {t('adminBilling.amountOff')}
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={discountForm.amountOff}
                          onChange={(event) => setDiscountForm({ ...discountForm, amountOff: event.target.value })}
                        />
                      </label>
                    )}
                    <label>
                      {t('adminBilling.audience')}
                      <select
                        value={discountForm.appliesToAudience}
                        onChange={(event) => setDiscountForm({ ...discountForm, appliesToAudience: event.target.value })}
                      >
                        <option value="all">{adminAudienceLabel('all')}</option>
                        <option value="individual">{adminAudienceLabel('individual')}</option>
                        <option value="institution">{adminAudienceLabel('institution')}</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    {t('adminBilling.description')}
                    <input
                      value={discountForm.description}
                      onChange={(event) => setDiscountForm({ ...discountForm, description: event.target.value })}
                    />
                  </label>
                  <div className="discount-plan-picker">
                    <span>{t('adminBilling.limitToPlans')}</span>
                    <div>
                      {billingPlans.map((plan) => (
                        <label key={plan.id}>
                          <input
                            type="checkbox"
                            checked={discountForm.appliesToPlanIds.includes(plan.id)}
                            onChange={(event) => {
                              const nextPlans = event.target.checked
                                ? [...discountForm.appliesToPlanIds, plan.id]
                                : discountForm.appliesToPlanIds.filter((planId) => planId !== plan.id);
                              setDiscountForm({ ...discountForm, appliesToPlanIds: nextPlans });
                            }}
                          />
                          {adminPlanName(plan)}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.starts')}
                      <input
                        type="date"
                        value={discountForm.startsAt}
                        onChange={(event) => setDiscountForm({ ...discountForm, startsAt: event.target.value })}
                      />
                    </label>
                    <label>
                      {t('adminBilling.ends')}
                      <input
                        type="date"
                        value={discountForm.expiresAt}
                        onChange={(event) => setDiscountForm({ ...discountForm, expiresAt: event.target.value })}
                      />
                    </label>
                    <label>
                      {t('adminBilling.usageLimit')}
                      <input
                        type="number"
                        min="1"
                        value={discountForm.maxRedemptions}
                        onChange={(event) => setDiscountForm({ ...discountForm, maxRedemptions: event.target.value })}
                      />
                    </label>
                  </div>
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.stripePromotionCodeId')}
                      <input
                        value={discountForm.stripePromotionCodeId}
                        onChange={(event) => setDiscountForm({ ...discountForm, stripePromotionCodeId: event.target.value })}
                        placeholder="promo_..."
                      />
                    </label>
                    <label>
                      {t('adminBilling.stripeCouponId')}
                      <input
                        value={discountForm.stripeCouponId}
                        onChange={(event) => setDiscountForm({ ...discountForm, stripeCouponId: event.target.value })}
                        placeholder="coupon_..."
                      />
                    </label>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    {discountForm.applicationMode === 'automatic' ? t('adminBilling.createAutomaticDiscount') : t('adminBilling.createDiscountCode')}
                  </button>
                </form>
              </div>

              <div className="card discount-list-card">
                <div className="billing-card-title-row">
                  <div>
                    <h3>{t('adminBilling.activeAndRecentDiscounts')}</h3>
                    <p>{t('adminBilling.activeAndRecentDiscountsHint')}</p>
                  </div>
                </div>
                {billingAdmin.discounts.length === 0 ? (
                  <p className="no-data">{t('adminBilling.noDiscounts')}</p>
                ) : (
                  <div className="discount-list">
                    {billingAdmin.discounts.slice(0, 10).map((discount) => (
                      <div key={discount._id} className={`discount-list-item ${discount.active ? 'active' : 'paused'}`}>
                        <div>
                          <strong>
                            {discount.applicationMode === 'automatic' ? t('adminBilling.automaticDiscount') : discount.code}
                          </strong>
                          <span>
                            {discount.discountType === 'percent'
                              ? t('adminBilling.percentOffValue', { percent: discount.percentOff })
                              : t('adminBilling.amountOffValue', { amount: formatAdminPrice(discount.amountOffCents) })}
                            {' '}| {adminAudienceLabel(discount.appliesToAudience)}
                            {' '}| {discount.applicationMode === 'automatic' ? t('adminBilling.noCodeNeeded') : t('adminBilling.codeRequired')}
                          </span>
                          <small>
                            {discount.applicationMode === 'automatic' ? (discount.description || t('adminBilling.appliedAutomatically')) : discount.code}
                            {' '}| {discount.appliesToPlanIds?.length ? discount.appliesToPlanIds.map(adminPlanName).join(', ') : t('adminBilling.allPlans')}
                            {' '}| {t('adminBilling.usedCount', {
                              count: discount.redemptions || 0,
                              limit: discount.maxRedemptions ? `/${discount.maxRedemptions}` : '',
                            })}
                          </small>
                        </div>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => toggleDiscountActive(discount)}>
                          {discount.active ? t('adminBilling.pause') : t('adminBilling.enable')}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="billing-admin-grid">
                <form className="card billing-admin-form" onSubmit={handleManualPlanSubmit}>
                  <h3>{t('adminBilling.assignIndividualAccess')}</h3>
                  <label>
                    {t('adminBilling.userEmailOrId')}
                    <input
                      value={manualPlanForm.userIdOrEmail}
                      onChange={(event) => setManualPlanForm({ ...manualPlanForm, userIdOrEmail: event.target.value })}
                      required
                    />
                  </label>
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.plan')}
                      <select
                        value={manualPlanForm.planId}
                        onChange={(event) => setManualPlanForm({ ...manualPlanForm, planId: event.target.value })}
                      >
                        <option value="plus">{adminPlanName('plus')}</option>
                        <option value="pro">{adminPlanName('pro')}</option>
                        <option value="ultra">{adminPlanName('ultra')}</option>
                      </select>
                    </label>
                    <label>
                      {t('adminBilling.status')}
                      <select
                        value={manualPlanForm.status}
                        onChange={(event) => setManualPlanForm({ ...manualPlanForm, status: event.target.value })}
                      >
                        <option value="active">{adminStatusLabel('active')}</option>
                        <option value="trialing">{adminStatusLabel('trialing')}</option>
                        <option value="cancelled">{adminStatusLabel('cancelled')}</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    {t('adminBilling.endsAt')}
                    <input
                      type="date"
                      value={manualPlanForm.expiresAt}
                      onChange={(event) => setManualPlanForm({ ...manualPlanForm, expiresAt: event.target.value })}
                    />
                  </label>
                  <label>
                    {t('adminBilling.reason')}
                    <textarea
                      value={manualPlanForm.reason}
                      onChange={(event) => setManualPlanForm({ ...manualPlanForm, reason: event.target.value })}
                    />
                  </label>
                  <button className="btn btn-primary" type="submit">{t('adminBilling.updateAccess')}</button>
                </form>

                <form className="card billing-admin-form" onSubmit={handleOrganizationSubmit}>
                  <h3>{t('adminBilling.createInstitution')}</h3>
                  <label>
                    {t('pricing.organizationName')}
                    <input
                      value={organizationForm.name}
                      onChange={(event) => setOrganizationForm({ ...organizationForm, name: event.target.value })}
                      required
                    />
                  </label>
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.type')}
                      <select
                        value={organizationForm.type}
                        onChange={(event) => setOrganizationForm({ ...organizationForm, type: event.target.value })}
                      >
                        <option value="school">{adminOrgTypeLabel('school')}</option>
                        <option value="company">{adminOrgTypeLabel('company')}</option>
                        <option value="church">{adminOrgTypeLabel('church')}</option>
                        <option value="language_center">{adminOrgTypeLabel('language_center')}</option>
                        <option value="nonprofit">{adminOrgTypeLabel('nonprofit')}</option>
                        <option value="government">{adminOrgTypeLabel('government')}</option>
                        <option value="other">{adminOrgTypeLabel('other')}</option>
                      </select>
                    </label>
                    <label>
                      {t('adminBilling.plan')}
                      <select
                        value={organizationForm.planId}
                        onChange={(event) => setOrganizationForm({ ...organizationForm, planId: event.target.value })}
                      >
                        <option value="institution_basic">{adminPlanName('institution_basic')}</option>
                        <option value="institution_pro">{adminPlanName('institution_pro')}</option>
                        <option value="institution_enterprise">{adminPlanName('institution_enterprise')}</option>
                      </select>
                    </label>
                  </div>
                  <div className="billing-admin-form-row">
                    <label>
                      {t('adminBilling.seats')}
                      <input
                        type="number"
                        min="1"
                        value={organizationForm.seatsPurchased}
                        onChange={(event) => setOrganizationForm({ ...organizationForm, seatsPurchased: event.target.value })}
                      />
                    </label>
                    <label>
                      {t('institution.billingEmail')}
                      <input
                        type="email"
                        value={organizationForm.billingEmail}
                        onChange={(event) => setOrganizationForm({ ...organizationForm, billingEmail: event.target.value })}
                      />
                    </label>
                  </div>
                  <label>
                    {t('adminBilling.notes')}
                    <textarea
                      value={organizationForm.notes}
                      onChange={(event) => setOrganizationForm({ ...organizationForm, notes: event.target.value })}
                    />
                  </label>
                  <button className="btn btn-primary" type="submit">{t('adminBilling.createInstitution')}</button>
                </form>
              </div>

              <div className="billing-admin-panels">
                <div className="card">
                  <h3>{t('adminBilling.institutionRequests')}</h3>
                  {billingAdmin.leads.length === 0 ? (
                    <p className="no-data">{t('adminBilling.noOpenInstitutionRequests')}</p>
                  ) : (
                    <div className="billing-admin-list">
                      {billingAdmin.leads.map((lead) => (
                        <div key={lead._id} className="billing-admin-list-item">
                          <div>
                            <strong>{lead.organizationName}</strong>
                            <span>{lead.contactName} · {lead.email}</span>
                            <small>{adminPlanName(lead.planId)} · {t('adminBilling.seatCount', { count: lead.seatsRequested })} · {formatAdminDate(lead.createdAt)}</small>
                            {lead.message && <p>{lead.message}</p>}
                          </div>
                          <div className="billing-admin-actions">
                            <button type="button" className="btn btn-outline btn-sm" onClick={() => updateLeadStatus(lead._id, 'contacted')}>{adminLeadStatusLabel('contacted')}</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => updateLeadStatus(lead._id, 'converted')}>{adminLeadStatusLabel('converted')}</button>
                            <button type="button" className="btn btn-outline btn-sm" onClick={() => updateLeadStatus(lead._id, 'closed')}>{adminLeadStatusLabel('closed')}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card">
                  <h3>{t('adminBilling.recentSubscriptions')}</h3>
                  <div className="billing-admin-list compact">
                    {billingAdmin.subscriptions.slice(0, 12).map((subscription) => (
                      <div key={subscription._id} className="billing-admin-list-item">
                        <div>
                          <strong>{adminPlanName(subscription.planId)}</strong>
                          <span>{subscription.ownerId?.email || subscription.ownerId?.name || subscription.ownerType}</span>
                          <small>{adminStatusLabel(subscription.status)} · {t(`billing.sources.${subscription.source}`, subscription.source)} · {formatAdminDate(subscription.createdAt)}</small>
                        </div>
                      </div>
                    ))}
                    {billingAdmin.subscriptions.length === 0 && <p className="no-data">{t('billing.noHistory')}</p>}
                  </div>
                </div>

                <div className="card">
                  <h3>{t('adminBilling.organizations')}</h3>
                  <div className="billing-admin-list compact">
                    {billingAdmin.organizations.slice(0, 12).map((org) => (
                      <div key={org._id} className="billing-admin-list-item">
                        <div>
                          <strong>{org.name}</strong>
                          <span>{adminPlanName(org.planId)} · {adminStatusLabel(org.status)}</span>
                          <small>{t('adminBilling.seatsUsedCount', { used: org.seatsUsed || 0, purchased: org.seatsPurchased || 0 })}</small>
                        </div>
                      </div>
                    ))}
                    {billingAdmin.organizations.length === 0 && <p className="no-data">{t('adminBilling.noOrganizations')}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="users-section">
              <div className="section-title">
                <h2>{t('admin.userCreatedFlashcards')}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem' }}>
                  {t('admin.flashcardsPrivateNote')}
                </p>
              </div>
              <div className="card users-table-card">
                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>{t(`languages.${getTargetLangCode()}`, getTargetLangName())}</th>
                        <th>{t(`languages.${getNativeLangCode()}`, getNativeLangName())}</th>
                        <th>{t('admin.pronunciationCol')}</th>
                        <th>{t('admin.categoryCol')}</th>
                        <th>{t('admin.createdBy')}</th>
                        <th>{t('admin.mastery')}</th>
                        <th>{t('admin.added')}</th>
                        <th>{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userFlashcards.length > 0 ? (
                        userFlashcards.map((fc) => (
                          <tr key={fc._id}>
                            <td><strong>{fc[getTargetField()] || fc.korean}</strong></td>
                            <td>{fc[getNativeField()] || fc.english}</td>
                            <td style={{ color: 'var(--text-secondary)' }}>{fc.romanization || '—'}</td>
                            <td>{Array.isArray(fc.category) ? fc.category.join(', ') : fc.category || '—'}</td>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar-sm">{fc.userId?.username?.charAt(0).toUpperCase() || '?'}</div>
                                <div className="user-info">
                                  <span className="user-name">{fc.userId?.username || 'Unknown'}</span>
                                  <span className="user-email">{fc.userId?.email || ''}</span>
                                </div>
                              </div>
                            </td>
                            <td className="center-cell">{'★'.repeat(fc.masteryLevel)}{'☆'.repeat(5 - fc.masteryLevel)}</td>
                            <td className="date-cell">{formatDate(fc.createdAt)}</td>
                            <td>
                              <div className="actions-cell">
                                <button className="action-btn delete" onClick={() => handleDeleteFlashcard(fc)} title={t('common.delete')}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="8" className="no-data">{t('admin.noUserFlashcards')}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && <AdminSpeakingDemo />}
        </div>

        {/* ── Suspend Modal ── */}
        {suspendModal.show && (
          <div className="modal-overlay" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{t('admin.suspendUser')}</h3>
                <button className="modal-close" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>×</button>
              </div>
              <div className="modal-body">
                <p>{t('admin.suspendConfirm', { username: suspendModal.user?.username })}</p>
                <p className="modal-sub">{t('admin.suspendNote')}</p>
                <div className="form-group">
                  <label>{t('admin.suspendReason')}</label>
                  <textarea
                    value={suspendModal.reason}
                    onChange={(e) => setSuspendModal({ ...suspendModal, reason: e.target.value })}
                    placeholder={t('admin.enterReason')}
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={() => setSuspendModal({ show: false, user: null, reason: '' })}>{t('common.cancel')}</button>
                <button className="btn btn-danger" onClick={handleSuspendUser}>{t('admin.suspendButton')}</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Guest Detail Panel ── */}
        {selectedGuest && (() => {
          const s = selectedGuest;
          const { browser, os } = parseUA(s.userAgent);
          const sessionSecs = s.timeSpent || 0;
          const durationSecs = s.firstSeen && s.lastSeen
            ? Math.floor((new Date(s.lastSeen) - new Date(s.firstSeen)) / 1000) : 0;
          const accuracy = s.cardsStudied > 0
            ? Math.round((s.cardsCorrect / s.cardsStudied) * 100) : null;
          const fmtSecs = (sec) => {
            if (!sec || sec <= 0) return '—';
            if (sec < 60) return `${sec}s`;
            const m = Math.floor(sec / 60), r = sec % 60;
            return r > 0 ? `${m}m ${r}s` : `${m}m`;
          };
          const deviceIcon = s.deviceType === 'mobile'  ? '📱' :
                             s.deviceType === 'tablet'  ? '📟' :
                             s.deviceType === 'desktop' ? '💻' : '❓';
          const deviceLabel = s.deviceType === 'mobile'  ? 'Mobile Phone' :
                              s.deviceType === 'tablet'  ? 'Tablet' :
                              s.deviceType === 'desktop' ? 'Desktop / Laptop' : 'Unknown Device';
          return (
            <div className="user-detail-overlay" onClick={closeGuestDetail}>
              <div className="user-detail-panel" onClick={(e) => e.stopPropagation()}>

                {/* ── Panel Header ── */}
                <div className="panel-header">
                  <div className="panel-avatar guest-avatar">{deviceIcon}</div>
                  <div className="panel-header-info">
                    <h2>Guest Session</h2>
                    <span className="panel-email">{s.ip}</span>
                    <div className="panel-badges">
                      <span className="guest-device-pill">{deviceIcon} {deviceLabel}</span>
                      {s.convertedToUser && (
                        <span className="guest-converted-badge">✔ Signed Up</span>
                      )}
                    </div>
                  </div>
                  <button className="panel-close" onClick={closeGuestDetail}>×</button>
                </div>

                {/* ── Panel Body ── */}
                <div className="panel-body">

                  {/* Location */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">📍 Location</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Country</span>
                        <span className="ps-value">
                          {s.country && s.country !== 'Unknown'
                            ? <>{countryFlag(s.countryCode)} {s.country}</>
                            : '— Unknown'}
                        </span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">City</span>
                        <span className="ps-value">{s.city || '—'}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">IP Address</span>
                        <span className="ps-value ps-mono">{s.ip || '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Platform & Device */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">{deviceIcon} Platform &amp; Device</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Platform</span>
                        <span className="ps-value ps-highlight">Web App</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Device Type</span>
                        <span className="ps-value">{deviceIcon} {deviceLabel}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Operating System</span>
                        <span className="ps-value">{os}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Browser</span>
                        <span className="ps-value">{browser}</span>
                      </div>
                      {s.referrer && (
                        <div className="panel-stat full-width">
                          <span className="ps-label">Referred From</span>
                          <span className="ps-value ps-mono" style={{ wordBreak: 'break-all', fontSize: '0.78rem' }}>
                            {s.referrer}
                          </span>
                        </div>
                      )}
                      {s.userAgent && (
                        <div className="panel-stat full-width">
                          <span className="ps-label">User Agent</span>
                          <span className="ps-value ps-mono" style={{ fontSize: '0.72rem', wordBreak: 'break-all', opacity: 0.75 }}>
                            {s.userAgent}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">🌐 Language</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Native Language</span>
                        <span className="ps-value">{LANGUAGES[s.nativeLanguage]?.flag} {LANGUAGES[s.nativeLanguage]?.name || s.nativeLanguage}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Learning</span>
                        <span className="ps-value">{LANGUAGES[s.targetLanguage]?.flag} {LANGUAGES[s.targetLanguage]?.name || s.targetLanguage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">📊 Engagement</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Time on Site</span>
                        <span className="ps-value ps-highlight">{fmtSecs(sessionSecs)}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Page Views</span>
                        <span className="ps-value">{s.pageViews || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Cards Studied</span>
                        <span className="ps-value">{s.cardsStudied || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Correct Answers</span>
                        <span className="ps-value" style={{ color: 'var(--mastered)' }}>
                          ✓ {s.cardsCorrect || 0}
                        </span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Incorrect Answers</span>
                        <span className="ps-value" style={{ color: 'var(--accent-red)' }}>
                          ✗ {s.cardsIncorrect || 0}
                        </span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Accuracy</span>
                        <span className={`ps-value guest-accuracy ${accuracy !== null ? (accuracy >= 70 ? 'good' : accuracy >= 40 ? 'mid' : 'low') : ''}`}>
                          {accuracy !== null ? `${accuracy}%` : '—'}
                        </span>
                      </div>
                      {s.cardsStudied > 0 && (
                        <div className="panel-stat full-width">
                          <span className="ps-label">Accuracy Bar</span>
                          <div className="guest-accuracy-bar">
                            <div
                              className="guest-accuracy-fill"
                              style={{ width: `${accuracy}%`, background: accuracy >= 70 ? 'var(--mastered)' : accuracy >= 40 ? '#f59e0b' : 'var(--accent-red)' }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="panel-stat">
                        <span className="ps-label">Lessons Viewed</span>
                        <span className="ps-value">{s.lessonsViewed || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Audio Plays</span>
                        <span className="ps-value">🔊 {s.audioPlays || 0}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Last Page Visited</span>
                        <span className="ps-value">
                          {s.lastActivity === 'flashcards' ? '🃏 Flashcards' :
                           s.lastActivity === 'lessons'    ? '📚 Lessons'    :
                           s.lastActivity === 'home'       ? '🏠 Home'       :
                           s.lastActivity || '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Session Timeline */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">🕒 Session Timeline</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">First Seen</span>
                        <span className="ps-value">{formatDate(s.firstSeen)}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Last Seen</span>
                        <span className="ps-value">{formatDate(s.lastSeen)}</span>
                      </div>
                      <div className="panel-stat">
                        <span className="ps-label">Session Duration</span>
                        <span className="ps-value ps-highlight">{fmtSecs(durationSecs)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="panel-section">
                    <h3 className="panel-section-title">🎯 Outcome</h3>
                    <div className="panel-grid">
                      <div className="panel-stat">
                        <span className="ps-label">Converted to User</span>
                        <span className="ps-value">
                          {s.convertedToUser
                            ? <span className="guest-converted-badge">✔ Signed Up</span>
                            : <span style={{ color: 'var(--text-muted)' }}>No</span>}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })()}

        {/* ── User Detail Panel ── */}
        {selectedUser && (
          <div className="user-detail-overlay" onClick={closeUserDetail}>
            <div className="user-detail-panel" onClick={(e) => e.stopPropagation()}>
              {/* Panel Header */}
              <div className="panel-header">
                <div className={`panel-avatar ${detail?.role === 'admin' ? 'admin' : ''}`}>
                  {detail?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="panel-header-info">
                  <h2>{detail?.username}</h2>
                  <span className="panel-email">{detail?.email}</span>
                  <div className="panel-badges">
                    <span className={`status-badge ${detail?.status}`}>
                      {detail?.status === 'active' ? '✓ Active' : '✕ Suspended'}
                    </span>
                    <span className={`role-badge ${detail?.role}`}>
                      {detail?.role === 'admin' ? '👑 Admin' : 'User'}
                    </span>
                    {formatMode(detail?.xpDecayEnabled)}
                  </div>
                </div>
                <button className="panel-close" onClick={closeUserDetail}>×</button>
              </div>

              {/* Panel Body */}
              <div className="panel-body">
                {detailLoading ? (
                  <div className="panel-loading">Loading details…</div>
                ) : (
                  <>
                    {/* XP & Learning */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">⭐ XP &amp; Learning</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Total XP</span>
                          <span className="ps-value ps-highlight">{detail?.totalXP || 0} XP</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Weekly XP</span>
                          <span className="ps-value">{detail?.weeklyXP || 0} XP</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Language Pair</span>
                          <span className="ps-value">{langPair(detail?.nativeLanguage, detail?.targetLanguage)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Flashcards Created</span>
                          <span className="ps-value">{detailStats?.flashcardCount ?? '—'}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Progress Records</span>
                          <span className="ps-value">{detailStats?.progressCount ?? '—'}</span>
                        </div>
                      </div>
                      {detailStats?.progressBreakdown && Object.keys(detailStats.progressBreakdown).length > 0 && (
                        <div className="mastery-breakdown">
                          {Object.entries(detailStats.progressBreakdown).map(([status, count]) => (
                            <span key={status} className={`mastery-chip mastery-${status}`}>{status}: {count}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Streak */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">🔥 Streak</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Current Streak</span>
                          <span className="ps-value ps-highlight">🔥 {detail?.currentStreak || 0} days</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Longest Streak</span>
                          <span className="ps-value">🏆 {detail?.longestStreak || 0} days</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Study Date</span>
                          <span className="ps-value">{detail?.lastStudyDate || '—'}</span>
                        </div>
                      </div>
                      {detail?.streakHistory && (
                        <div className="streak-week-row">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className={`streak-dot ${detail.streakHistory[i] ? 'active' : ''}`}>
                              <span>{day}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Daily Quests */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">🎯 Daily Quests</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">XP Today</span>
                          <span className="ps-value">{detail?.dailyXpEarned || 0}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Time Today</span>
                          <span className="ps-value">{formatTimeSpent(detail?.dailyTimeSpent)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">High-Score Lessons</span>
                          <span className="ps-value">{detail?.dailyHighScoreLessons || 0}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Quest Reset</span>
                          <span className="ps-value">{detail?.questResetDate || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">📊 Activity</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Total Time</span>
                          <span className="ps-value ps-highlight">{formatTimeSpent(detail?.totalTimeSpent)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Login Count</span>
                          <span className="ps-value">{detail?.loginCount || 0}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Login</span>
                          <span className="ps-value">{formatDate(detail?.lastLogin)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Active</span>
                          <span className="ps-value">{formatDate(detail?.lastActive)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Last Activity</span>
                          <span className="ps-value">{formatActivity(detail?.lastActivityType)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Rate Limit Hits</span>
                          <span className="ps-value">{detail?.rateLimitHits || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">📍 Location</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Country</span>
                          <span className="ps-value">
                            {detail?.lastCountry && detail.lastCountry !== 'Unknown'
                              ? <>{countryFlag(detail.lastCountry)} {detail.lastCountry}</>
                              : '—'}
                          </span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">City</span>
                          <span className="ps-value">{detail?.lastCity || '—'}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">IP Address</span>
                          <span className="ps-value ps-mono">{detail?.lastIp || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Account */}
                    <div className="panel-section">
                      <h3 className="panel-section-title">🔐 Account</h3>
                      <div className="panel-grid">
                        <div className="panel-stat">
                          <span className="ps-label">Joined</span>
                          <span className="ps-value">{formatDate(detail?.createdAt)}</span>
                        </div>
                        <div className="panel-stat">
                          <span className="ps-label">Email Verified</span>
                          <span className="ps-value">{detail?.emailVerified ? '✅ Yes' : '❌ No'}</span>
                        </div>
                        {detail?.suspendReason && (
                          <div className="panel-stat full-width">
                            <span className="ps-label">Suspend Reason</span>
                            <span className="ps-value">{detail.suspendReason}</span>
                          </div>
                        )}
                        {detail?.suspendedAt && (
                          <div className="panel-stat">
                            <span className="ps-label">Suspended At</span>
                            <span className="ps-value">{formatDate(detail.suspendedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Panel Actions */}
                    {detail?.role !== 'admin' && (
                      <div className="panel-actions">
                        {detail?.status === 'active' ? (
                          <button className="btn btn-danger" onClick={() => { closeUserDetail(); setSuspendModal({ show: true, user: detail, reason: '' }); }}>
                            🚫 Suspend
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => { handleUnsuspendUser(detail); closeUserDetail(); }}>
                            ✅ Unsuspend
                          </button>
                        )}
                        <button className="btn btn-outline" onClick={() => { handleDeleteUser(detail); }}>
                          🗑️ Delete User
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
