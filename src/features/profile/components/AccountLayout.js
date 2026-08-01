import React from 'react';
import { View } from 'react-native';
import { ScrollFadeUp } from '../../../components/ui/Motion';
import { Heading } from '../../../components/ui/Text';
import useGridLayout from '../../../hooks/useGridLayout';

import ProfileSidebar from './ProfileSidebar';
import styles from './AccountLayoutStyles';

export default function AccountLayout({ title, children, isDark, auth }) {
  const { isWide, gridWidth } = useGridLayout();

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
                <View style={styles.sidebarContainer}>
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
