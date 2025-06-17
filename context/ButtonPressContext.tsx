import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

interface ButtonContextType {
  isPressed: boolean;
  changePress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonContext = createContext<ButtonContextType>({
  isPressed: false,
  changePress: () => {},
});

export const ButtonContextProvider = ({ children }: PropsWithChildren) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const changePress = useCallback((value: React.SetStateAction<boolean>) => {
    setIsPressed(value);
  }, []);

  const value = useMemo(
    () => ({
      isPressed,
      changePress,
    }),
    [isPressed, changePress]
  );
  return <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>;
};
