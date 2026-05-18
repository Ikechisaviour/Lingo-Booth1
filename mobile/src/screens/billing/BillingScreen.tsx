import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, SegmentedButtons } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { billingService } from '../../services/api';
import { useAppColors, shadows, type AppColors } from '../../config/theme';
import { useAuthStore } from '../../stores/authStore';

type Plan = {
  id: string;
  name: string;
  tagline?: string;
  monthlyPriceCents?: number | null;
  annualPriceCents?: number | null;
  monthlyPriceCentsBeforeDiscount?: number | null;
  annualPriceCentsBeforeDiscount?: number | null;
  discountedMonthlyPriceCents?: number | null;
  discountedAnnualPriceCents?: number | null;
  automaticDiscountMonthly?: DiscountSummary | null;
  automaticDiscountAnnual?: DiscountSummary | null;
  seatPriceMonthlyCents?: number | null;
  minimumSeats?: number;
  features?: string[];
};

type DiscountSummary = {
  discountType?: 'percent' | 'fixed';
  percentOff?: number | null;
  amountOffCents?: number | null;
  description?: string;
};

const planNameKey = (plan: Plan) => `pricing.planNames.${plan.id}`;
const planTaglineKey = (plan: Plan) => `pricing.planTaglines.${plan.id}`;

const formatPrice = (
  cents: number | null | undefined,
  cadence: 'monthly' | 'annual',
  t: (key: string, options?: any) => string,
) => {
  if (cents == null) return null;
  if (cents === 0) return t('pricing.freePrice', '$0');
  const amount = `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
  return cadence === 'annual'
    ? t('pricing.priceAnnual', { amount, defaultValue: '{{amount}}/yr' })
    : t('pricing.priceMonthly', { amount, defaultValue: '{{amount}}/mo' });
};

const formatAmount = (cents: number | null | undefined) => {
  if (cents == null) return '';
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
};

const discountLabel = (
  discount: DiscountSummary | null | undefined,
  t: (key: string, options?: any) => string,
) => {
  if (!discount) return '';
  if (discount.discountType === 'percent' && discount.percentOff) {
    return `${discount.percentOff}%`;
  }
  if (discount.discountType === 'fixed' && discount.amountOffCents) {
    return formatAmount(discount.amountOffCents);
  }
  return discount.description || '';
};

const BillingScreen: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<any>();
  const { username, token, isGuest, logout } = useAuthStore();
  const [plans, setPlans] = useState<{ individual: Plan[]; institutional: Plan[] }>({ individual: [], institutional: [] });
  const [interval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(true);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [seats, setSeats] = useState('25');
  const [message, setMessage] = useState('');

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      const res = await billingService.getPlans();
      setPlans(res.data || { individual: [], institutional: [] });
    } catch {
      Alert.alert(t('common.error'), t('pricing.loadFailed'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const choosePlan = async (plan: Plan) => {
    if (plan.id === 'free') return;
    if (!token || isGuest) {
      Alert.alert(
        t('pricing.signInToChooseTitle', 'Create an account to continue'),
        t('pricing.signInToChooseBody', 'Create an account or sign in before choosing a paid plan so your access can be attached to you.'),
        [
          {
            text: t('login.loginButton', 'Login'),
            onPress: () => {
              if (isGuest) {
                logout();
                return;
              }
              navigation.navigate('Login');
            },
          },
          {
            text: t('register.signUpButton', 'Sign Up'),
            onPress: () => {
              if (isGuest) {
                logout();
                return;
              }
              navigation.navigate('LanguageSelect', { mode: 'register' });
            },
          },
        ],
      );
      return;
    }
    setBusyPlan(plan.id);
    try {
      const res = await billingService.verifyMobilePurchase({
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
        planId: plan.id,
      });
      Alert.alert(
        t('billing.title'),
        res.data?.message || t('billing.portalSetupNeeded'),
      );
    } catch (error: any) {
      Alert.alert(t('common.error'), error.response?.data?.message || t('pricing.checkoutFailed'));
    } finally {
      setBusyPlan(null);
    }
  };

  const sendInstitutionRequest = async () => {
    try {
      await billingService.sendInstitutionalInquiry({
        organizationName,
        organizationType: 'other',
        contactName: username || '',
        email,
        planId: 'institution_pro',
        seatsRequested: Number(seats) || 1,
        message,
      });
      setOrganizationName('');
      setMessage('');
      Alert.alert(t('pricing.institutionalTitle'), t('pricing.institutionalSent'));
    } catch (error: any) {
      Alert.alert(t('common.error'), error.response?.data?.message || t('pricing.institutionalFailed'));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>{t('billing.kicker')}</Text>
        <Text style={styles.title}>{t('pricing.title')}</Text>
        <Text style={styles.subtitle}>{t('pricing.subtitle')}</Text>
      </View>

      <SegmentedButtons
        value={interval}
        onValueChange={(value) => setBillingInterval(value as 'monthly' | 'annual')}
        buttons={[
          { value: 'monthly', label: t('pricing.monthly') },
          { value: 'annual', label: t('pricing.annual') },
        ]}
        style={styles.segmented}
      />

      {loading ? (
        <Text style={styles.muted}>{t('common.loading')}</Text>
      ) : plans.individual.map((plan) => {
        const name = t(planNameKey(plan), plan.name);
        const tagline = t(planTaglineKey(plan), plan.tagline || '');
        const discount = interval === 'annual' ? plan.automaticDiscountAnnual : plan.automaticDiscountMonthly;
        const currentPriceCents = interval === 'annual'
          ? plan.discountedAnnualPriceCents ?? plan.annualPriceCents
          : plan.discountedMonthlyPriceCents ?? plan.monthlyPriceCents;
        const originalPriceCents = interval === 'annual'
          ? plan.annualPriceCentsBeforeDiscount ?? plan.annualPriceCents
          : plan.monthlyPriceCentsBeforeDiscount ?? plan.monthlyPriceCents;
        const hasAutomaticDiscount = !!discount && originalPriceCents != null && currentPriceCents != null && currentPriceCents < originalPriceCents;
        return (
        <Card key={plan.id} style={[styles.card, plan.id === 'pro' && styles.highlighted]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.planHead}>
              <View style={styles.planTitleWrap}>
                <Text style={styles.planName}>{name}</Text>
                {!!tagline && <Text style={styles.muted}>{tagline}</Text>}
              </View>
              <View style={styles.priceWrap}>
                {hasAutomaticDiscount && (
                  <Text style={styles.originalPrice}>
                    {formatPrice(originalPriceCents, interval, t)}
                  </Text>
                )}
                <Text style={styles.price}>
                  {formatPrice(currentPriceCents, interval, t)}
                </Text>
                {hasAutomaticDiscount && (
                  <Text style={styles.discountBadge}>
                    {t('pricing.automaticDiscountApplied', { discount: discountLabel(discount, t) })}
                  </Text>
                )}
              </View>
            </View>
            {(plan.features || []).slice(0, 5).map((feature) => (
              <Text key={feature} style={styles.feature}>- {t(`pricing.features.${feature}`, feature)}</Text>
            ))}
            <Button
              mode={plan.id === 'pro' ? 'contained' : 'outlined'}
              onPress={() => choosePlan(plan)}
              disabled={plan.id === 'free' || busyPlan === plan.id}
              style={styles.planButton}
            >
              {plan.id === 'free'
                ? t('pricing.startFree')
                : busyPlan === plan.id
                  ? t('common.loading')
                  : t('pricing.choosePlan', { plan: name })}
            </Button>
          </Card.Content>
        </Card>
        );
      })}

      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.kicker}>{t('pricing.institutionalKicker')}</Text>
          <Text style={styles.sectionTitle}>{t('pricing.institutionalTitle')}</Text>
          <Text style={styles.muted}>{t('pricing.institutionalSubtitle')}</Text>
          <TextInput label={t('pricing.organizationName')} value={organizationName} onChangeText={setOrganizationName} mode="outlined" />
          <TextInput label={t('pricing.email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" mode="outlined" />
          <TextInput label={t('pricing.seats')} value={seats} onChangeText={setSeats} keyboardType="number-pad" mode="outlined" />
          <TextInput label={t('pricing.message')} value={message} onChangeText={setMessage} mode="outlined" multiline numberOfLines={4} />
          <Button mode="contained" onPress={sendInstitutionRequest} disabled={!organizationName || !email}>
            {t('pricing.sendInstitutionalRequest')}
          </Button>
        </Card.Content>
      </Card>

      <Button mode="outlined" onPress={() => navigation.navigate('Contact')}>
        {t('contact.navLabel', 'Contact')}
      </Button>
    </ScrollView>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40, gap: 14 },
  header: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 21,
  },
  segmented: { marginVertical: 4 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    ...shadows.sm,
  },
  highlighted: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cardContent: { gap: 12 },
  planHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  planTitleWrap: { flex: 1 },
  planName: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  price: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  priceWrap: {
    alignItems: 'flex-end',
    flexShrink: 0,
    maxWidth: 150,
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  discountBadge: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'right',
    marginTop: 2,
  },
  muted: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  feature: {
    color: colors.textPrimary,
    lineHeight: 21,
  },
  planButton: { marginTop: 6 },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
});

export default BillingScreen;
