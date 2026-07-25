import React from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import ContactPage from '../../src/features/contact/ContactPage';
import PageTransition from '../../src/components/PageTransition';

export default function ContactRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="contact">
      <ContactPage isDark={isDark} />
    </PageTransition>
  );
}
