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
    text: '+372 5866 7196',
    alt: 'phone',
    href: 'tel:37258667196',
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
    text: '+372 5866 7196',
    alt: 'phone',
    href: 'tel:37258667196',
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
    linkUrl: 'https://www.facebook.com/profile.php?id=100063942675755',
    imgUrl: fb,
    alt: 'facebook',
  },
  {
    linkUrl: 'https://www.instagram.com/njordmarine/',
    imgUrl: insta,
    alt: 'instagram',
  },
  {
    linkUrl: 'https://www.linkedin.com/company/njordmarine-oü',
    imgUrl: linked,
    alt: 'linkedin',
  },
];

export { contactsConfig, contactsPageConfig, socConfig };
