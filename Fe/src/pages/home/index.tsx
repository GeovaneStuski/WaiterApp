import { PagesHeader } from '../../components/PagesHeader';
import { HomeIcon } from '../../components/Icons/HomeIcon';
import { Button } from '../../components/Button';
import { RefreshIcon } from '../../components/Icons/RefreshIcon';
import { Board } from './components/Board';
import { useHome } from './useHome';
import { RefreshModal } from './components/RefreshModal';
import { motion } from 'framer-motion';

export function Home() {
  const {
    orders,
    isRefreshModalVisible,
    handleCloseRefreshModal,
    handleOpenRefreshModal,
    loadOrders,
    handleOrdersToHistory,
    loading,
  } = useHome();
  return (
    <motion.div
      className='w-full px-20'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <header className='flex justify-between items-center mt-10'>
        <RefreshModal
          isVisible={isRefreshModalVisible}
          onClose={handleCloseRefreshModal}
          onConfirm={handleOrdersToHistory}
          isLoading={loading}
        />

        <PagesHeader
          page='Home'
          description='Acompanhe os pedidos dos clientes'
          icon={HomeIcon}
        />

        <Button onClick={handleOpenRefreshModal} style="cancel">
          <RefreshIcon className='w-6'/>

          Resetar o dia
        </Button>
      </header>

      <div className='flex justify-between'>
        <Board
          icon="🕑"
          title='Fila de espera'
          orders={orders.filter((order) => order.status === 'WAITING')}
          onReload={loadOrders}
        />

        <Board
          icon="👩‍🍳"
          title='Em produção'
          orders={orders.filter((order) => order.status === 'IN_PRODUCTION')}
          onReload={loadOrders}
        />

        <Board
          icon="✅"
          title='Pronto'
          orders={orders.filter((order) => order.status === 'DONE')}
          onReload={loadOrders}
        />
      </div>
    </motion.div>
  );
}
