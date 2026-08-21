import { useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useJsApiLoader } from '@react-google-maps/api';
import AfterSendEmail from 'common/SendInfo/AfterSendEmail';
import Contacts from 'common/Contacts';
import Form from 'common/Form/Form';
import LoaderSpinner from 'common/LoaderSpinner';
import GoogleMaps from 'components/GoogleMaps';
import SocialBlock from './SocialBlock';
import {
  contactsPageConfigEstonia,
  contactsPageConfigGreece,
} from 'data/contacts';
import { useTranslation } from 'react-i18next';

import s from './ContactsBlock.module.css';
import Modal from 'common/Modal/Modal';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const defaultCenterEstonia = {
  lat: 59.4431233,
  lng: 24.8521311,
};

const defaultCenterGreece = {
  lat: 37.9573,
  lng: 23.71815,
};

const estoniaConfig = {
  contacts: contactsPageConfigEstonia,
  center: defaultCenterEstonia,
};
const greeceConfig = {
  contacts: contactsPageConfigGreece,
  center: defaultCenterGreece,
};

const ContactsBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  return (
    <div className={s.blockWrapper}>
      {!isDesktop && (
        <div className={s.formWrapper}>
          <Form
            isTitle={true}
            openModal={openModal}
            setEmailSended={() => {}}
            isContactsPage={true}
          />
          {isModalOpen && (
            <Modal onClose={closeModal} isFullScreenMobileSize={true}>
              <AfterSendEmail closeModal={closeModal} />
            </Modal>
          )}
        </div>
      )}

      {!isDesktop && (
        <div className={s.mapWrapper}>
          <div className={`${s.mapContainer} ${s.mapContainerTop}`}>
            <h2 className={s.mapTitle}>NJORDMARINE OÜ</h2>

            <Contacts
              contactsConfig={estoniaConfig.contacts}
              isContactsPage={true}
            />

            {isLoaded ? (
              <GoogleMaps center={estoniaConfig.center} />
            ) : (
              <LoaderSpinner />
            )}

            <div className={s.mapBtnsBlock}>
              <SocialBlock />
            </div>
          </div>

          <div className={s.mapContainer}>
            <h2 className={s.mapTitle}>
              {t('contacts.represent')}:<br />
              Martechnic Navigation Limited
            </h2>

            <Contacts
              contactsConfig={greeceConfig.contacts}
              isContactsPage={true}
            />

            {isLoaded ? (
              <GoogleMaps center={greeceConfig.center} />
            ) : (
              <LoaderSpinner />
            )}

            <div className={s.mapBtnsBlock}>
              <SocialBlock />
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP */}
      {isDesktop && (
        <div className={s.mapWrapper}>
          <div className={`${s.mapContainer} ${s.mapContainerTop}`}>
            <div className={s.mapBox}>
              <h2 className={s.mapTitle}>NJORDMARINE OÜ</h2>

              <Contacts
                contactsConfig={estoniaConfig.contacts}
                isContactsPage={true}
              />

              <div className={s.mapBtnsBlock}>
                <SocialBlock />
              </div>
            </div>

            {isLoaded ? (
              <GoogleMaps center={estoniaConfig.center} />
            ) : (
              <LoaderSpinner />
            )}
          </div>

          <div className={s.mapContainer}>
            <div className={s.mapBox}>
              <h2 className={s.mapTitle}>
                {t('contacts.represent')}:<br />
                Martechnic Navigation Limited
              </h2>

              <Contacts
                contactsConfig={greeceConfig.contacts}
                isContactsPage={true}
              />

              <div className={s.mapBtnsBlock}>
                <SocialBlock />
              </div>
            </div>

            {isLoaded ? (
              <GoogleMaps center={greeceConfig.center} />
            ) : (
              <LoaderSpinner />
            )}
          </div>
        </div>
      )}

      {isDesktop && (
        <div className={s.formWrapper}>
          <Form
            isTitle={true}
            openModal={openModal}
            setEmailSended={() => {}}
            isContactsPage={true}
          />

          {isModalOpen && (
            <Modal onClose={closeModal} isModalWhiteBG={true}>
              <AfterSendEmail closeModal={closeModal} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactsBlock;
