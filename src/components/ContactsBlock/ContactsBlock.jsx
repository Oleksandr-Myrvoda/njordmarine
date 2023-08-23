import { useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useJsApiLoader } from '@react-google-maps/api';
import AfterSendEmail from 'common/SendInfo/AfterSendEmail';
import Contacts from 'common/Contacts';
import Form from 'common/Form/Form';
import LoaderSpinner from 'common/LoaderSpinner';
import GoogleMaps from 'components/GoogleMaps';
import SocialBlock from './SocialBlock';
import { contactsPageConfig } from 'data/contacts';

import s from './ContactsBlock.module.css';
import Modal from 'common/Modal/Modal';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const defaultCenter = {
  lat: 59.4431233,
  lng: 24.8521311,
};

const ContactsBlock = () => {
  // const [isEmailSended, setEmailSended] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  // const confirmSending = () => setEmailSended(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // setEmailSended(false);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  return (
    <div className={s.blockWrapper}>
      {!isDesktop && (
        <div className={s.formWrapper}>
          <Form isTitle={true} openModal={openModal} isContactsPage={true} />
          {isModalOpen && (
            <Modal>
              <AfterSendEmail closeModal={closeModal} />
            </Modal>
          )}
        </div>
      )}
      {/* {!isDesktop && (
        <div className={s.formWrapper}>
          <Form isTitle={true} openModal={openModal} isContactsPage={true} />
          {isModalOpen && (
            <Modal>
              <AfterSendEmail closeModal={closeModal} />
            </Modal>
          )}
        </div>
      )} */}

      {/* {!isDesktop && (
        <div className={s.formWrapper}>
          {!isEmailSended ? (
            <Form isTitle={true} setEmailSended={setEmailSended} />
          ) : (
            <AfterSendEmail
              closeModal={confirmSending}
              setEmailSended={setEmailSended}
            />
          )}
        </div>
      )} */}

      <div className={s.mapWrapper}>
        <div className={s.mapContainer}>
          <h2 className={s.mapTitle}>NJORDMARINE OÜ</h2>
          <Contacts contactsConfig={contactsPageConfig} isContactsPage={true} />

          <div className={s.map}>
            {isLoaded ? (
              <GoogleMaps center={defaultCenter} />
            ) : (
              <LoaderSpinner />
            )}
          </div>

          <SocialBlock />
        </div>
      </div>

      {isDesktop && (
        <div className={s.formWrapper}>
          <Form
            isTitle={true}
            openModal={openModal}
            setEmailSended={() => {}}
            isContactsPage={true}
          />

          {isModalOpen && (
            <Modal>
              <AfterSendEmail closeModal={closeModal} />
            </Modal>
          )}
        </div>
      )}
      {/* {isDesktop && (
        <div className={s.formWrapper}>
          {!isEmailSended ? (
            <Form isTitle={true} setEmailSended={setEmailSended} />
          ) : (
            <AfterSendEmail
              closeModal={confirmSending}
              setEmailSended={setEmailSended}
            />
          )}
        </div>
      )} */}
    </div>
  );
};

export default ContactsBlock;
