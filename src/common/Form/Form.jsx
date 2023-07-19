import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import BigButton from 'common/BigButton';
import PropTypes from 'prop-types';
import s from './Form.module.css';

const Form = ({ isTitle }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = data => {
    console.log('form-data', data);
    // e.preventDefault();
    // onSubmit({ customerName, phone, email, themeMessage, message });
    // reset();
  };

  return (
    <div className={s.container}>
      {isTitle && <h2 className="tagline">{t('form.tagline')}</h2>}

      <form onSubmit={handleSubmit(onSubmit)} className={s.inner}>
        <label>
          <p className={s.label}>{t('form.name')}</p>
          <input
            type="text"
            placeholder={t('form.nameInput')}
            {...register('customerName')}
          />
        </label>
        <label>
          <p className={s.label}>{t('form.email')}</p>
          <input
            type="email"
            placeholder={t('form.emailInput')}
            {...register('email')}
          />
        </label>
        <label>
          <p className={s.label}>{t('form.phone')}</p>
          <input
            type="tel"
            placeholder={t('form.phoneInput')}
            {...register('phone')}
          />
        </label>
        <label>
          <p className={s.label}>{t('form.subjMessage')}</p>
          <input
            type="text"
            placeholder={t('form.subjMessageInput')}
            {...register('subjMessage')}
          />
        </label>
        <label className={s.labelTextarea}>
          <p className={s.label}>{t('form.message')}</p>
          <textarea
            className={s.textarea}
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
