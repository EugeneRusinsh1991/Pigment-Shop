import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import ContactPage from '@/features/contact/ContactPage';
import PageTransition from '@/components/PageTransition';

export default function ContactRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="contact">
      <ContactPage isDark={isDark} />
    </PageTransition>
  );
}
