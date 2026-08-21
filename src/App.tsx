import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import RouteTracker from './components/RouteTracker';
import HomePage from './pages/HomePage';
import SummerProgramPage from './pages/SummerProgramPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import HomeschoolPlansPage from './pages/HomeschoolPlansPage';
import ProgramsPage from './pages/ProgramsPage';
import TuitionEnrollmentPage from './pages/TuitionEnrollmentPage';
import AssessmentsPage from './pages/AssessmentsPage';
import CareersPage from './pages/CareersPage';
import QuestionnaireModal from './components/QuestionnaireModal';
import FamilyFormPage from './pages/FamilyFormPage';

function AppRoutes() {
  const location = useLocation();
  const isStandaloneForm = location.pathname.replace(/\/+$/, '') === '/family-form';

  if (isStandaloneForm) {
    return (
      <Routes>
        <Route path="/family-form" element={<FamilyFormPage />} />
      </Routes>
    );
  }

  return (
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
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </main>
      <Footer />
      <QuestionnaireModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteTracker />
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
