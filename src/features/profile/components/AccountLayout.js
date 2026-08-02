import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { layout } from '../../../theme/tokens';
import { ScrollFadeUp } from '../../../components/ui/Motion';
import { Heading } from '../../../components/ui/Text';
import useGridLayout from '../../../hooks/useGridLayout';
import usePullToRefresh from '../../../hooks/usePullToRefresh';
import ProfileSidebar from './ProfileSidebar';
import styles from './AccountLayoutStyles';

const MOCK_REFRESH_DELAY_MS = 600;

export default function AccountLayout({ title, children, isDark, auth }) {
  const { isWide, gridWidth } = useGridLayout();
  const { width: windowWidth } = useWindowDimensions();
  const isTablet = windowWidth >= layout.breakpoints.mobile && windowWidth < layout.breakpoints.desktop;

  usePullToRefresh(
    async () => { await new Promise(r => setTimeout(r, MOCK_REFRESH_DELAY_MS)); }
  );

  return (
    <View
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
    >
      <View style={styles.flex1}>
        <View
          style={[
            styles.pageContent,
            { alignSelf: 'center', width: '100%', maxWidth: gridWidth },
          ]}
        >
          {Boolean(title) && (
            <ScrollFadeUp>
              <Heading level={1} style={styles.title} isDark={isDark}>
                {title}
              </Heading>
            </ScrollFadeUp>
          )}

          <View
            style={[
              styles.layoutWrapper,
              {
                flexDirection: isWide ? 'row' : 'column',
                alignItems: isWide ? 'flex-start' : 'stretch',
              },
            ]}
          >
            {isWide ? (
              <>
                <View style={isTablet ? styles.sidebarContainerTablet : styles.sidebarContainer}>
                  <ScrollFadeUp>
                    <ProfileSidebar onLogout={auth?.logout} />
                  </ScrollFadeUp>
                </View>

                <View style={styles.contentContainer}>
                  <ScrollFadeUp>{children}</ScrollFadeUp>
                </View>
              </>
            ) : (
              <>
                <View style={{ width: '100%' }}>
                  <ScrollFadeUp>{children}</ScrollFadeUp>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

    </View>
  );
}
