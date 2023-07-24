import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useAuthContext } from 'context/AuthProvider';
import { useSetError } from 'context/ErrorProvider';
import { loginUser } from '../../services/firebaseAuth';

import s from './AuthBlock.module.css';

const defaultValues = {
  email: '',
  password: '',
};

const AuthBlock = () => {
  // const form = useForm({ defaultValues });
  const { register, handleSubmit } = useForm({ defaultValues });
  const { setToken } = useAuthContext();
  const setError = useSetError();
  // console.log('form', form.formState);
  //   const [form, setForm] = useState({ initialState });

  const onSubmit = data => {
    console.log('form-data', data);

    loginUser(data)
      .then(token => setToken(token))
      .catch(error => setError({ error }));
    // .finally(() => console.log('data', data));
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
            type="text"
            placeholder="password"
            {...register('password')}
          />
        </label>

        <button className={s.login} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AuthBlock;
