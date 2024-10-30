import { PagesHeader } from '../../components/PagesHeader';
import { motion } from 'framer-motion';
import { Table } from '../../components/Table';
import { Loader } from '../../components/Loader';
import { UserIcon } from '../../components/Icons/UserIcon';
import { UserModal } from './components/UserModal';
import { DeleteUserModal } from './components/DeleteUserModal';
import { useUsers } from './useUsers';
import { Header } from './components/Header';

export function Users() {
  const {
    onCloseDeleteModal,
    onOpenDeleteModal,
    onCloseModal,
    onOpenUpdateModal,
    onOpenCreateModal,
    isUserModalVisible,
    isDeleteModalVisible,
    userToBeDeleted,
    userToBeUpdate,
    loading,
    users,
    onUpdateUser,
    onCreateUser,
    onDeleteUser,
    userData,
  } = useUsers();

  return (
    <motion.div
      className="mt-10 w-full px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader isVisible={loading} />

      <UserModal
        onClose={onCloseModal}
        isVisible={isUserModalVisible}
        onUpdateUser={onUpdateUser}
        onCreateUser={onCreateUser}
        user={userToBeUpdate}
      />

      <DeleteUserModal
        isVisible={isDeleteModalVisible}
        onClose={onCloseDeleteModal}
        user={userToBeDeleted}
        onDeleteUser={onDeleteUser}
      />

      <PagesHeader
        icon={UserIcon}
        page="Usuários"
        description="Cadastre e gerencie seus usuários"
      />

      <Header
        length={users.length}
        onOpenModal={onOpenCreateModal}
      />

      <Table
        onAction={onOpenUpdateModal}
        onDelete={onOpenDeleteModal}
        head={[
          { name: 'Nome', style: 'text-start' },
          { name: 'E-mail', style: 'text-start' },
          { name: 'Cargo', style: 'text-start' },
        ]}
        body={users.map((user) => ({
          actionsShouldBeRender: user._id !== userData?._id,
          id: user._id,
          item: user,
          items: [{ item: user.name }, { item: user.email }, { item: user.position.toUpperCase() }],
        }))}
      />
    </motion.div>
  );
}

