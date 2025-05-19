import { Input } from '@/components/ui';
import { mergeRefs } from '@/utils/mergeRefs';
import { Search } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function SearchLocaitonBox() {
  const inputRef = useRef<TextInput | null>(null);

  const { control, setValue } = useFormContext();
  const [suggestion, setSuggestion] = useState<string[]>(['test1', 'test2']);

  const handleClickSuggestion = (value: string) => {
    setValue('inputValue', value);
  };

  return (
    <View className="relative w-full px-2 pb-3 pt-1">
      <View className="absolute left-4 top-[13px] z-10">
        <Search size={16} color="black" />
      </View>

      <Controller
        control={control}
        name="inputValue"
        render={({ field: { ref: formRef, onChange, ...fields } }) => (
          <Input
            ref={mergeRefs(formRef, inputRef)}
            placeholder="장소를 입력해주세요"
            className="relative border bg-background pl-8"
            onChange={e => {
              onChange(e);
            }}
            {...fields}
          />
        )}
      />
      {suggestion.length > 0 && (
        <View className="absolute inset-x-0 left-0 top-full z-[60] mx-2 translate-y-1 rounded-md bg-background py-2 shadow shadow-black">
          {suggestion.slice(0, 6).map((item, index) => (
            <Pressable
              key={index}
              className="flex w-full cursor-pointer items-center rounded-md p-4 hover:bg-blue-50 dark:hover:bg-gray-600"
              onPress={() => handleClickSuggestion(item)}
            >
              <Text>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
