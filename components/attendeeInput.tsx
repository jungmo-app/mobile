import AttendeeSelectModal from '@/components/modals/attendeeSelectModal';
import { UserDataResponse } from '@/types/user';
import { User } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card } from './ui/card';
import { Label } from './ui/label';

type AttendeeInputProps = {
  selectedAttendees: UserDataResponse[];
  onAttendeesChange: (attendees: UserDataResponse[]) => void;
};

export default function AttendeeInput({ selectedAttendees, onAttendeesChange }: AttendeeInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Card className="relative space-y-4 rounded-2xl p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <User size={16} color="gray" />
          <Label>참가자</Label>
        </View>
        <Pressable className="w-full" onPress={handleButtonClick}>
          <View className="flex h-10 items-center rounded-md border border-gray-300 px-3">
            <Text className={`${selectedAttendees.length > 0 ? 'text-foreground' : 'text-gray-500'}`}>
              {selectedAttendees.length > 0
                ? selectedAttendees.map(user => user.userName).join(', ')
                : '참석자를 선택해주세요'}
            </Text>
          </View>
        </Pressable>
      </View>
      <AttendeeSelectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={onAttendeesChange} />
    </Card>
  );
}
