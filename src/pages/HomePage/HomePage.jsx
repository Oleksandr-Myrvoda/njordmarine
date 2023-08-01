import Container from 'common/Container';
import HeroBlock from 'components/HeroBlock';
import ServicesBlock from 'components/ServicesBlock';
import AdvantagesBlock from 'components/AdvantagesBlock';
import GeoBlock from 'components/GeoBlock';

const HomePage = () => {
  return (
    // <Container>
    <>
      <HeroBlock />
      <ServicesBlock />
      <AdvantagesBlock />
      <GeoBlock />
    </>
    // </Container>
  );
};

export default HomePage;
