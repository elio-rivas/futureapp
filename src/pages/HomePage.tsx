import HeroIntro from '../components/HeroIntro';
import ServicesCarousel from '../components/ServicesCarousel';
import ParentQuestionnaire from '../components/ParentQuestionnaire';
import SummerProgram from '../components/SummerProgram';
import ParentConcern from '../components/ParentConcern';
import WhyOneOnOne from '../components/WhyOneOnOne';
import ProgramStructure from '../components/ProgramStructure';
import StudentGrowth from '../components/StudentGrowth';
import StoryVideo from '../components/StoryVideo';
import WhyFamiliesChoose from '../components/WhyFamiliesChoose';
import MeetDirector from '../components/MeetDirector';
import ParentTestimonials from '../components/ParentTestimonials';
import ParentExpectations from '../components/ParentExpectations';
import RightFit from '../components/RightFit';
import CTA from '../components/CTA';

// Toggle to true when the Summer Intensive campaign is active
const SHOW_HERO_INTRO = false;
const SHOW_SUMMER_PROGRAM = false;
const SHOW_STUDENT_GROWTH = false;

export default function HomePage() {
        return (
            <>
                    {SHOW_HERO_INTRO && <HeroIntro />}
                    <ServicesCarousel />
                    <ParentQuestionnaire />
                    {SHOW_SUMMER_PROGRAM && <SummerProgram />}
                    <ParentConcern />
                    <WhyOneOnOne />
                    <ProgramStructure />
                    {SHOW_STUDENT_GROWTH && <StudentGrowth />}
                    <StoryVideo />
                    <WhyFamiliesChoose />
                    <MeetDirector />
                    <ParentTestimonials />
                    <ParentExpectations />
                    <RightFit />
                    <CTA />
            </>
        );
}
