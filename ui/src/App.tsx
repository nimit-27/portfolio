import { Box } from '@mui/material';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import Navbar from './components/Navbar';
import ThemeFab from './components/ThemeFab';

const App = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: 8, md: 10 } }}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </Box>
      <ThemeFab />
    </Box>
  );
};

export default App;
