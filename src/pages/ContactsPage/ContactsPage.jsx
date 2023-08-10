import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { getBrochureApi } from 'services/api';
import { useLangContext } from 'context/LangProvider';
import { useSetOtherError } from 'context/ErrorProvider';
import ContactsBlock from 'components/ContactsBlock';
import s from './ContactsPage.module.css';
import Trail from 'common/Trail/Trail';

const ContactsPage = () => {
  const { t } = useTranslation();
  const { lang } = useLangContext();
  const setOtherError = useSetOtherError();
  const [fileUrl, setFileUrl] = useState({ ru: '', en: '' });
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    getBrochureApi()
      .then(refs => {
        const { id, ...rest } = refs;
        setFileUrl(rest);
      })
      .catch(error => {
        setOtherError(error.response.data);
        console.log('setOtherErorr(error.response.data)');
        console.dir(error);
      });
  }, [setOtherError]);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.pageWrapper}>
      <div className={s.container}>
        <div className={s.taglineWrapper}>
          <Trail open={isAnimated} heightD={60} heightMob={48}>
            <h1 className="taglineBig">{t('contacts.taglineBig')}</h1>
          </Trail>

          <p>{t('contacts.text')}</p>
        </div>
        <ContactsBlock />

        <a href={fileUrl[lang]} download className={s.link}>
          {t('geoBlock.bigButtonLink')}
        </a>
      </div>
    </div>
  );
};

export default ContactsPage;
