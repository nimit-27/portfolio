import { Box, Card, CardContent, Container, Divider, Stack, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const MotionCard = motion.create(Card);

const cards = [
  {
    key: 'frontend',
    description: 'Design systems, motion, and React architectures that feel alive.',
  },
  {
    key: 'backend',
    description: 'APIs, microservices, and data workflows that scale with teams.',
  },
  {
    key: 'visual',
    description: 'Dashboard storytelling with typography, color, and delight.',
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const { t } = useTranslation();

  return (
    <Box id="about" component="section" sx={{ py: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack spacing={6} ref={ref}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Typography variant="h2" sx={{ flex: 1 }}>
              {t('about.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ flex: 1.4, maxWidth: 520 }}>
              {t('about.subtitle')}
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} flexWrap="wrap">
            {cards.map((card, index) => (
              <MotionCard
                key={card.key}
                elevation={0}
                sx={{
                  flex: 1,
                  minWidth: { xs: '100%', md: 0 },
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.4) 0%, rgba(148, 163, 184, 0.18) 100%)',
                  border: '1px solid rgba(148, 163, 184, 0.24)',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {t(`about.cards.${card.key}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            ))}
          </Stack>
          <Card
            elevation={0}
            sx={{
              px: { xs: 3, md: 6 },
              py: { xs: 3, md: 4 },
              borderRadius: 6,
              backgroundColor: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(37,99,235,0.22)',
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
              <Typography variant="h6" sx={{ flex: '0 0 auto' }}>
                {t('about.whatIBelieve')}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, opacity: 0.4 }} />
              <Typography variant="body1" color="text.secondary">
                {t('about.belief')}
              </Typography>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutSection;
