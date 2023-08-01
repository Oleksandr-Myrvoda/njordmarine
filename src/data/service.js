import refreshSquare from 'images/service-RefreshSquare.svg';
import settings from 'images/service-Settings.svg';
import tools from 'images/service-Tools.svg';
import diagramUp from 'images/service-DiagramUp.svg';

export const serviceConfig = [
  {
    imgUrl: refreshSquare,
    text: 'Услуги по автоматизации судна',
    alt: 'refreshSquare',
    to: 'services/automation',
  },
  {
    imgUrl: settings,
    text: 'Техническое обслуживание',
    alt: 'settings',
    to: 'services/maintenance',
  },
  {
    imgUrl: tools,
    text: 'Запчасти',
    alt: 'tools',
    to: 'spares',
  },
  {
    imgUrl: diagramUp,
    text: 'Система  энергоэффективности судна',
    alt: 'diagramUp',
    to: 'services/energy',
  },
];
