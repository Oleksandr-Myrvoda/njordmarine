import server from 'images/serv-focus-server.svg';
import satellite from 'images/serv-focus-satellite.svg';
import headphones from 'images/serv-focus-headphones.svg';
import doc from 'images/serv-focus-doc.svg';

const focusConfig = [
  {
    imgUrl: server,
    title: 'Шаг 1',
    text: 'Сбор данных со всего флота',
    alt: 'server',
  },
  {
    imgUrl: satellite,
    title: 'Шаг 2',
    text: 'Передача данных в офис',
    alt: 'satellite',
  },
  {
    imgUrl: headphones,
    title: 'Шаг 3',
    text: 'Обработка полученных данных',
    alt: 'headphones',
  },
  {
    imgUrl: doc,
    title: 'Шаг 4',
    text: 'Выдача рекомендаций для увеличения энергоэффективности судна',
    alt: 'doc',
  },
];

const focusOptionsConfig = [
  { text: 'Сокращаем время на выполнение всех процессов статистики' },
  { text: 'Высокая точность отображения параметров' },
  { text: 'Безопасный доступ' },
  { text: 'Хранение данных на удобной для клиента площадке' },
  { text: 'Выдаваемые рекомендации системой на снижение расходов' },
];

export { focusConfig, focusOptionsConfig };
