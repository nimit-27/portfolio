import { Box, Chip, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type ProjectCategory = 'dashboards' | 'backend' | 'fun';

type Project = {
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  problem: string;
  tech: string[];
  depth: string;
  accent: string;
};

const projects: Project[] = [
  {
    title: 'Customizable Dashboard Platform',
    subtitle: 'Incedo · AI insights builder',
    categories: ['dashboards'],
    problem: 'Analysts needed a flexible workspace to compose AI insights without developer bottlenecks.',
    tech: ['React', 'TypeScript', 'Recharts', 'Node', 'GraphQL'],
    depth: 'Modular widget engine, state sync via WebSockets, per-user themes.',
    accent: 'linear-gradient(135deg, rgba(59,130,246,0.75), rgba(14,165,233,0.75))',
  },
  {
    title: 'Optimal Meeting Point Finder',
    subtitle: 'Geo intelligence prototype',
    categories: ['dashboards', 'fun'],
    problem: 'Distributed teams struggled to pick venues equidistant from all attendees.',
    tech: ['Java', 'Spring Boot', 'React', 'OpenRouteService'],
    depth: 'Geospatial clustering, travel-time heatmaps, caching for sub-second recomputes.',
    accent: 'linear-gradient(135deg, rgba(56,189,248,0.75), rgba(59,130,246,0.75))',
  },
  {
    title: 'Real-time Chat App',
    subtitle: 'Realtime collaboration surface',
    categories: ['backend', 'fun'],
    problem: 'Needed a playful chat with message reactions and delivery guarantees for hackathons.',
    tech: ['Node.js', 'React', 'MQTT', 'Redis'],
    depth: 'Topic partitioning, optimistic UI, MQTT QoS tuning for reliability.',
    accent: 'linear-gradient(135deg, rgba(168,85,247,0.8), rgba(59,130,246,0.7))',
  },
  {
    title: 'E-commerce backend',
    subtitle: 'Composable commerce APIs',
    categories: ['backend'],
    problem: 'Retail startup required resilient order + inventory services with observability baked in.',
    tech: ['Node.js', 'TypeScript', 'MongoDB', 'Kafka'],
    depth: 'Event sourcing, saga orchestration, and structured logging with OpenTelemetry.',
    accent: 'linear-gradient(135deg, rgba(251,191,36,0.8), rgba(59,130,246,0.7))',
  },
];

const tabs: { labelKey: string; value: 'all' | ProjectCategory }[] = [
  { labelKey: 'filters.all', value: 'all' },
  { labelKey: 'filters.dashboards', value: 'dashboards' },
  { labelKey: 'filters.backend', value: 'backend' },
  { labelKey: 'filters.fun', value: 'fun' },
];

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((project) => project.categories.includes(filter));
  }, [filter]);

  return (
    <Box id="projects" component="section" sx={{ py: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start', mb: 6 }}>
          <Typography variant="h2" sx={{ flex: 1 }}>
            {t('projects.title')}
          </Typography>
          <Tabs
            value={filter}
            onChange={(_, value) => setFilter(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={t(`projects.${tab.labelKey}`)} />
            ))}
          </Tabs>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
          }}
        >
          {filteredProjects.map((project, index) => (
            <Box
              key={project.title}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 * index }}
              sx={{
                perspective: 1200,
                '&:hover .card': {
                  transform: 'rotateY(180deg)',
                },
              }}
            >
              <Box
                className="card"
                sx={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                  minHeight: 320,
                  borderRadius: 5,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 5,
                    background: project.accent,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 4,
                    boxShadow: '0 30px 60px rgba(15, 23, 42, 0.35)',
                  }}
                >
                  <Box>
                    <Typography variant="overline" sx={{ opacity: 0.8 }}>
                      {project.subtitle}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {project.title}
                    </Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {project.tech.map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ color: '#0F172A', backgroundColor: 'rgba(248,250,252,0.85)' }} />
                    ))}
                  </Stack>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 5,
                    background: 'rgba(15,23,42,0.96)',
                    color: '#F8FAFC',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 4,
                    border: '1px solid rgba(148, 163, 184, 0.24)',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
                      {t('projects.problem')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {project.problem}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
                      {t('projects.techUsed')}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                      {project.tech.map((tech) => (
                        <Chip key={tech} label={tech} size="small" color="primary" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
                      {t('projects.depth')}
                    </Typography>
                    <Typography variant="body2">{project.depth}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
