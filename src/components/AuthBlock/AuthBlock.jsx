import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuthContext } from 'context/AuthProvider';
import { useSetError } from 'context/ErrorProvider';
import { loginUser } from '../../services/firebaseAuth';

import s from './AuthBlock.module.css';
import ErrorMsg from 'common/ErrorMsg/ErrorMsg';
import AdminBlock from './AdminBlock';

const AuthBlock = () => {
  const { register, handleSubmit, reset, setError, clearErrors, formState } =
    useForm();
  const { errors } = formState;
  const { setToken } = useAuthContext();
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
    loginUser(data)
      .then(token => setToken(token))
      // .catch(error => console.log(error))
      .catch(error => setError({ error }))
      .finally(() => {
        // history.push('/spares');
        reset();
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.blockWrapper}>
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
      {/* <Link to="/spares"></Link> */}

      {/* <AdminBlock /> */}
    </div>
  );
};

export default AuthBlock;
