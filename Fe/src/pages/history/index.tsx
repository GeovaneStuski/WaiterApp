import { useContext, useEffect, useState } from 'react';
import { HistoryIcon } from '../../components/Icons/HistoryIcon';
import { PagesHeader } from '../../components/PagesHeader';
import RegistersList from '../../services/RegistersList';
import { Register } from '../../types/Register';
import { RegisterModal } from './components/RegisterModal';
import { DeleteRegisterModal } from './components/DeleteRegisterModal';
import { motion } from 'framer-motion';
import { Table } from '../../components/Table';
import { formatData } from '../../utils/formatData';
import { formatList } from '../../utils/formatList';
import { priceFormater } from '../../utils/priceFormater';
import { EyeIcon } from '../../components/Icons/EyeIcon';
import NotAuthorizedError from '../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Loader } from '../../components/Loader';

export function History() {
  const [registers, setRegisters] = useState<Register[]>([]);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [registerIsBeingDeleted, setRegisterIsBeingDeleted] = useState<null | string>(null);
  const [register, setRegister] = useState<null | Register>(null);
  const [makingRequest, setMakingRequest] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function loadRegisters() {
    setMakingRequest(true);
    try {
      const registers = await RegistersList.index();

      setRegisters(registers);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setMakingRequest(false);
    }
  }

  useEffect(() => {
    loadRegisters();
  }, []);

  function handleOpenRegisterModal(register: Register) {
    setRegister(register);
    setIsRegisterModalVisible(true);
  }

  function handleCloseRegisterModal() {
    setIsRegisterModalVisible(false);
  }

  function handleOpenDeleteModal(register: Register) {
    setRegisterIsBeingDeleted(register._id);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleDeleteRegister() {
    if(!registerIsBeingDeleted) return;
    setMakingRequest(true);

    try {
      await RegistersList.delete(registerIsBeingDeleted);

      loadRegisters();
      setIsDeleteModalVisible(false);
      setIsRegisterModalVisible(false);
    }
    catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setMakingRequest(false);
    }
  }

  return (
    <motion.div
      className='w-full px-20 mt-10'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Loader isVisible={makingRequest}/>

      <RegisterModal
        isVisible={isRegisterModalVisible}
        onClose={handleCloseRegisterModal}
        register={register}
        onCancel={handleOpenDeleteModal}
      />

      <DeleteRegisterModal
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteRegister}
      />

      <PagesHeader
        icon={HistoryIcon}
        page="Histórico"
        description="Gerencie os produtos do seu estabelecimento"
      />

      <Table
        actionIcon={EyeIcon}
        onAction={handleOpenRegisterModal}
        onDelete={handleOpenDeleteModal}
        head={[
          { name: 'Mesa', style: 'text-center w-20' },
          { name: 'Data', style: 'text-start w-32' },
          { name: 'Nome', style: 'text-start' },
          { name: 'Categoria', style: 'text-start' },
          { name: 'Total', style: 'text-start' },
        ]}
        body={registers.map((register) => ({
          id: register._id,
          item: register,
          items: [
            { item: register.table },
            { item: formatData(register.createdAt) },
            { item: formatList(register.products.map(({ product }) => product.name)) },
            { item: `${register.products[0].product.category.icon} ${register.products[0].product.category.name}` },
            { item: priceFormater(register.products.reduce((acc, {product, quantity}) => acc + product.price * quantity, 0)) },
          ]
        }))}
      />
    </motion.div>
  );
}
