import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from '../config/theme';

type PronunciationItem = {
  romanization?: string;
  pronunciation?: string;
  officialPronunciation?: string;
  learnerPronunciation?: string;
  pronunciationConfidence?: 'strong' | 'approximate' | 'audioFirst';
  pronunciationGuide?: {
    learner?: string;
    official?: string;
    confidence?: 'strong' | 'approximate' | 'audioFirst';
  };
};

const clean = (value?: string) => String(value || '').replace(/\s+/g, ' ').trim();
const comparable = (value?: string) => clean(value)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

function differs(a?: string, b?: string) {
  const left = comparable(a);
  const right = comparable(b);
  return !!left && !!right && left !== right;
}

export function getPronunciationLines(item: PronunciationItem = {}, targetText = '') {
  const guide = item.pronunciationGuide || {};
  const learner = clean(item.learnerPronunciation || guide.learner);
  const official = clean(item.officialPronunciation || guide.official || item.romanization || item.pronunciation);
  const target = clean(targetText);
  const showLearner = learner && differs(learner, target);
  const showOfficial = official
    && differs(official, target)
    && (!learner || differs(official, learner));

  return {
    learner: showLearner ? learner : '',
    official: showOfficial ? official : '',
    confidence: item.pronunciationConfidence || guide.confidence || 'strong',
  };
}

type Props = {
  item?: PronunciationItem;
  targetText?: string;
  style?: StyleProp<ViewStyle>;
  learnerStyle?: StyleProp<TextStyle>;
  officialStyle?: StyleProp<TextStyle>;
};

const PronunciationGuide: React.FC<Props> = ({
  item,
  targetText = '',
  style,
  learnerStyle,
  officialStyle,
}) => {
  const { learner, official, confidence } = getPronunciationLines(item || {}, targetText);
  if (!learner && !official) return null;

  return (
    <View style={[styles.container, style]}>
      {!!learner && <Text style={[styles.learner, learnerStyle]}>{learner}</Text>}
      {!!official && <Text style={[styles.official, officialStyle]}>{official}</Text>}
      {confidence === 'audioFirst' && (
        <Text style={styles.note}>Listen closely. This spelling is only a guide.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  learner: {
    color: colors.accentGreen,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  official: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  note: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PronunciationGuide;
