import Container from 'common/Container';
import ContactsBlock from 'components/ContactsBlock';
import s from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.taglineWrapper}>
        <h1 className="taglineBig">Контакты</h1>
        <p>Заполните форму и наша команда свяжется с вами в ближайшее время.</p>
      </div>

      <Container>
        <ContactsBlock />
      </Container>
    </div>
  );
};

export default ContactsPage;
