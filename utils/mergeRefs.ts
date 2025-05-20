export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null && typeof ref === 'object') {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
