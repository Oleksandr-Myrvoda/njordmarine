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
    text: '+372 5866 7396',
    alt: 'phone',
    href: 'tel:37258667396',
  },
  {
    imgUrl: mail,
    text: 'sales@njordmarine.eu',
    alt: 'mail',
    href: 'mailto:sales@njordmarine.eu',
  },
];

const contactsPageConfig = [
  {
    imgUrl: phoneC,
    text: '+372 5866 7396',
    alt: 'phone',
    href: 'tel:37258667396',
  },
  {
    imgUrl: mailC,
    text: 'sales@njordmarine.eu',
    alt: 'mail',
    href: 'mailto:sales@njordmarine.eu',
  },
  {
    imgUrl: markerC,
    text: 'Tähesaju tee 9-208, 13917, Tallinn, Estonia',
    alt: 'marker',
  },
];

const socConfig = [
  {
    linkUrl: 'https://www.facebook.com/',
    imgUrl: fb,
    alt: 'facebook',
  },
  {
    linkUrl: 'https://www.instagram.com/',
    imgUrl: insta,
    alt: 'instagram',
  },
  {
    linkUrl: 'https://www.linkedin.com/',
    imgUrl: linked,
    alt: 'linkedin',
  },
];

export { contactsConfig, contactsPageConfig, socConfig };
