'use client';

import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

interface ButtonContextType {
  isClicked: boolean;
  changeClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonContext = createContext<ButtonContextType>({
  isClicked: false,
  changeClick: () => {},
});

export const ButtonContextProvider = ({ children }: PropsWithChildren) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const changeClick = useCallback((value: React.SetStateAction<boolean>) => {
    setIsClicked(value);
  }, []);

  const value = useMemo(
    () => ({
      isClicked,
      changeClick,
    }),
    [isClicked, changeClick]
  );
  return <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>;
};
