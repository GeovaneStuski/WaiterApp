import { HistoryIcon } from '../../components/Icons/HistoryIcon';
import { PagesHeader } from '../../components/PagesHeader';
import { OrderModal } from './components/OrderModal';
import { DeleteOrderModal } from './components/DeleteOrderModal';
import { motion } from 'framer-motion';
import { Table } from '../../components/Table';
import { formatDate } from '../../utils/formatDate';
import { formatList } from '../../utils/formatList';
import { EyeIcon } from '../../components/Icons/EyeIcon';
import { Loader } from '../../components/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { useHistory } from './useHistory';

export function History() {
  const {
    orders,
    isOrderModalVisible,
    isDeleteModalVisible,
    order,
    loading,
    deletionLoading,
    onDeleteOrder,
    onCloseDeleteModal,
    onOpenDeleteModal,
    onOpenOrderModal,
    onCloseOrderModal,
  } = useHistory();

  return (
    <motion.div
      className='w-full px-20 mt-10'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Loader isVisible={loading}/>

      <OrderModal
        isVisible={isOrderModalVisible}
        onClose={onCloseOrderModal}
        order={order}
        onCancel={onOpenDeleteModal}
      />

      <DeleteOrderModal
        isVisible={isDeleteModalVisible}
        onClose={onCloseDeleteModal}
        onConfirm={onDeleteOrder}
        isLoading={deletionLoading}
      />

      <PagesHeader
        icon={HistoryIcon}
        page="Histórico"
        description="Gerencie os produtos do seu estabelecimento"
      />

      <Table
        actionIcon={EyeIcon}
        onAction={onOpenOrderModal}
        onDelete={onOpenDeleteModal}
        head={[
          { name: 'Mesa', style: 'text-center w-20' },
          { name: 'Data', style: 'text-start w-32' },
          { name: 'Nome', style: 'text-start' },
          { name: 'Categoria', style: 'text-start' },
          { name: 'Total', style: 'text-start' },
        ]}
        body={orders.map((order) => {
          const date = formatDate(order.createdAt);
          const formatedNames = formatList(order.products.map(({ product }) => product.name));
          const category = order.products[0].product.category;
          const formatedTotal = formatCurrency(order.products.reduce(
            (acc, {product, quantity}) => acc + product.price * quantity, 0));

          return {
            id: order._id,
            item: order,
            items: [
              { item: order.table },
              { item: date },
              { item:  formatedNames},
              { item: `${category.icon} ${category.name}` },
              { item: formatedTotal },
            ]
          };
        })}
      />
    </motion.div>
  );
}
