import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLangContext } from 'context/LangProvider';
import { useAdminContext } from 'context/AdminProvider';

import s from './BrochureButton.module.css';

const BrochureButton = () => {
  const { t } = useTranslation();
  const { lang } = useLangContext();
  const { brochureLink } = useAdminContext();
  const [fileUrl, setFileUrl] = useState(brochureLink);

  // const instruction = "Откройте Google Диск (https://drive.google.com) и войдите в свою учетную запись Google.
  // Загрузите файл, который вы хотите скачать с вашего React-приложения.
  //   Найдите загруженный файл в списке файлов на Google Диске.
  //   Щелкните правой кнопкой мыши на файле и выберите "Поделиться".
  //   В открывшемся окне выберите вариант "Получить ссылку для общего доступа".
  //   В появившемся окне настройте доступ к файлу на "Все с доступом по ссылке".
  //   Скопируйте ссылку, которая выглядит примерно так: https://drive.google.com/file/d/ваш_идентификатор_файла/view."

  useEffect(() => {
    const getFileUrlByLang = () => {
      if (lang === 'ru') {
        return brochureLink.ru;
      } else if (lang === 'en') {
        return brochureLink.en;
      } else {
        return brochureLink.en;
      }
    };
    const newFileUrl = getFileUrlByLang();
    setFileUrl(newFileUrl);
  }, [brochureLink.en, brochureLink.ru, lang]);

  return (
    <a href={fileUrl} download>
      <button className={s.brochureBtn} type="button">
        {t('common.brochureBtn')}
      </button>
    </a>
  );
};

export default BrochureButton;
