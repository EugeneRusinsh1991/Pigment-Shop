import React from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import usePullToRefresh from '../../../hooks/usePullToRefresh';

/**
 * UnifiedCardGrid Component
 * Standardizes card grid rendering across the application.
 * Supports both FlexWrap (for static sections) and FlatList (for paginated views) variants.
 * Applies consistent gaps and column widths via padding and negative margins.
 */
export default function UnifiedCardGrid({
  data,
  renderItem,
  cols = 3,
  gap = 8,
  variant = 'flex',
  contentContainerStyle,
  style,
  onRefresh: onRefreshProp,
  disableRefreshControl = false,
  ...rest
}) {
  const itemWidth = `${(100 / cols).toFixed(4)}%`;
  const listRef = React.useRef(null);
  const { refreshing, onRefresh } = usePullToRefresh(onRefreshProp, { 
    scrollViewRef: listRef,
    disabled: !onRefreshProp
  });

  const renderWrappedItem = (props) => {
    // For FlatList, it passes { item, index, separators }
    // For Array.map, we pass the item and index
    const item = props.item || props;
    
    return (
      <View style={[{ width: itemWidth, padding: gap / 2 }]}>
        {renderItem({ item, ...props })}
      </View>
    );
  };

  const containerStyle = {
    marginHorizontal: -(gap / 2),
    marginVertical: -(gap / 2),
  };

  if (variant === 'flatlist') {
    const refreshControlProp = disableRefreshControl
      ? {}
      : { refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> };
    return (
      <FlatList
        ref={listRef}
        {...refreshControlProp}
        data={data}
        numColumns={cols}
        renderItem={renderWrappedItem}
        contentContainerStyle={[containerStyle, contentContainerStyle]}
        style={style}
        {...rest}
      />
    );
  }

  // Flex Wrap variant
  return (
    <View style={[styles.flexWrapContainer, containerStyle, style]} {...rest}>
      {data.map((item, index) => (
        <React.Fragment key={item?.id || index}>
          {renderWrappedItem({ item, index })}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flexWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
