import { useContext, useEffect, useState } from 'react';
import { User } from '../../types/User';
import UsersList from '../../services/UsersList';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState<null | User>(null);
  const [userToBeUpdate, setUserToBeUpdate] = useState<null | User>(null);
  const [loading, setLoading] = useState(false);

  const { loading: authLoading, user: userData } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  async function loadUsers() {
    setLoading(true);
    try {
      const users = await UsersList.index();

      setUsers(users || []);
    } catch {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!authLoading && userData && userData?.position === 'admin') {
      loadUsers();
    } else {
      navigate('/');
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

  function handleOpenDeleteModal(user: User) {
    setUserToBeDeleted(user);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleCreateUser(user: User) {
    setUsers(PrevState => PrevState.concat(user));
  }

  function handleUpdateUser(user: User) {
    setUsers(PrevState => PrevState.map(
      (prevUser) => prevUser._id === user._id ? user : prevUser)
    );
  }

  function handleDeleteUser(userId: string) {
    setUsers(PrevState => PrevState.filter((user) => user._id !== userId));
  }

  return {
    onCloseDeleteModal: handleCloseDeleteModal,
    onOpenDeleteModal: handleOpenDeleteModal,
    onCloseModal: handleCloseUserModal,
    onOpenUpdateModal: handleOpenUpdateUserModal,
    onOpenCreateModal: handleOpenCreateUserModal,
    isUserModalVisible,
    isDeleteModalVisible,
    userToBeDeleted,
    userToBeUpdate,
    loading,
    users,
    userData,
    onCreateUser: handleCreateUser,
    onUpdateUser: handleUpdateUser,
    onDeleteUser: handleDeleteUser,
  };
}
