import { PagesHeader } from '../../components/PagesHeader';
import { HomeIcon } from '../../components/Icons/HomeIcon';
import { Button } from '../../components/Button';
import { RefreshIcon } from '../../components/Icons/RefreshIcon';
import { Board } from './components/Board';
import { useHome } from './useHome';
import { RefreshModal } from './components/RefreshModal';
import { motion } from 'framer-motion';
import { Loader } from '../../components/Loader';

export function Home() {
  const {
    orders,
    loading,
    onCancelOrder,
    onChangeOrderStatus,
  } = useHome();
  return (
    <motion.div
      className='w-full px-20 mt-10'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Loader isVisible={loading}/>

      <PagesHeader
        page='Home'
        description='Acompanhe os pedidos dos clientes'
        icon={HomeIcon}
      />

      <div className='flex justify-evenly'>
        <Board
          icon="🕑"
          title='Fila de espera'
          orders={orders.filter((order) => order.status === 'WAITING')}
          onCancel={onCancelOrder}
          onChangeStatus={onChangeOrderStatus}
        />

        <Board
          icon="👩‍🍳"
          title='Em produção'
          orders={orders.filter((order) => order.status === 'IN_PRODUCTION')}
          onCancel={onCancelOrder}
          onChangeStatus={onChangeOrderStatus}
        />

        <Board
          icon="✅"
          title='Pronto'
          orders={orders.filter((order) => order.status === 'DONE')}
          onCancel={onCancelOrder}
          onChangeStatus={onChangeOrderStatus}
        />
      </div>
    </motion.div>
  );
}
