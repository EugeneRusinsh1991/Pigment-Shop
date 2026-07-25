import React, { useState } from 'react';
import HeaderDropdown from './HeaderDropdown';

const CURRENCIES = [
  { code: 'UAH', label: 'UAH' },
  { code: 'USD', label: 'USD' },
];

export default function CurrencyDropdown({ showCurrencyMenu, isDark }) {
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');

  return (
    <HeaderDropdown
      isVisible={showCurrencyMenu}
      isDark={isDark}
      items={CURRENCIES}
      selectedValue={selectedCurrency}
      onSelect={setSelectedCurrency}
    />
  );
}
