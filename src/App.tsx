import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SummerProgramPage from './pages/SummerProgramPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import HomeschoolPlansPage from './pages/HomeschoolPlansPage';
import ProgramsPage from './pages/ProgramsPage';
import TuitionEnrollmentPage from './pages/TuitionEnrollmentPage';
import AssessmentsPage from './pages/AssessmentsPage';
import QuestionnaireModal from './components/QuestionnaireModal';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/summer-program" element={<SummerProgramPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/homeschool-plans" element={<HomeschoolPlansPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/tuition-enrollment" element={<TuitionEnrollmentPage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
            </Routes>
          </main>
          <Footer />
          <QuestionnaireModal />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
