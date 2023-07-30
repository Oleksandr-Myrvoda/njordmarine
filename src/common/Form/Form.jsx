import { useRef } from 'react';
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

const Form = ({ isTitle, setEmailSended }) => {
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
          setEmailSended(true);
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
            className={s.formInput}
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
            className={s.formInput}
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
            className={s.formInput}
            name="phone"
            type="tel"
            placeholder={t('form.phoneInput')}
            // {...register('phone', phoneValidation)}
            {...register('phone')}
          />
          {/* {errors.phone && <ErrorMsg message={errors.phone.message} />} */}
        </label>

        <label>
          <p className={s.label}>{t('form.subjMessage')}</p>
          <input
            className={s.formInput}
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

Form.propTypes = {
  setEmailSended: PropTypes.func.isRequired,
  isTitle: PropTypes.bool.isRequired,
};

export default Form;
