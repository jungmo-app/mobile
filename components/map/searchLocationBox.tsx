import { Input } from '@/components/ui';
import { useDebouncedValue } from '@/hooks/useDebounce';
import { useSearchLocationKeyword } from '@/hooks/useQuery/useSearchLocationKeyword';
import { mergeRefs } from '@/utils/mergeRefs';
import { Search } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable, TextInput, View } from 'react-native';
import HighlightText from './highlightText';

interface SearchLocaitonBoxProps {
  onSubmit: () => void;
}

export default function SearchLocaitonBox({ onSubmit }: SearchLocaitonBoxProps) {
  const inputRef = useRef<TextInput | null>(null);

  const [isViewSuggestion, setIsViewSuggestion] = useState(false);

  const { control, setValue, handleSubmit, watch } = useFormContext();
  const inputValue = watch('inputValue') as string;

  const { value: debouncedKeyword } = useDebouncedValue(inputValue, 200);
  const { data: suggestions } = useSearchLocationKeyword(debouncedKeyword);

  const handleClickSuggestion = (value: string) => {
    setValue('inputValue', value);
    inputRef.current?.blur();
    onSubmit();
  };

  return (
    <View className="relative w-full px-2 pb-3 pt-1">
      <View className="absolute left-4 top-[13px] z-10">
        <Search size={16} color="black" />
      </View>

      <Controller
        control={control}
        name="inputValue"
        render={({ field: { ref: formRef, onBlur, ...fields } }) => (
          <Input
            ref={mergeRefs(formRef, inputRef)}
            placeholder="장소를 입력해주세요"
            className="relative border bg-background pl-8"
            onSubmitEditing={handleSubmit(onSubmit)}
            onFocus={() => setIsViewSuggestion(true)}
            onBlur={() => {
              onBlur();
              setIsViewSuggestion(false);
            }}
            {...fields}
          />
        )}
      />
      {suggestions && suggestions.length > 0 && isViewSuggestion && (
        <View className="absolute inset-x-0 left-0 top-full z-[60] mx-2 translate-y-1 rounded-md bg-background py-2 shadow shadow-black">
          {suggestions.slice(0, 6).map((item, index) => (
            <Pressable
              key={index}
              className="flex w-full cursor-pointer items-center rounded-md p-4 hover:bg-blue-50 dark:hover:bg-gray-600"
              onPress={() => handleClickSuggestion(item)}
            >
              <HighlightText text={item} keyword={debouncedKeyword} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
