import phone from 'images/phone.svg';
import mail from 'images/mail.svg';

import mailC from 'images/contact-mail.svg';
import phoneC from 'images/contact-phone.svg';
import markerC from 'images/contact-marker.svg';

import fb from 'images/contact-fb.svg';
import insta from 'images/contact-insta.svg';
import linked from 'images/contact-in.svg';

const contactsConfig = [
  {
    imgUrl: phone,
    text: '+37258667396',
    alt: 'phone',
  },
  {
    imgUrl: mail,
    text: 'sales@njordmarine.eu',
    alt: 'mail',
  },
];

const contactsPageConfig = [
  {
    imgUrl: phoneC,
    text: '+37258667396',
    alt: 'phone',
  },
  {
    imgUrl: mailC,
    text: 'sales@njordmarine.eu',
    alt: 'mail',
  },
  {
    imgUrl: markerC,
    text: 'Tähesaju tee 9-208, 13917, Tallinn, Estonia',
    alt: 'marker',
  },
];
const contactsPageSocial = [
  {
    imgUrl: fb,
    text: '',
    alt: 'facebook',
  },
  {
    imgUrl: insta,
    text: '',
    alt: 'instagram',
  },
  {
    imgUrl: linked,
    text: '',
    alt: 'linkedin',
  },
];

export { contactsConfig, contactsPageConfig, contactsPageSocial };
