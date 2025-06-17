import { PressableProps } from 'react-native';

export type Variant = 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
export type Size = 'default' | 'sm' | 'lg' | 'icon' | 'none';

export interface ButtonProps extends PressableProps {
  title?: string;
  titleClassName?: string;
  variant?: Variant;
  size?: Size;
}
