'use client';

import { UserDataResponse } from '@/types/user';
import { User } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

type AttendeeInputProps = {
  selectedAttendees: UserDataResponse[];
  onAttendeesChange: (attendees: UserDataResponse[]) => void;
};

export default function AttendeeInput({ selectedAttendees }: AttendeeInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="relative space-y-4 rounded-2xl p-4">
      <View className="space-y-4">
        <View className="flex mb-2 items-center gap-2">
          <User size={16} color="gray" />
          <Label>참가자</Label>
        </View>
        <Input
          readOnly
          placeholder="참석자를 선택해주세요"
          value={selectedAttendees.map(user => user.userName).join(', ')}
          className="cursor-pointer"
          onFocus={() => setIsModalOpen(true)}
        />
      </View>
    </Card>
  );
}
