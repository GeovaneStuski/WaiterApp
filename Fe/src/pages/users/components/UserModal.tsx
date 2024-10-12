import { useContext, useState } from 'react';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { User } from '../../../types/User';
import isEmailValid from '../../../utils/isEmailValid';
// import UsersList from '../../../services/UsersList';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

type UserModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  user: User | null;
}

export function UserModal({ isVisible, onClose, onReload, user }: UserModalProps) {
  if(!isVisible) return;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = !!(name && isEmailValid(email) && password.length > 3);

  const { handleLogout } = useContext(AuthenticationContext);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log({name, email, password, position});
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
      onReload();
      onClose();
    }
  }

  return (
    <Modal
      title={`${user ? 'Editar' : 'Novo'} Usuários`}
      onClose={onClose}
      isLoading={loading}
      isFormValid={isFormValid}
      isVisible={isVisible}
      confirmLabel={`${user ? 'Salvar Alterações' : 'Cadastrar Usuário'}`}
      onConfirm={handleSubmit}
      buttonStyle='full'
    >
      <Input
        label="Nome"
        value={name}
        type='text'
        onChange={handleChangeName}
        placeholder='Digite o nome do usuário'
      />

      <Input
        label="E-mail"
        value={email}
        type='email'
        onChange={handleChangeEmail}
        placeholder='Digite o e-mail do usuário'
      />

      <Input
        label="Senha"
        value={password}
        type='password'
        onChange={handleChangePassword}
        placeholder='Digite uma senha'
      />

    </Modal>
  );
}
