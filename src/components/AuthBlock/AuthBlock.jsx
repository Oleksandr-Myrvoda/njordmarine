import { Link, useHistory } from 'react-router-dom';
import { useSetError, useSetOtherError } from 'context/ErrorProvider';

import AdminBlock from './AdminBlock';
import ErrorMsg from 'common/ErrorMsg/ErrorMsg';
import { loginUser } from '../../services/firebaseAuth';
import s from './AuthBlock.module.css';
import { useAuthContext } from 'context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const AuthBlock = () => {
  const { register, handleSubmit, reset, setError, clearErrors, formState } =
    useForm({
      defaultValues: {
        email: 'njordfire@gmail.com',
        password: 'Njordfire2023',
      },
    });
  const { errors } = formState;
  const { setToken, token } = useAuthContext();
  const setOtherError = useSetOtherError();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  // const loginUser = data => {
  //   if (data.email !== 'valid_email' || data.password !== 'valid_password') {
  //     setError('authentication', {
  //       type: 'manual',
  //       message: 'Invalid email or password',
  //     });
  //     return Promise.reject(new Error('Invalid email or password'));
  //   }

  //   // В случае успешной аутентификации, возвращаем токен
  //   return Promise.resolve('your_auth_token_here');
  // };

  const onSubmit = data => {
    loginUser(data) // undefined
      .then(token => setToken(token))
      // .catch(error => console.log(error))
      .catch(error => setOtherError(error))
      .finally(() => {
        // history.push('/spares');
        reset({
          email: '',
          password: '',
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.blockWrapper}>
      {!token ? (
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            <p>Email</p>
            <input
              className={s.input}
              type="text"
              placeholder="email"
              {...register('email')}
            />
          </label>

          <label htmlFor="">
            <p>Password</p>
            <input
              className={s.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              {...register('password')}
            />
          </label>

          {errors.email && <ErrorMsg message={errors.email.message} />}
          {errors.password && <ErrorMsg message={errors.password.message} />}
          {/* {errors.authentication && <p>{errors.authentication.message}</p>} */}

          <label htmlFor="showPasswordCheckbox">
            <p>Show Password</p>
            <input
              type="checkbox"
              id="showPasswordCheckbox"
              onChange={togglePasswordVisibility}
              checked={showPassword}
            />
          </label>

          <button className={s.login} type="submit">
            Login
          </button>
        </form>
      ) : (
        <AdminBlock token={token} />
      )}
    </div>
  );
};

export default AuthBlock;
