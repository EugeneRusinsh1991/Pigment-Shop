import { useCallback, useState } from 'react';

/**
 * Controller hook for the NavMenu UI.
 * Manages view-state transitions and menu selection routing,
 * decoupling presentational components from interaction logic.
 */

export function useNavMenuController({
  onClose,
}) {
  const [history, setHistory] = useState(['main']);

  const currentView = history[history.length - 1] || 'main';

  const pushView = useCallback((nextView) => {
    setHistory((prev) => [...prev, nextView]);
  }, []);

  const popView = useCallback(() => {
    setHistory((prev) => {
      if (prev.length <= 1) {
        if (onClose) onClose();
        return prev;
      }
      return prev.slice(0, -1);
    });
  }, [onClose]);

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      popView();
    } else {
      if (onClose) onClose();
    }
  }, [history.length, popView, onClose]);

  const resetView = useCallback(() => {
    setHistory(['main']);
  }, []);

  return {
    view: currentView,
    history,
    depth: history.length - 1,
    pushView,
    popView,
    resetView,
    handleBack,
  };
}
