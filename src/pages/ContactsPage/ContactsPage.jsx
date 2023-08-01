import { useTranslation } from 'react-i18next';
import Container from 'common/Container';
import ContactsBlock from 'components/ContactsBlock';
import s from './ContactsPage.module.css';

const ContactsPage = () => {
  const { t } = useTranslation();
  return (
    <div className={s.pageWrapper}>
      <Container>
        <div className={s.taglineWrapper}>
          <h1 className="taglineBig">{t('contacts.taglineBig')}</h1>
          <p>{t('contacts.text')}</p>
        </div>
        <ContactsBlock />
        <a href="/" className={s.link}>
          {t('geoBlock.bigButtonLink')}
        </a>
      </Container>
    </div>
  );
};

export default ContactsPage;
