import { useContext, useEffect, useState } from 'react';
import { PagesHeader } from '../../components/PagesHeader';
import { motion } from 'framer-motion';
import { Table } from '../../components/Table';
import NotAuthorizedError from '../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Loader } from '../../components/Loader';
import { User } from '../../types/User';
import UsersList from '../../services/UsersList';
import { UserIcon } from '../../components/Icons/UserIcon';
import { Button } from '../../components/Button';
import { UserModal } from './components/UserModal';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  // const [userToBeDeleted, setUserToBeDeleted] = useState<null | User>(null);
  const [userToBeUpdate, setUserToBeUpdate] = useState<null | User>(null);
  const [loading, setLoading] = useState(false);

  const { handleLogout, loading: authLoading, user: userData } = useContext(AuthenticationContext);

  async function loadUsers() {
    setLoading(true);
    try {
      const users = await UsersList.index();

      setUsers(users);
    } catch (error) {
      if (error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!authLoading) {
      loadUsers();
    }
  }, [authLoading, userData]);

  function handleOpenCreateUserModal() {
    setUserToBeUpdate(null);
    setIsUserModalVisible(true);
  }

  function handleOpenUpdateUserModal(user: User) {
    setUserToBeUpdate(user);
    setIsUserModalVisible(true);
  }

  function handleCloseUserModal() {
    setIsUserModalVisible(false);
  }

  // function handleOpenDeleteModal(user: User) {
  //   setUserToBeDeleted(user);
  //   setIsDeleteModalVisible(true);
  // }

  // function handleCloseDeleteModal() {
  //   setIsDeleteModalVisible(false);
  // }

  return (
    <motion.div
      className="mt-10 w-full px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader isVisible={loading} />

      <UserModal
        onClose={handleCloseUserModal}
        isVisible={isUserModalVisible}
        onReload={loadUsers}
        user={userToBeUpdate}
      />

      <PagesHeader
        icon={UserIcon}
        page="Usuários"
        description="Cadastre e gerencie seus usuários"
      />

      <header className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">Usuários</h1>

          <span className="mt-0.5 rounded-md bg-gray-light/20 px-2 text-base font-semibold">
            {users.length}
          </span>
        </div>

        <Button style="cancel" onClick={handleOpenCreateUserModal}>
          Novo Usuário
        </Button>
      </header>

      <Table
        onAction={handleOpenUpdateUserModal}
        onDelete={() => {}}
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

