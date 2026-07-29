import { useTheme } from '../../context/ThemeContext';

function useMotionTheme() {
  let isDark = false;
  try {
    const themeCtx = useTheme();
    isDark = themeCtx?.isDark ?? false;
  } catch (e) {
    // fallback if outside provider
  }

  return {
    isDark,
    duration: 300,
    easing: 'ease-in-out',
  };
}

export default useMotionTheme;
