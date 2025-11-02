import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const skillGroups = [
  {
    key: 'creative',
    highlights: ['UI architecture', 'Motion systems', 'Dashboard storytelling'],
  },
  {
    key: 'logical',
    highlights: ['Java + Spring Boot', 'Node & TypeScript', 'Data pipelines'],
  },
  {
    key: 'architectural',
    highlights: ['API design', 'Microservices', 'Observability & data models'],
  },
];

const SkillsSection = () => {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Typography variant="h2">{t('skills.title')}</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="stretch">
            {skillGroups.map((group) => (
              <Stack key={group.key} spacing={3} alignItems="center" textAlign="center" flex={1}>
                <Typography variant="h5">{t(`skills.${group.key}`)}</Typography>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  sx={{
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    position: 'relative',
                    background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.4), rgba(15,23,42,0.8))',
                    border: '1px solid rgba(148,163,184,0.3)',
                    boxShadow: '0 30px 60px rgba(15,23,42,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    mx: 'auto',
                    overflow: 'hidden',
                  }}
                >
                  <Stack spacing={1.2}>
                    {group.highlights.map((highlight) => (
                      <Typography key={highlight} variant="body2" sx={{ opacity: 0.9 }}>
                        {highlight}
                      </Typography>
                    ))}
                  </Stack>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -40,
                      borderRadius: '50%',
                      border: '1px dashed rgba(148,163,184,0.25)',
                      animation: 'spinSlow 18s linear infinite',
                    }}
                  />
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SkillsSection;
