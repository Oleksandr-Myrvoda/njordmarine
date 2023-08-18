import { useSetError, useSetOtherError } from 'context/ErrorProvider';
import AdminBlock from './AdminBlock';
import { loginUser } from '../../services/firebaseAuth';
import s from './AuthBlock.module.css';
import { useAuthContext } from 'context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const AuthBlock = () => {
  const { register, handleSubmit, reset, setError, clearErrors, formState } =
    useForm();
  const { errors } = formState;
  const { setToken, token } = useAuthContext();
  const setOtherError = useSetOtherError();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    loginUser(data) // undefined
      .then(token => setToken(token))
      .catch(error => setOtherError(error))
      .finally(() => {
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
            <p className={s.label}>Email</p>
            <input
              className={s.input}
              type="text"
              placeholder="email"
              {...register('email')}
            />
          </label>

          <label htmlFor="">
            <p className={s.label}>Password</p>
            <input
              className={s.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              {...register('password')}
            />
          </label>

          <label htmlFor="showPasswordCheckbox">
            <p className={s.label}>Show Password</p>
            <input
              className={s.check}
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
