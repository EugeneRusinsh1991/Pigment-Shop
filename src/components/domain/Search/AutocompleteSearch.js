import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Pressable, Platform, Keyboard, Animated } from 'react-native';
import SearchDropdown from './SearchDropdown';
import SearchInput from './SearchInput';
import SearchStyles from './SearchStyles';

function matchItem(tokens, queryWords) {
  if (!tokens) return false;
  return queryWords.every((qWord) => tokens.some((pWord) => pWord.startsWith(qWord)));
}

function filterSearchResults(flatList, searchIndex, query) {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const queryWords = q.split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return [];

  return (flatList || []).filter((item) => matchItem(searchIndex?.get(item.id), queryWords));
}

function SearchResultDropdown({ results, query, isDark, onSelect }) {
  const trimmedQuery = query.trim();
  if (results.length > 0) {
    return <SearchDropdown results={results} isDark={isDark} onSelect={onSelect} />;
  }
  if (trimmedQuery.length >= 2) {
    return <SearchDropdown results={[]} isDark={isDark} onSelect={onSelect} isEmpty query={trimmedQuery} />;
  }
  return null;
}

export function AutocompleteSearch({ isDark, onActiveChange, variant = 'default', size = 'sm', flatList = [], searchIndex }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const animValue = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const inputRef = useRef(null);

  const dropdownVisible = (isFocused || isSubmitted) && query.trim().length >= 2;
  const isActive = dropdownVisible;

  useEffect(() => {
    if (dropdownVisible) {
      setShouldRender(true);
      Animated.timing(animValue, {
        toValue: 1,
        duration: 180,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',
      }).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
  }, [dropdownVisible, animValue]);

  useEffect(() => {
    if (onActiveChange) {
      onActiveChange(isActive);
    }
  }, [isActive, onActiveChange]);

  const results = useMemo(
    () => filterSearchResults(flatList, searchIndex, query),
    [flatList, searchIndex, query]
  );

  const handleSelect = () => {
    setQuery('');
    setIsFocused(false);
    setIsSubmitted(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    if (dropdownVisible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [dropdownVisible]);

  const backdropStyle = isDark ? SearchStyles.backdropDark : SearchStyles.backdropLight;

  const dropdownAnimStyle = {
    opacity: animValue,
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-8, 0],
        }),
      },
    ],
  };

  return (
    <View style={SearchStyles.autocompleteContainer}>
      {shouldRender && (
        <Animated.View style={[backdropStyle, { opacity: animValue }]}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              setIsFocused(false);
              setIsSubmitted(false);
              if (inputRef.current) {
                inputRef.current.blur();
              }
            }}
          />
        </Animated.View>
      )}
      <SearchInput
        ref={inputRef}
        isDark={isDark}
        variant={variant}
        size={size}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          setIsSubmitted(false);
        }}
        onClear={() => {
          setQuery('');
          setIsFocused(false);
          setIsSubmitted(false);
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onFocus={() => {
          setIsFocused(true);
          setIsSubmitted(false);
        }}
        onBlur={() => {
          // Keep active long enough for item presses to register
          setTimeout(() => setIsFocused(false), 200);
        }}
        onSubmitEditing={handleSubmit}
      />
      {shouldRender && (
        <Animated.View style={[SearchStyles.dropdownWrapper, dropdownAnimStyle]}>
          <SearchResultDropdown results={results} query={query} isDark={isDark} onSelect={handleSelect} />
        </Animated.View>
      )}
    </View>
  );
}

export default AutocompleteSearch;
