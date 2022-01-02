import { useState, useCallback } from 'react';

// https://www.typescriptlang.org/docs/handbook/2/generics.html

const UseInput = <T>(initValue: T | null = null): [T | null, Function] => {
  const [value, setter] = useState<T | null>(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

export default UseInput
