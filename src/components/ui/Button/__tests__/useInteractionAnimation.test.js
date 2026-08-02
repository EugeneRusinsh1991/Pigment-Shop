const { useInteractionAnimation } = require('../useInteractionAnimation');
const { motion } = require('../../../../theme/tokens');

describe('useInteractionAnimation', () => {
  it('initializes with default scale and opacity animated values', () => {
    const { result } = renderHook(() => useInteractionAnimation());
    expect(result.current.scaleAnim._value).toBe(1);
    expect(result.current.opacityAnim._value).toBe(1);
  });

  it('triggers onPress callback when handlePress is invoked', () => {
    const onPressMock = jest.fn();
    const { result } = renderHook(() => useInteractionAnimation({ onPress: onPressMock }));

    act(() => {
      result.current.handlePress();
    });

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onPress callback when disabled or loading', () => {
    const onPressMock = jest.fn();
    const { result: disabledResult } = renderHook(() =>
      useInteractionAnimation({ onPress: onPressMock, disabled: true })
    );

    act(() => {
      disabledResult.current.handlePress();
    });

    expect(onPressMock).not.toHaveBeenCalled();

    const { result: loadingResult } = renderHook(() =>
      useInteractionAnimation({ onPress: onPressMock, loading: true })
    );

    act(() => {
      loadingResult.current.handlePress();
    });

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('provides triggerStatePop function for state changes', () => {
    const { result } = renderHook(() => useInteractionAnimation());
    expect(typeof result.current.triggerStatePop).toBe('function');
    
    act(() => {
      result.current.triggerStatePop('activate');
      result.current.triggerStatePop('deactivate');
    });
  });
});
