import { useContext, useEffect, useState } from 'react';
import { ProfileIcon } from '../../components/Icons/ProfileIcon';
import { PagesHeader } from '../../components/PagesHeader';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { Input } from '../../components/Input';
import { EditIcon } from '../../components/Icons/EditIcon';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { motion } from 'framer-motion';
import UsersList from '../../services/UsersList';
import NotAuthorizedError from '../../Errors/NotAuthorizedError';

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [updateRequestLoading, setUpdateRequestLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, handleLogout, reloadUser } = useContext(AuthenticationContext);

  const isFormValid = user && (user.name !== name || user.email !== email || user.password !== password);

  useEffect(() => {
    if(user) {
      populateInputs();
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [user]);

  function populateInputs() {
    if(!user) return;
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  }

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
    if(!user) return;

    setUpdateRequestLoading(true);

    const body = { name, email, password, position: user.position};

    try {
      await UsersList.update(user._id, body);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout;
      }
      console.log(error);
    } finally {
      setUpdateRequestLoading(false);
      reloadUser();
      setLoading(true);
    }
  }
  return (
    <motion.div
      className="mt-10 px-20 w-full"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Loader isVisible={loading}/>

      <PagesHeader
        icon={ProfileIcon}
        description='Altere suas informações do seu jeito!'
        page='Peril'
      />

      <div className='flex justify-center items-center w-full'>
        <div className="w-[560px] p-8 bg-white rounded-lg mt-10 shadow-lg">
          <header className='flex justify-between items-center'>
            <div className='flex items-center gap-1'>
              <EditIcon className='w-7'/>

              <h1 className='font-bold text-xl'>Editar seu Perfil</h1>
            </div>
            
            <div className='flex gap-1 text-red-main text-sm items-center'>
              <ProfileIcon className='w-6'/>

              <span className='capitalize font-bold'>{user?.name}</span>
            </div>
          </header>

          <div className='space-y-6 my-10'>
            <Input
              value={name}
              onChange={handleChangeName}
              label='Nome'
              placeholder='Digite seu nome'
            />

            <Input
              value={email}
              onChange={handleChangeEmail}
              label='E-mail'
              placeholder='Digite seu novo e-mail'
            />

            <Input
              value={password}
              onChange={handleChangePassword}
              placeholder='Digite sua nova senha'
              label='Senha'
              type='password'
            />
          </div>

          <Button isLoading={updateRequestLoading} onClick={handleSubmit} disabled={!isFormValid} >Salvar Alterações</Button>
        </div>
      </div>
    </motion.div>
  );
}