import { Text } from 'react-native';

interface HighlightTextProps {
  text: string;
  keyword: string;
}

export default function HighlightText({ text, keyword }: HighlightTextProps) {
  if (!keyword) {
    return <Text className="text-current">{text}</Text>;
  }

  const remaining = keyword.split('').filter(Boolean);

  return text.split('').map((char, index) => {
    const matchIndex = remaining.indexOf(char);
    if (matchIndex !== -1) {
      remaining.splice(matchIndex, 1);

      return (
        <Text key={index} className="bg-transparent font-normal text-current">
          {char}
        </Text>
      );
    }

    return (
      <Text key={index} className="font-bold text-current">
        {char}
      </Text>
    );
  });
}
