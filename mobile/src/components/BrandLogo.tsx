import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const markSource = require('../../assets/brand/logo-mark.png');
const wordmarkSource = require('../../assets/brand/logo-wordmark.png');

type BrandLogoProps = {
  variant?: 'mark' | 'wordmark' | 'lockup';
  markSize?: number;
  wordmarkWidth?: number;
  style?: StyleProp<ViewStyle>;
};

const WORDMARK_RATIO = 1084 / 230;

const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'lockup',
  markSize = 56,
  wordmarkWidth = 176,
  style,
}) => {
  const wordmarkHeight = wordmarkWidth / WORDMARK_RATIO;

  if (variant === 'mark') {
    return (
      <View style={[styles.container, style]}>
        <Image source={markSource} style={{ width: markSize, height: markSize }} resizeMode="contain" />
      </View>
    );
  }

  if (variant === 'wordmark') {
    return (
      <View style={[styles.container, style]}>
        <Image source={wordmarkSource} style={{ width: wordmarkWidth, height: wordmarkHeight }} resizeMode="contain" />
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.lockup, style]}>
      <Image source={markSource} style={{ width: markSize, height: markSize }} resizeMode="contain" />
      <Image source={wordmarkSource} style={{ width: wordmarkWidth, height: wordmarkHeight }} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockup: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default BrandLogo;
