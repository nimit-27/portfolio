import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../theme/ThemeContext';

const sections = ['home', 'about', 'projects', 'experience', 'contact'] as const;

type Section = (typeof sections)[number];

const scrollTo = (id: Section) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 20 });
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { themeName } = useAppTheme();

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <AppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      sx={{
        backdropFilter: 'blur(18px)',
        backgroundColor: trigger ? 'rgba(15,23,42,0.85)' : 'transparent',
        color: trigger ? 'primary.contrastText' : 'text.primary',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 80, justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Nimit · {themeName.toUpperCase()}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 2, md: 1 }}
              sx={{
                position: { xs: 'fixed', md: 'static' },
                inset: { xs: open ? '0 0 0 30%' : '0 0 0 100%', md: 'auto' },
                backgroundColor: { xs: 'background.default', md: 'transparent' },
                transition: 'all 0.4s ease',
                p: { xs: 3, md: 0 },
                pt: { xs: 10, md: 0 },
                height: { xs: '100vh', md: 'auto' },
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
                zIndex: { xs: open ? 1200 : -1, md: 'auto' },
              }}
            >
              {sections.map((section) => (
                <Button
                  key={section}
                  color="inherit"
                  onClick={() => scrollTo(section)}
                  sx={{ fontWeight: 600, letterSpacing: '0.04em' }}
                >
                  {t(`nav.${section}`)}
                </Button>
              ))}
              <Button startIcon={<LanguageRoundedIcon />} color="inherit" onClick={toggleLanguage}>
                {t('nav.language')}
              </Button>
            </Stack>
            <IconButton
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              onClick={() => setOpen((prev) => !prev)}
              color="inherit"
            >
              {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
