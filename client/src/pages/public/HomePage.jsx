import HeroSection from '../../components/home/HeroSection';
import StatsBar from '../../components/home/StatsBar';
import AboutSection from '../../components/home/AboutSection';
import CommitteePreview from '../../components/home/CommitteePreview';
import GuestPreview from '../../components/home/GuestPreview';
import AwardsPreview from '../../components/home/AwardsPreview';
import LegacySection from '../../components/home/LegacySection';
import BrochureSection from '../../components/home/BrochureSection';
import CtaBanner from '../../components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <CommitteePreview />
      <GuestPreview />
      <AwardsPreview />
      <LegacySection />
      <BrochureSection />
      <CtaBanner />
    </>
  );
}
