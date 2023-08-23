import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLangContext } from 'context/LangProvider';
import { useSetOtherError } from 'context/ErrorProvider';
import { getTermsApi } from 'services/api';
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

const Form = ({ isTitle, setEmailSended, openModal, isContactsPage }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState, trigger, clearErrors, reset } =
    useForm({
      defaultValues: {
        customerName: '', // Здесь укажите начальные значения для всех полей
        email: '', // Здесь укажите начальные значения для всех полей
        companyName: '', // Здесь укажите начальные значения для всех полей
      },
    });
  const { errors } = formState;
  const form = useRef();

  const { lang } = useLangContext();
  const setOtherError = useSetOtherError();
  const [fileUrl, setFileUrl] = useState({ ru: '', en: '' });

  const textValidation = {
    required: `${t('form.required')}`,
    minLength: {
      value: 2,
      message: `${t('form.moreLetters')}`,
    },
  };

  const emailValidation = {
    required: `${t('form.required')}`,
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: `${t('form.invalidEmail')}`,
    },
  };

  const handleBlur = async e => {
    const name = e.target.name;
    await trigger(name); // Выполняем валидацию с помощью trigger
  };

  const handleInput = e => {
    const name = e.target.name;
    clearErrors(name); // Очищаем ошибки при вводе
  };

  useEffect(() => {
    getTermsApi()
      .then(termRefs => {
        const { id, ...rest } = termRefs;
        setFileUrl(rest);
      })
      .catch(error => {
        setOtherError(error.response.data);
        console.log('setOtherErorr(error.response.data)');
        console.dir(error);
      });
  }, []);

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
          console.log('isContactsPage', isContactsPage);
          if (isContactsPage) {
            openModal();
          }
          console.log(result.text);
          reset();
        },
        error => {
          console.log(error.text);
        },
      );
  };

  return (
    <div className={s.container}>
      {isTitle && (
        <div className={s.taglineWrapper}>
          <h2 className="tagline">{t('form.tagline')}</h2>
        </div>
      )}

      <form ref={form} onSubmit={handleSubmit(onSubmit)} className={s.inner}>
        <label className={s.labelWrapper}>
          <p className={s.label}>{t('form.name')}</p>
          <input
            className={s.formInput}
            name="customerName"
            type="text"
            placeholder={t('form.nameInput')}
            {...register('customerName', textValidation)}
            onBlur={handleBlur}
            onInput={handleInput}
          />

          {errors.customerName && (
            <ErrorMsg message={errors.customerName.message} />
          )}
        </label>

        <label className={s.labelWrapper}>
          <p className={s.label}>{t('form.email')}</p>
          <input
            className={s.formInput}
            name="email"
            type="text"
            placeholder={t('form.emailInput')}
            {...register('email', emailValidation)}
            onBlur={handleBlur}
            onInput={handleInput}
          />

          {errors.email && <ErrorMsg message={errors.email.message} />}
        </label>

        <label className={s.labelWrapper}>
          <p className={s.label}>{t('form.phone')}</p>
          <input
            className={s.formInput}
            name="phone"
            type="tel"
            placeholder={t('form.phoneInput')}
            {...register('phone')}
          />
        </label>

        <label className={s.labelWrapper}>
          <p className={s.label}>{t('form.companyName')}</p>
          <input
            className={s.formInput}
            name="companyName"
            type="text"
            placeholder={t('form.companyNameInput')}
            {...register('companyName', textValidation)}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          {errors.companyName && (
            <ErrorMsg message={errors.companyName.message} />
          )}
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
          <BigButton
            type="submit"
            text={t('form.bigBtn')}
            disabled={!formState.isValid}
          />

          <a
            href={fileUrl[lang]}
            download
            className={s.ternsLink}
            target="_blank"
            rel="noreferrer"
          >
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
