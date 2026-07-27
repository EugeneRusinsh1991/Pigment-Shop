import { useEffect, useState, useCallback } from 'react';
import { useCatalog } from '../../../context/CatalogContext';
import { useTheme } from '../../../context/ThemeContext';
import { useAdminActions } from '../../../services/adminDomain';
import { catalogStore } from '../../../data/catalogState';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';

export function useBannersWorkflow() {
  const { t } = useTheme();
  const { updateBanners, resetBannersToSeed } = useAdminActions();
  const { banners } = useCatalog();
  const [bannersList, setBannersList] = useState(() => [...banners]);
  const [isDirty, setIsDirty] = useState(false);

  // Pick up external state changes (Firestore sync) only when there are no unsaved local edits
  useEffect(() => {
    if (!isDirty) {
      setBannersList([...banners]);
    }
  }, [banners, isDirty]);

  const { isSaving, handleSave } = useCrudWorkflow({
    saveFn: async () => {
      const res = await updateBanners(bannersList);
      if (res && !res.success) throw new Error(res.error);
      setIsDirty(false);
      return res;
    },
    successMessageTitle: t('adminBannersSaveSuccess'),
    errorMessageTitle: 'Failed to save banners',
  });

  const handleReset = async () => {
    try {
      const res = await resetBannersToSeed();
      if (!res.success) throw new Error(res.error);
      setBannersList([...catalogStore.getBanners()]);
      setIsDirty(false);
      alert(t('adminBannersResetSuccess'));
    } catch (err) {
      console.error(err);
      alert('Failed to reset banners: ' + err.message);
    }
  };

  const handleUpdateBanner = (index, val) => {
    const updated = [...bannersList];
    updated[index] = val;
    setBannersList(updated);
    setIsDirty(true);
  };

  const handleDeleteBanner = (index) => {
    const updated = bannersList.filter((_, i) => i !== index);
    setBannersList(updated);
    setIsDirty(true);
  };

  const handleAddBanner = () => {
    if (bannersList.length >= 3) return;
    setBannersList([...bannersList, '']);
    setIsDirty(true);
  };

  return {
    bannersList,
    isDirty,
    handleSave,
    handleReset,
    handleUpdateBanner,
    handleDeleteBanner,
    handleAddBanner,
    isSaving,
  };
}
