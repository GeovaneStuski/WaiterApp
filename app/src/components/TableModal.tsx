import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from './icons/CloseIcon';
import { Button } from './Button';
import { useState } from 'react';

type TableModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

export function TableModal({ isVisible, onClose }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleChangeTable(table: string) {
    setTable(table);
  } 
  return (
    <Modal animationType='fade' visible={isVisible} transparent >
      <View className='bg-black/60 w-screen h-screen items-center justify-center px-6'>
        <View className='w-full bg-gray-50 rounded-lg p-6'>
          <View className='justify-between flex-row items-center mb-8'>
            <Text className='text-base text-black-main font-bold'>Informar a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <CloseIcon size={24} color='#666666'/>
            </TouchableOpacity>
          </View>

          <View>
            <TextInput 
              className='h-14 rounded-lg bg-white border border-gray-light mb-6 px-4'
              placeholder='Número da mesa'
              onChangeText={handleChangeTable}
            />

            <Button onPress={() => alert(table)}>Salvar</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}