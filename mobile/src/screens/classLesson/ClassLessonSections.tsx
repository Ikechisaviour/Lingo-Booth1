import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

type CommonProps = {
  styles: Record<string, any>;
  t: (key: string, options?: any) => string;
};

type SpeechControlsProps = CommonProps & {
  speechEnabled: boolean;
  speakNativeGloss: boolean;
  speechInputMode: 'target' | 'native';
  listening: boolean;
  tutorLoading: boolean;
  nativeName: string;
  targetName: string;
  onToggleSpeech: () => void;
  onToggleNativeGloss: () => void;
  onSelectSpeechInputMode: (mode: 'target' | 'native') => void;
  onToggleListening: () => void;
};

export const ClassLessonSpeechControls: React.FC<SpeechControlsProps> = ({
  styles,
  t,
  speechEnabled,
  speakNativeGloss,
  speechInputMode,
  listening,
  tutorLoading,
  nativeName,
  targetName,
  onToggleSpeech,
  onToggleNativeGloss,
  onSelectSpeechInputMode,
  onToggleListening,
}) => (
  <View style={styles.speechRow}>
    <Button
      mode={speechEnabled ? 'contained-tonal' : 'outlined'}
      icon={speechEnabled ? 'volume-high' : 'volume-off'}
      onPress={onToggleSpeech}
      style={styles.speechButton}
    >
      {speechEnabled
        ? t('classLesson.spokenRepliesOn', 'Spoken replies on')
        : t('classLesson.spokenRepliesOff', 'Spoken replies off')}
    </Button>
    <Button
      mode={speakNativeGloss ? 'contained-tonal' : 'outlined'}
      onPress={onToggleNativeGloss}
      style={styles.speechButton}
    >
      {speakNativeGloss
        ? t('classLesson.speakLanguage', { lang: nativeName, defaultValue: 'Speak {{lang}}' })
        : t('classLesson.languageSilent', { lang: nativeName, defaultValue: '{{lang}} silent' })}
    </Button>
    <Button
      mode={speechInputMode === 'target' ? 'contained-tonal' : 'outlined'}
      onPress={() => onSelectSpeechInputMode('target')}
      style={styles.speechButton}
    >
      {t('classLesson.languageMic', { lang: targetName, defaultValue: '{{lang}} mic' })}
    </Button>
    <Button
      mode={speechInputMode === 'native' ? 'contained-tonal' : 'outlined'}
      onPress={() => onSelectSpeechInputMode('native')}
      style={styles.speechButton}
    >
      {t('classLesson.languageMic', { lang: nativeName, defaultValue: '{{lang}} mic' })}
    </Button>
    <Button
      mode={listening ? 'contained' : 'outlined'}
      icon={listening ? 'microphone-off' : 'microphone'}
      onPress={onToggleListening}
      disabled={tutorLoading}
      style={styles.speechButton}
    >
      {listening ? t('classLesson.stopMic', 'Stop mic') : t('classLesson.speak', 'Speak')}
    </Button>
  </View>
);

type TutorComposerProps = CommonProps & {
  progressSyncState: 'local' | 'synced';
  input: string;
  listening: boolean;
  tutorLoading: boolean;
  onChangeInput: (value: string) => void;
  onToggleListening: () => void;
  onSend: () => void;
};

export const ClassLessonTutorComposer: React.FC<TutorComposerProps> = ({
  styles,
  t,
  progressSyncState,
  input,
  listening,
  tutorLoading,
  onChangeInput,
  onToggleListening,
  onSend,
}) => (
  <View style={styles.mobileTutorInput}>
    <Text style={styles.syncNote}>
      {progressSyncState === 'synced'
        ? t('classLesson.progressSynced', 'Progress synced.')
        : t('classLesson.progressLocal', 'Progress saved on this device.')}
    </Text>
    <TextInput
      mode="outlined"
      value={input}
      onChangeText={onChangeInput}
      placeholder={t('classLesson.inputPlaceholder', 'Ask a question or type your answer...')}
      multiline
      style={styles.classTutorInput}
    />
    <View style={styles.sendRow}>
      <Button
        mode="outlined"
        icon={listening ? 'microphone-off' : 'microphone'}
        onPress={onToggleListening}
        disabled={tutorLoading}
        style={styles.sendButton}
      >
        {listening ? t('classLesson.stop', 'Stop') : t('classLesson.speak', 'Speak')}
      </Button>
      <Button mode="contained" onPress={onSend} disabled={!input.trim() || tutorLoading} style={styles.sendButton}>
        {t('classLesson.send', 'Send')}
      </Button>
    </View>
  </View>
);

type ActivityStripProps = {
  styles: Record<string, any>;
  activities: Array<{ id: string; section?: string; title?: string }>;
  selectedActivityIndex: number;
  onSelectActivity: (index: number) => void;
};

export const ClassLessonActivityStrip: React.FC<ActivityStripProps> = ({
  styles,
  activities,
  selectedActivityIndex,
  onSelectActivity,
}) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activityStrip}>
    {activities.map((activity, index) => (
      <TouchableOpacity
        key={activity.id}
        style={[styles.activityChip, selectedActivityIndex === index && styles.activityChipActive]}
        onPress={() => onSelectActivity(index)}
      >
        <Text style={[styles.activityChipSection, selectedActivityIndex === index && styles.activityChipSectionActive]}>
          {activity.section}
        </Text>
        <Text style={[styles.activityChipText, selectedActivityIndex === index && styles.activityChipTextActive]}>
          {activity.title}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

type ItemPickerProps = CommonProps & {
  groups: Array<{ label: string; indices: number[] }>;
  items: Array<{ type?: string }>;
  activityItemIndices: number[];
  completedItems: number[];
  selectedIndex: number;
  onSelectItem: (index: number) => void;
};

export const ClassLessonItemPicker: React.FC<ItemPickerProps> = ({
  styles,
  t,
  groups,
  items,
  activityItemIndices,
  completedItems,
  selectedIndex,
  onSelectItem,
}) => {
  const showHeadings = groups.length > 1;

  return (
    <View style={styles.itemPickerGroups}>
      {groups.map((group) => (
        <View key={group.label} style={styles.itemPickerGroup}>
          {showHeadings && (
            <Text style={styles.itemPickerGroupLabel}>
              {t(`classLesson.section.${group.label}`, group.label)} ({group.indices.length})
            </Text>
          )}
          <View style={styles.itemPicker}>
            {group.indices.map((globalIndex) => {
              const item = items[globalIndex];
              if (!item) return null;
              const positionInActivity = activityItemIndices.indexOf(globalIndex);
              return (
                <TouchableOpacity
                  key={`${item.type}-${globalIndex}`}
                  style={[
                    styles.itemChip,
                    completedItems.includes(globalIndex) && styles.itemChipDone,
                    selectedIndex === globalIndex && styles.itemChipActive,
                  ]}
                  onPress={() => onSelectItem(globalIndex)}
                >
                  <Text style={[styles.itemChipText, selectedIndex === globalIndex && styles.itemChipTextActive]}>
                    {positionInActivity + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

type TutorThreadProps = CommonProps & {
  tutorThreadRef: React.RefObject<ScrollView | null>;
  messages: Array<{ id: string; role: 'user' | 'assistant'; error?: boolean; retryInstructionText?: string }>;
  listening: boolean;
  tutorLoading: boolean;
  renderMessageBody: (message: any) => React.ReactNode;
  onReplayMessage: (message: any) => void;
  canSaveMessageForReview: (message: any) => boolean;
  onSaveMessageForReview: (message: any) => void;
  onRetryMessage: (message: any) => void;
};

export const ClassLessonTutorThread: React.FC<TutorThreadProps> = ({
  styles,
  t,
  tutorThreadRef,
  messages,
  listening,
  tutorLoading,
  renderMessageBody,
  onReplayMessage,
  canSaveMessageForReview,
  onSaveMessageForReview,
  onRetryMessage,
}) => (
  <View style={styles.tutorPanel}>
    <View style={styles.tutorPanelHeader}>
      <View>
        <Text style={styles.tutorPanelKicker}>{t('classLesson.tutorThread', 'Tutor thread')}</Text>
        <Text style={styles.tutorPanelTitle}>{t('classLesson.guidedClassHelp', 'Guided class help')}</Text>
      </View>
      <View style={[styles.tutorStatusDot, (listening || tutorLoading) && styles.tutorStatusDotActive]} />
    </View>
    <ScrollView
      ref={tutorThreadRef}
      style={styles.tutorThread}
      contentContainerStyle={styles.tutorThreadContent}
      nestedScrollEnabled
    >
      {messages.map((message) => (
        <View key={message.id} style={[styles.tutorBubble, message.role === 'user' ? styles.tutorBubbleUser : styles.tutorBubbleAssistant]}>
          <Text style={styles.tutorLabel}>{message.role === 'user' ? t('classLesson.you', 'You') : t('classLesson.tutorKicker', 'Tutor')}</Text>
          {renderMessageBody(message)}
          {message.role === 'assistant' && !message.error && (
            <View style={styles.tutorMessageActions}>
              <Button
                mode="text"
                icon="volume-high"
                onPress={() => onReplayMessage(message)}
                compact
                style={styles.replayButton}
                labelStyle={styles.replayLabel}
              >
                {t('classLesson.replay', 'Replay')}
              </Button>
              {canSaveMessageForReview(message) && (
                <Button
                  mode="text"
                  icon="bookmark-outline"
                  onPress={() => onSaveMessageForReview(message)}
                  compact
                  style={styles.replayButton}
                  labelStyle={styles.replayLabel}
                >
                  {t('classLesson.saveReply', 'Save reply')}
                </Button>
              )}
            </View>
          )}
          {message.role === 'assistant' && message.error && !!message.retryInstructionText && (
            <Button
              mode="outlined"
              icon="refresh"
              onPress={() => onRetryMessage(message)}
              compact
              disabled={tutorLoading}
              style={styles.replayButton}
              labelStyle={styles.replayLabel}
            >
              {t('classLesson.retry', 'Retry')}
            </Button>
          )}
        </View>
      ))}
      {tutorLoading && (
        <View style={[styles.tutorBubble, styles.tutorBubbleAssistant]}>
          <Text style={styles.tutorLabel}>{t('classLesson.tutorKicker', 'Tutor')}</Text>
          <Text style={styles.tutorText}>{t('classLesson.preparingExplanation', 'Preparing your next explanation...')}</Text>
        </View>
      )}
    </ScrollView>
  </View>
);
