import { ProfileIcon } from '../../components/Icons/ProfileIcon';
import { PagesHeader } from '../../components/PagesHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { motion } from 'framer-motion';
import { useProfile } from './useProfile';
import { Header } from './components/Header';

export function Profile() {
  const {
    name,
    email,
    password,
    onSubmit,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    isFormValid,
    updateRequestLoading,
    loading,
    user,
    findError,
  } = useProfile();
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
          <Header user={user} />

          <div className='space-y-6 my-10'>
            <Input
              value={name}
              onChange={onChangeName}
              label='Nome'
              placeholder='Digite seu nome'
            />

            <Input
              value={email}
              onChange={onChangeEmail}
              label='E-mail'
              placeholder='Digite seu novo e-mail'
              error={findError('email')}
            />

            <Input
              value={password}
              onChange={onChangePassword}
              placeholder='Digite sua nova senha'
              label='Senha'
              type='password'
            />
          </div>

          <Button isLoading={updateRequestLoading} onClick={onSubmit} disabled={!isFormValid} >Salvar Alterações</Button>
        </div>
      </div>
    </motion.div>
  );
}
