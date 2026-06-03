import HeroIntro from '../components/HeroIntro';
import ParentQuestionnaire from '../components/ParentQuestionnaire';
import QuestionnaireModal from '../components/QuestionnaireModal';
import SummerProgram from '../components/SummerProgram';
import ParentConcern from '../components/ParentConcern';
import WhyOneOnOne from '../components/WhyOneOnOne';
import ProgramStructure from '../components/ProgramStructure';
import StudentGrowth from '../components/StudentGrowth';
import WhyFamiliesChoose from '../components/WhyFamiliesChoose';
import MeetDirector from '../components/MeetDirector';
import ParentTestimonials from '../components/ParentTestimonials';
import ParentExpectations from '../components/ParentExpectations';
import RightFit from '../components/RightFit';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <>
      <QuestionnaireModal />
      <HeroIntro />
      <ParentQuestionnaire />
      <SummerProgram />
      <ParentConcern />
      <WhyOneOnOne />
      <ProgramStructure />
      <StudentGrowth />
      <WhyFamiliesChoose />
      <MeetDirector />
      <ParentTestimonials />
      <ParentExpectations />
      <RightFit />
      <CTA />
    </>
  );
}
