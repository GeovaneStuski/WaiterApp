import { useContext, useEffect, useState } from 'react';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { User } from '../../../types/User';
import isEmailValid from '../../../utils/isEmailValid';
// import UsersList from '../../../services/UsersList';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { cn } from '../../../utils/cn';
import { RadioCheckedIcon } from '../../../components/Icons/RadioCheckedIcon';
import { RadioIcon } from '../../../components/Icons/RadioIcon';
import UsersList from '../../../services/UsersList';

type UserModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  user: User | null;
};

export function UserModal({ isVisible, onClose, onReload, user }: UserModalProps) {
  if (!isVisible) return;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('waiter');
  const [loading, setLoading] = useState(false);

  const isFormValid = !!(name && isEmailValid(email) && password.length > 3);

  const { handleLogout } = useContext(AuthenticationContext);

  useEffect(() => {
    populateInputs();
  }, [user]);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleChangePosition(event: React.ChangeEvent<HTMLInputElement>) {
    setPosition(event.target.id);
  }

  async function populateInputs() {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setPosition(user.position);
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setPosition('waiter');
    }
  }

  async function handleSubmit() {
    setLoading(true);
    const body = { name, email, password, position };
    try {
      if (user) {
        await UsersList.update(user._id, body);
      } else {
        await UsersList.create(body);
      }
    } catch (error) {
      if (error instanceof NotAuthorizedError) {
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
      buttonStyle="full"
    >
      <Input
        label="Nome"
        value={name}
        type="text"
        onChange={handleChangeName}
        placeholder="Digite o nome do usuário"
      />

      <Input
        label="E-mail"
        value={email}
        type="email"
        onChange={handleChangeEmail}
        placeholder="Digite o e-mail do usuário"
      />

      <Input
        label="Senha"
        value={password}
        type="password"
        onChange={handleChangePassword}
        placeholder="Digite uma senha"
      />

      <div className="flex items-center gap-2 text-sm text-gray-main">
        <div>
          <input
            onChange={handleChangePosition}
            checked={position === 'admin'}
            id="admin"
            name="position"
            type="radio"
            className="sr-only"
          />

          <label
            htmlFor="admin"
            className={cn('flex items-center gap-1', {
              'text-red-main': position === 'admin',
            })}
          >
            {position === 'admin' ? (
              <RadioCheckedIcon className="w-5 cursor-pointer" />
            ) : (
              <RadioIcon className="w-5 cursor-pointer" />
            )}
            Admin
          </label>
        </div>

        <div>
          <input
            onChange={handleChangePosition}
            checked={position === 'waiter'}
            id="waiter"
            name="position"
            type="radio"
            className="sr-only"
          />

          <label
            htmlFor="waiter"
            className={cn('flex items-center gap-1', {
              'text-red-main': position === 'waiter',
            })}
          >
            {position === 'waiter' ? (
              <RadioCheckedIcon className="w-5 cursor-pointer" />
            ) : (
              <RadioIcon className="w-5 cursor-pointer" />
            )}
            Garçom
          </label>
        </div>
      </div>
    </Modal>
  );
}

