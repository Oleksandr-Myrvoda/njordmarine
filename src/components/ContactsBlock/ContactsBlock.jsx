import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useJsApiLoader } from '@react-google-maps/api';
import Contacts from 'common/Contacts';
import Form from 'common/Form/Form';
import GoogleMaps from 'components/GoogleMaps';
import { contactsPageConfig } from 'data/contacts';
import s from './ContactsBlock.module.css';
import SocialBlock from './SocialBlock';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const defaultCenter = {
  lat: 59.4431233,
  lng: 24.8521311,
};

const ContactsBlock = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [formsList, setFormsList] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const sendForm = newForm => {
    setFormsList([...formsList, newForm]);
  };

  return (
    <div className={s.blockWrapper}>
      {!isDesktop && (
        <div className={s.formWrapper}>
          <Form onSubmit={sendForm} isTitle={true} />
        </div>
      )}

      <div className={s.mapWrapper}>
        <h2 className={s.mapTitle}>NJORDMARINE OÜ</h2>
        <Contacts contactsConfig={contactsPageConfig} isContactsPage={true} />

        <div className={s.map}>
          {isLoaded ? <GoogleMaps center={defaultCenter} /> : <h2>Loading</h2>}
        </div>

        <SocialBlock />
      </div>

      {isDesktop && (
        <div className={s.formWrapper}>
          <Form isTitle={true} />
        </div>
      )}
    </div>
  );
};

export default ContactsBlock;
