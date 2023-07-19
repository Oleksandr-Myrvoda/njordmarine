import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/firebaseAuth';

const defaultValues = {
  email: 'njordfire@gmail.com',
  password: 'Njordfire2023',
};

const AuthPage = ({ setToken }) => {
  const form = useForm({ defaultValues });
  const { register, handleSubmit, formState } = useForm();
  console.log('form', form.formState);
  //   const [form, setForm] = useState({ initialState });

  const onSubmit = data => {
    console.log('form-data', data);

    loginUser(data).then(token => setToken(token));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">
        <p>email njordfire@gmail.com</p>
        <input
          type="text"
          //   name="email"
          //   onChange={() => {}}
          //   value=""
          placeholder="email"
          {...register('email')}
        />
      </label>
      <label htmlFor="">
        <p>password Njordfire2023</p>
        <input
          type="text"
          //   name="password"
          //   onChange={() => {}}
          //   value=""
          placeholder="password"
          {...register('password')}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default AuthPage;
