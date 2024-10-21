import { Text, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity onPress={() => onChange(page)} className='items-center gap'>
      <Icon size={24} color={selected === page ? '#D73035' : '#333333'}/>

      <Text className={cn('mt-1', {
        'text-red-main': selected === page
      })}>{page}</Text>
    </TouchableOpacity>
  );
}