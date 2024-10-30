import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { User } from '../../../../types/User';
import { cn } from '../../../../utils/cn';
import { RadioCheckedIcon } from '../../../../components/Icons/RadioCheckedIcon';
import { RadioIcon } from '../../../../components/Icons/RadioIcon';
import { useUserModal } from './useUserModal';

type UserModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onCreateUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  user: User | null;
};

export function UserModal({ isVisible, onClose, onCreateUser, onUpdateUser, user }: UserModalProps) {
  const {
    name,
    email,
    password,
    position,
    loading,
    onSubmit,
    isFormValid,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onChangePosition,
    findError,
  } = useUserModal({ onClose, onCreateUser, onUpdateUser, user });
  return (
    <Modal
      title={`${user ? 'Editar' : 'Novo'} Usuários`}
      onClose={onClose}
      isLoading={loading}
      isFormValid={isFormValid}
      isVisible={isVisible}
      confirmLabel={`${user ? 'Salvar Alterações' : 'Cadastrar Usuário'}`}
      onConfirm={onSubmit}
      buttonStyle="full"
    >
      <Input
        label="Nome"
        value={name}
        type="text"
        onChange={onChangeName}
        placeholder="Digite o nome do usuário"
      />

      <Input
        label="E-mail"
        value={email}
        type="email"
        onChange={onChangeEmail}
        placeholder="Digite o e-mail do usuário"
        error={findError('email')}
      />

      <Input
        label="Senha"
        value={password}
        type="password"
        onChange={onChangePassword}
        placeholder="Digite uma senha"
      />

      <div className="flex items-center gap-2 text-sm text-gray-main">
        <div>
          <input
            onChange={onChangePosition}
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
            onChange={onChangePosition}
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

