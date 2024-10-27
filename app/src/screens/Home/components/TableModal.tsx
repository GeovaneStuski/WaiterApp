import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from '../../../components/icons/CloseIcon';
import { Button } from '../../../components/Button';
import { useContext, useState } from 'react';
import { OrderContext } from '../../../contexts/OrderContext';

export function TableModal() {
  const [table, setTable] = useState('');
  
  const { onCloseTableModal, onChangeTable, isTableModalVisible } = useContext(OrderContext);

  return (
    <Modal animationType='fade' visible={isTableModalVisible} transparent >
      <View className='bg-black/60 w-screen h-screen items-center justify-center px-6'>
        <View className='w-full bg-gray-50 rounded-lg p-6'>
          <View className='justify-between flex-row items-center mb-8'>
            <Text className='text-base text-black-main font-bold'>Informar a mesa</Text>

            <TouchableOpacity onPress={onCloseTableModal}>
              <CloseIcon size={24} color='#666666'/>
            </TouchableOpacity>
          </View>

          <View>
            <TextInput 
              className='h-14 rounded-lg bg-white border border-gray-light mb-6 px-4'
              placeholder='Número da mesa'
              onChangeText={setTable}
              keyboardType='number-pad'
            />

            <Button disabled={!table} onPress={() => onChangeTable(table)}>Salvar</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}