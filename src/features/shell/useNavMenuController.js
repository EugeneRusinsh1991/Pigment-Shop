import { useEffect, useState } from 'react';

/**
 * Controller hook for the NavMenu UI.
 * Manages view-state transitions and menu selection routing,
 * decoupling presentational components from interaction logic.
 */

export function useNavMenuController({
  onClose,
}) {
  const handleBack = () => {
    if (onClose) onClose();
  };

  return {
    view: 'main',
    handleBack,
  };
}
