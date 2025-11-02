import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { gradients } from '../theme/colors';
import SocialRail from '../components/SocialRail';
import { useTranslation } from 'react-i18next';

const MotionTypography = motion.create(Typography);

const buttonVariants = {
  initial: { y: 0 },
  hover: { y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } },
};

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Box id="home" sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 12, md: 16 }, pb: { xs: 12, md: 20 } }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: gradients.hero,
          opacity: 0.12,
          animation: 'pulse 12s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18) 0, transparent 50%), radial-gradient(circle at 80% 30%, rgba(233,213,255,0.18) 0, transparent 45%), radial-gradient(circle at 50% 80%, rgba(45,212,191,0.2) 0, transparent 50%)',
          transform: 'translate3d(0,0,0)',
          animation: 'float 18s ease-in-out infinite',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={8} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Box flex={1}>
            <MotionTypography
              variant="overline"
              sx={{ color: 'secondary.main', letterSpacing: '0.2em', textTransform: 'uppercase', mb: 2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Nimit Jain · Full-stack Developer
            </MotionTypography>
            <MotionTypography
              variant="h1"
              sx={{ fontSize: { xs: '2.75rem', md: '4.5rem' }, lineHeight: 1.05, mb: 3 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('hero.intro')}
            </MotionTypography>
            <MotionTypography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 520, mb: 5 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I build products that make numbers meaningful and interfaces delightful — blending AI-first dashboards with crafted
              experiences that feel alive.
            </MotionTypography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <motion.div variants={buttonVariants} initial="initial" whileHover="hover">
                <Button size="large" variant="contained" color="primary" endIcon={<ArrowOutwardRoundedIcon />} href="#projects">
                  {t('hero.viewProjects')}
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} initial="initial" whileHover="hover">
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  endIcon={<DownloadRoundedIcon />}
                  href="/resume.pdf"
                >
                  {t('hero.downloadResume')}
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} initial="initial" whileHover="hover">
                <Button size="large" variant="text" color="inherit" endIcon={<MailRoundedIcon />} href="#contact">
                  {t('hero.contact')}
                </Button>
              </motion.div>
            </Stack>
          </Box>
          <Box flex={{ xs: 'unset', md: 0.8 }} sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: '100%',
                minHeight: 320,
                borderRadius: 6,
                background:
                  'linear-gradient(160deg, rgba(15,23,42,0.72) 0%, rgba(30,64,175,0.35) 50%, rgba(59,130,246,0.3) 100%)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                boxShadow: '0 40px 80px rgba(15, 23, 42, 0.35)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.35) 0, transparent 55%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.25) 0, transparent 50%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 32,
                  borderRadius: 4,
                  border: '1px solid rgba(226,232,240,0.12)',
                  backgroundColor: 'rgba(15,23,42,0.65)',
                  backdropFilter: 'blur(12px)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 1,
                  animation: 'dashboardPulse 8s ease-in-out infinite',
                }}
              >
                {[...Array(8)].map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      height: idx % 2 === 0 ? 56 : 96,
                      borderRadius: 2,
                      background:
                        idx % 3 === 0
                          ? 'linear-gradient(135deg, rgba(59,130,246,0.9) 0%, rgba(14,165,233,0.6) 100%)'
                          : 'rgba(148,163,184,0.18)',
                      transform: idx % 3 === 0 ? 'translateY(-6px)' : 'none',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  right: 24,
                  bottom: 24,
                  px: 3,
                  py: 2,
                  borderRadius: 4,
                  backgroundColor: 'rgba(15,23,42,0.85)',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(2,6,23,0.45)',
                }}
              >
                <Typography variant="subtitle2">AI Dashboard Architect</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Micro-interactions, realtime updates, seamless storytelling.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
      <SocialRail />
    </Box>
  );
};

export default HeroSection;
