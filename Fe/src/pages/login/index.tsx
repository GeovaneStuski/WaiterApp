import { Button } from '../../components/Button';
import { FormGroup } from '../../components/FormGroup';
import { Input } from '../../components/Input';
import { useLogin } from './useLogin';

export function Login() {
  const {
    email,
    password,
    handleChangeEmail,
    handleLeftEmailField,
    handleChangePassword,
    handleSubmit,
    getErrorMessageByFieldName,
    isFormValid,
  } = useLogin();
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='w-96'>
        <div className='flex flex-col items-center'>
          <span className='text-md font-semibold'>Bem-vindo(a) ao</span>
          <h1 className='font-bold text-3xl'>
            WAITER
            <span className='font-light'>APP</span>
          </h1>
        </div>

        <div className='my-10 flex flex-col gap-8'>
          <FormGroup error={getErrorMessageByFieldName('email')}>
            <Input
              label='E-mail'
              value={email}
              type='email'
              placeholder='Seu e-mail de acesso'
              error={!!getErrorMessageByFieldName('email')}
              onBlur={handleLeftEmailField}
              onChange={handleChangeEmail}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('password')}>
            <Input
              label='Password'
              value={password}
              type='password'
              placeholder='Informe sua senha'
              error={!!getErrorMessageByFieldName('password')}
              onChange={handleChangePassword}
            />
          </FormGroup>
        </div>

        <Button disabled={!isFormValid} onClick={handleSubmit} size='full'>Fazer Login</Button>
      </div>
    </div>
  );
}
