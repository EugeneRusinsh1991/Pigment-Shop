import React from 'react';
import { View } from 'react-native';
import { ChipButton } from '../Button';
import { layout } from '../../theme/tokens';

const LANGUAGES = [
  { code: 'uk', label: 'UA' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export function LanguageTabs({ activeLang, onChange }) {
  return (
    <View style={{ flexDirection: 'row', gap: layout.spacing.sm, marginBottom: layout.spacing.lg }}>
      {LANGUAGES.map((item) => {
        const isActive = activeLang === item.code;
        return (
          <ChipButton
            key={item.code}
            label={item.label}
            active={isActive}
            variant="rect"
            onPress={() => onChange(item.code)}
          />
        );
      })}
    </View>
  );
}
