import { useEffect, useState } from 'react';

import { getBrochureApi } from 'services/api';
import { useLangContext } from 'context/LangProvider';
import { useSetOtherError } from 'context/ErrorProvider';
import { useTranslation } from 'react-i18next';
import s from './BrochureButton.module.css';

const BrochureButton = () => {
  const { t } = useTranslation();
  const { lang } = useLangContext();
  const setOtherError = useSetOtherError();
  const [fileUrl, setFileUrl] = useState({ ru: '', en: '' }); // {ru: https, en: "https"}

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

  return (
    <a href={fileUrl[lang]} download target="_blank" rel="noreferrer">
      <button className={s.brochureBtn} type="button">
        {t('common.brochureBtn')}
      </button>
    </a>
  );
};

export default BrochureButton;
