import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import BigButton from 'common/BigButton';
import ErrorMsg from 'common/ErrorMsg';
import PropTypes from 'prop-types';
import s from './Form.module.css';

const {
  REACT_APP_FORM_SERVICE_ID,
  REACT_APP_FORM_TEMPLATE_ID,
  REACT_APP_FORM_USER_ID,
} = process.env;

const textValidation = {
  required: 'This field is required',
  minLength: {
    value: 2,
    message: 'Field should have more than 1 letter',
  },
};

const emailValidation = {
  required: 'Email is required',
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Invalid email address',
  },
};
// const phoneValidation = {
//   pattern: {
//     value:
//       /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
//     message: 'Invalid phone number format',
//   },
// };

const Form = ({ isTitle }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const form = useRef();

  const onSubmit = data => {

    emailjs
      .sendForm(
        REACT_APP_FORM_SERVICE_ID,
        REACT_APP_FORM_TEMPLATE_ID,
        form.current,
        REACT_APP_FORM_USER_ID,
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        },
      );
  };

  return (
    <div className={s.container}>
      {isTitle && <h2 className="tagline">{t('form.tagline')}</h2>}

      <form ref={form} onSubmit={handleSubmit(onSubmit)} className={s.inner}>
        <label>
          <p className={s.label}>{t('form.name')}</p>
          <input
            name="customerName"
            type="text"
            placeholder={t('form.nameInput')}
            {...register('customerName', textValidation)}
          />
          {errors.customerName && (
            <ErrorMsg message={errors.customerName.message} />
          )}
        </label>

        <label>
          <p className={s.label}>{t('form.email')}</p>
          <input
            name="email"
            type="text"
            placeholder={t('form.emailInput')}
            {...register('email', emailValidation)}
          />
          {errors.email && <ErrorMsg message={errors.email.message} />}
        </label>

        <label>
          <p className={s.label}>{t('form.phone')}</p>
          <input
            name="phone"
            // type="tel"
            placeholder={t('form.phoneInput')}
            {...register('phone')}
          />
        </label>

        <label>
          <p className={s.label}>{t('form.subjMessage')}</p>
          <input
            name="subjMessage"
            type="text"
            placeholder={t('form.subjMessageInput')}
            {...register('subjMessage')}
          />
        </label>

        <label className={s.labelTextarea}>
          <p className={s.label}>{t('form.message')}</p>
          <textarea
            className={s.textarea}
            name="message"
            type="text"
            placeholder={t('form.messageInput')}
            {...register('message')}
          ></textarea>
        </label>

        <div className={s.btns}>
          <BigButton type="submit" text={t('form.bigBtn')} />

          <a className={s.link} href="http://">
            {t('form.privacyTerms')}
          </a>
        </div>
      </form>
    </div>
  );
};

// Form.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default Form;

// const Form = ({ onSubmit, isTitle }) => {
//   const { t } = useTranslation();
//   const [customerName, setCustomerName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [themeMessage, setThemeMessage] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = e => {
//     e.preventDefault();
//     onSubmit({ customerName, phone, email, themeMessage, message });
//     reset();
//   };

//   const reset = () => {
//     setCustomerName('');
//     setEmail('');
//     setPhone('');
//     setThemeMessage('');
//     setMessage('');
//   };

//   return (
//     <div className={s.container}>
//       {isTitle && <h2 className="tagline">{t('form.tagline')}</h2>}
//       <form onSubmit={handleSubmit} className={s.inner}>
//         <label>
//           <p className={s.label}>{t('form.name')}</p>
//           <input
//             name="customerName"
//             value={customerName}
//             type="text"
//             placeholder={t('form.nameInput')}
//             required
//             onChange={e => setCustomerName(e.target.value)}
//           />
//         </label>
//         <label>
//           <p className={s.label}>{t('form.email')}</p>
//           <input
//             name="email"
//             value={email}
//             type="email"
//             placeholder={t('form.emailInput')}
//             required
//             onChange={e => setEmail(e.target.value)}
//           />
//         </label>
//         <label>
//           <p className={s.label}>{t('form.phone')}</p>
//           <input
//             name="phone"
//             value={phone}
//             type="tel"
//             placeholder={t('form.phoneInput')}
//             onChange={e => setPhone(e.target.value)}
//           />
//         </label>
//         <label>
//           <p className={s.label}>{t('form.subjMessage')}</p>
//           <input
//             name="themeMessage"
//             value={themeMessage}
//             type="text"
//             placeholder={t('form.subjMessageInput')}
//             onChange={e => setThemeMessage(e.target.value)}
//           />
//         </label>
//         <label className={s.labelTextarea}>
//           <p className={s.label}>{t('form.message')}</p>
//           <textarea
//             className={s.textarea}
//             name="message"
//             value={message}
//             type="text"
//             placeholder={t('form.messageInput')}
//             onChange={e => setMessage(e.target.value)}
//           ></textarea>
//         </label>
//         <div className={s.btns}>
//           <BigButton type="submit" text={t('form.bigBtn')} />

//           <a className={s.link} href="http://">
//             {t('form.privacyTerms')}
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// };

// Form.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Form;
