import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ttsService } from '../services/api';
import speechService from '../services/speechService';
import { useSettingsStore } from '../stores/settingsStore';
import { useAppColors, type AppColors } from '../config/theme';
import { formatVoiceOptions } from '../utils/voiceDisplay';

const SAMPLE_PHRASES: Record<string, string> = {
  ko: '안녕하세요. 만나서 반갑습니다.',
  en: 'Hi there. It is nice to meet you.',
  es: 'Hola. Encantado de conocerte.',
  fr: 'Bonjour. Ravi de vous rencontrer.',
  de: 'Hallo. Schön, dich kennenzulernen.',
  ja: 'こんにちは。お会いできて嬉しいです。',
  zh: '你好。很高兴见到你。',
  hi: 'नमस्ते। आपसे मिलकर खुशी हुई।',
  ar: 'مرحبًا. سعيد بلقائك.',
  pt: 'Olá. Prazer em conhecê-lo.',
  it: 'Ciao. Piacere di conoscerti.',
  ru: 'Здравствуйте. Приятно познакомиться.',
  id: 'Halo. Senang berkenalan.',
  ms: 'Helo. Senang berkenalan dengan anda.',
  tr: 'Merhaba. Tanıştığımıza memnun oldum.',
  he: 'שלום. נעים להכיר.',
  nl: 'Hallo. Leuk je te ontmoeten.',
  fil: 'Kumusta. Ikinagagalak kitang makilala.',
  bn: 'নমস্কার। আপনার সাথে পরিচয় হয়ে ভালো লাগল।',
  ta: 'வணக்கம். உங்களைச் சந்தித்ததில் மகிழ்ச்சி.',
};

const samplePhraseFor = (code?: string) => SAMPLE_PHRASES[String(code || '').toLowerCase()] || 'Hello. Nice to meet you.';

interface Voice {
  name: string;
  displayName: string;
  lang: string;
  gender: string;
}

interface Props {
  visible: boolean;
  targetLangCode: string;
  targetLangName: string;
  ttsLocale: string;
  onClose: () => void;
  onPicked?: (voiceName: string) => void;
}

const VoicePickerModal: React.FC<Props> = ({
  visible,
  targetLangCode,
  targetLangName,
  ttsLocale,
  onClose,
  onPicked,
}) => {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const { t, i18n } = useTranslation();
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewing, setPreviewing] = useState('');
  const setVoice = useSettingsStore((state) => state.setVoice);
  const phrase = useMemo(() => samplePhraseFor(targetLangCode), [targetLangCode]);
  const displayVoices = useMemo(() => formatVoiceOptions(voices, {
    languageCode: targetLangCode,
    t,
    uiLanguage: i18n.resolvedLanguage || i18n.language,
  }), [voices, targetLangCode, t, i18n.resolvedLanguage, i18n.language]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    setVoices([]);
    const localePrefix = String(ttsLocale || '').split('-')[0];
    ttsService.getVoices(localePrefix)
      .then((response) => {
        if (cancelled) return;
        const list = Array.isArray(response.data) ? response.data : [];
        const seen = new Set<string>();
        const filtered: Voice[] = [];
        for (const v of list) {
          const key = `${v.Locale || ''}|${v.Gender || ''}`;
          if (seen.has(key)) continue;
          seen.add(key);
          filtered.push({
            name: v.ShortName,
            displayName: v.FriendlyName || v.ShortName,
            lang: v.Locale,
            gender: v.Gender || '',
          });
          if (filtered.length >= 6) break;
        }
        setVoices(filtered);
      })
      .catch(() => {
        if (!cancelled) setError(t('voicePicker.loadError', 'Could not load voice options. The default voice will be used.'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
      speechService.cancel().catch(() => {});
    };
  }, [visible, t, ttsLocale]);

  const preview = async (voice: Voice) => {
    setPreviewing(voice.name);
    try {
      await speechService.speakAsync(phrase, {
        lang: voice.lang || ttsLocale,
        voice: voice.name,
        rate: '-5%',
      });
    } finally {
      setPreviewing((current) => (current === voice.name ? '' : current));
    }
  };

  const choose = async (voice: Voice) => {
    await speechService.cancel();
    setVoice(voice.name, targetLangCode);
    await AsyncStorage.setItem('classVoicePickerSeen', '1');
    onPicked?.(voice.name);
  };

  const skip = async () => {
    await speechService.cancel();
    await AsyncStorage.setItem('classVoicePickerSeen', '1');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={skip}>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text variant="titleMedium" style={styles.title}>
            {t('voicePicker.title', { lang: targetLangName || t('voicePicker.targetFallback', 'your target language'), defaultValue: 'Pick a voice for {{lang}}' })}
          </Text>
          <Text style={styles.subtitle}>
            {t('voicePicker.subtitle', 'Tap a voice to hear a sample sentence, then choose the one you want for class.')}
          </Text>

          {loading && <Text style={styles.status}>{t('voicePicker.loading', 'Loading voices…')}</Text>}
          {!!error && <Text style={styles.error}>{error}</Text>}

          <ScrollView style={styles.list}>
            {displayVoices.map(({ voice, name, display }) => (
              <View key={name} style={styles.row}>
                <View style={styles.info}>
                  <Text style={styles.voiceName}>{display.primary}</Text>
                  <Text style={styles.voiceMeta}>{display.secondary}</Text>
                </View>
                <View style={styles.actions}>
                  <Button
                    mode="outlined"
                    compact
                    onPress={() => preview(voice)}
                    disabled={previewing === voice.name}
                  >
                    {previewing === voice.name ? t('voicePicker.playing', 'Playing…') : t('voicePicker.listen', 'Listen')}
                  </Button>
                  <Button
                    mode="contained-tonal"
                    compact
                    onPress={() => choose(voice)}
                  >
                    {t('voicePicker.use', 'Use')}
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>

          <Button mode="text" onPress={skip} style={styles.skip}>
            {t('voicePicker.useDefault', 'Use the default voice for now')}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: AppColors) => StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '85%',
  },
  title: {
    marginBottom: 6,
    color: colors.textPrimary,
  },
  subtitle: {
    marginBottom: 12,
    fontSize: 13,
    color: colors.textSecondary,
  },
  status: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  error: {
    fontSize: 13,
    color: '#b91c1c',
    marginBottom: 6,
  },
  list: {
    maxHeight: 360,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.background,
    marginBottom: 8,
    gap: 8,
  },
  info: {
    flex: 1,
    paddingRight: 6,
  },
  voiceName: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  voiceMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  skip: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});

export default VoicePickerModal;
