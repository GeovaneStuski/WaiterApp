import { useContext } from 'react';
import { View } from 'react-native';

import { OrderContext } from '../../../../contexts/OrderContext';

import { WithTable } from './components/WithTable';
import { WithoutTable } from './components/WithoutTable';

type HeaderProps = {
  onOpenNotificationModal: () => void;
  haveANewNotification: boolean;
}

export function Header({ onOpenNotificationModal, haveANewNotification}: HeaderProps) {
  const { table, onCancelOrder, onOpenTableModal } = useContext(OrderContext);

  return (
    <View>
      {!table && (
        <WithoutTable
          haveANewNotification={haveANewNotification}
          onOpenNotificationModal={onOpenNotificationModal}
        />
      )}

      {table && (
        <WithTable
          table={table}
          onCancelOrder={onCancelOrder}
          onOpenTableModal={onOpenTableModal}
        />
      )} 
    </View>
  );
}