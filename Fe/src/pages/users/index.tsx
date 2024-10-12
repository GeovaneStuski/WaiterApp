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

  const { handleLogout } = useContext(AuthenticationContext);

  async function loadUsers() {
    setLoading(true);
    try {
      const users = await UsersList.index();

      setUsers(users);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

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
      className='w-full px-20 mt-10'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Loader isVisible={loading}/>

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

      <header className='flex justify-between items-center text-sm'>
        <div className='flex gap-2 items-center'>
          <h1 className='font-bold text-lg'>Usuários</h1>

          <span className='px-2 rounded-md text-base font-semibold bg-gray-light/20 mt-0.5'>{users.length}</span>
        </div>

        <Button style='cancel' onClick={handleOpenCreateUserModal}>Novo Usuário</Button>
      </header>

      <Table
        onAction={handleOpenUpdateUserModal}
        onDelete={() => {}}
        head={[
          { name: 'Nome', style: 'text-center w-20' },
          { name: 'E-mail', style: 'text-start w-32' },
          { name: 'Cargo', style: 'text-start' },
        ]}
        body={users.map((user) => ({
          id: user._id,
          item: user,
          items: [
            { item: user.name },
            { item: user.email },
            { item: user.position },
          ]
        }))}
      />
    </motion.div>
  );
}
