import { useLocalSearchParams, useSegments } from 'expo-router';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCatalog } from '../catalog/CatalogContext';
import CatalogMenuContent from './NavMenu/CatalogMenuContent';
import LanguageSelector from './NavMenu/LanguageSelector';
import MainMenuContent from './NavMenu/MainMenuContent';
import NavMenuHeader from './NavMenu/NavMenuHeader';
import styles from './NavMenu/NavMenuStyles';
import { useNavMenuController } from './useNavMenuController';

import Drawer from '../../components/ui/Drawer';
import { useSlideAnimation } from '../../hooks/useSlideAnimation';
import { useDrawerBackHandler } from '../../hooks/useProductNavigation';


function NavPanelContent({
  isDark,
  view,
  handleBack,
  handleClose,
  t,
  isWide,
  lang,
  onSelectLanguage,
  onToggleTheme,
  selectedCategoryId,
}) {
  return (
    <>
      <NavMenuHeader
        isDark={isDark}
        onBackClick={handleBack}
        onClose={handleClose}
        view={view}
        title={t('navCatalog')}
      />
      <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
        {view === 'main' ? (
          <MainMenuContent
            isDark={isDark}
            onClose={handleClose}
            selectedCategoryId={selectedCategoryId}
          />
        ) : (
          <CatalogMenuContent
            isDark={isDark}
            onClose={handleClose}
            selectedCategoryId={selectedCategoryId}
          />
        )}
      </ScrollView>
      {!isWide && view === 'main' && (
        <LanguageSelector
          isDark={isDark}
          lang={lang}
          onSelectLanguage={onSelectLanguage}
          onToggleTheme={onToggleTheme}
        />
      )}
    </>
  );
}

function findProductCategory(flatList, productId) {
  if (!flatList || !productId) return null;
  const product = flatList.find((p) => String(p.id) === String(productId));
  return product?.categoryId ? String(product.categoryId) : null;
}

function useActiveCategoryId() {
  const { categoryId, id } = useLocalSearchParams();
  const segments = useSegments();
  const { flatList } = useCatalog();

  const routeType = segments[0];
  if (routeType === 'catalog' && categoryId) {
    return String(categoryId);
  }
  
  if (routeType === 'product') {
    return findProductCategory(flatList, id);
  }
  
  return null;
}

export default function NavMenu(props) {
  const {
    visible,
    onClose,
    isDark: isDarkProp,
    onSelectLanguage: onSelectLanguageProp,
    onToggleTheme,
  } = props;
  const { isDark: isDarkContext } = useTheme();
  const { t, lang, selectLanguage } = useLanguage();
  const isDark = isDarkProp ?? isDarkContext;
  const onSelectLanguage = onSelectLanguageProp ?? selectLanguage;
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const panelWidth = isWide ? 340 : windowWidth - 56;

  const { showModal, slideAnim, scrimOpacity, handleClose } = useSlideAnimation(
    visible,
    panelWidth,
    onClose
  );

  // All view-transition and selection routing rules are delegated to the controller hook
  const {
    view,
    handleBack,
  } = useNavMenuController({
    ...props,
    onClose: handleClose,
  });

  useDrawerBackHandler(visible, handleBack);

  const selectedCategoryId = useActiveCategoryId();

  return (
    <Drawer
      visible={showModal}
      onClose={handleClose}
      scrimOpacity={scrimOpacity}
      panelWidth={panelWidth}
      slideAnim={slideAnim}
      isDark={isDark}
    >
      <NavPanelContent
        isDark={isDark}
        view={view}
        handleBack={handleBack}
        handleClose={handleClose}
        t={t}
        isWide={isWide}
        lang={lang}
        onSelectLanguage={onSelectLanguage}
        onToggleTheme={onToggleTheme}
        selectedCategoryId={selectedCategoryId}
      />
    </Drawer>
  );
}
