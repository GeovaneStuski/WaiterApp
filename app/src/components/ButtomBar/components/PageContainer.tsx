import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { cn } from '../../../utils/cn';

type PageContainerProps = {
  icon: React.ElementType;
  page: string;
  onChange: (page: string) => void;
  selected: string;
}

export function PageContainer({ icon: Icon, page, onChange, selected }: PageContainerProps) {
  return (
    <TouchableOpacity onPress={() => onChange(page)} className='items-center'>
      <Icon size={24} color={selected === page ? '#D73035' : '#333333'}/>

      <Text className={cn('mt-1', {
        'text-red-main': selected === page
      })}
      >
        {page}
      </Text>

      {selected === page && <View className='w-3 mt-1 h-0.5 bg-red-main'/>}
    </TouchableOpacity>
  );
}