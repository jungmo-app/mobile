import { cn } from '@/utils/style';
import { Href, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Text, View, ViewProps } from 'react-native';
import { Button } from './ui/button';

interface HeaderProps extends ViewProps {
  title?: string;
  onClose?: () => void;
  routeUrl?: Href;
  reset?: boolean;
}

export default function Header({
  title,
  className,
  onClose,
  routeUrl,
  reset = false,
  children,
  ...props
}: HeaderProps) {
  const handleBack = () => {
    onClose?.();
    if (routeUrl) {
      if (reset) {
        router.replace(routeUrl);
        return;
      }
      router.push(routeUrl);
    }
  };
  return (
    <View className={cn('fixed top-0 z-10 bg-background', className)} {...props}>
      <View className="flex h-14 items-center justify-between px-2">
        <View className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" aria-label="뒤로 가기" onPress={handleBack}>
            <ChevronLeft width={20} height={20} color="black" />
          </Button>
          <Text className="text-lg font-medium">{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
}
