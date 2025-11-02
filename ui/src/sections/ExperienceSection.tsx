import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Switch, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { CreateExperienceDto, ExperienceDto, createExperience, fetchExperiences } from '../services/experienceService';

const seeds: ExperienceDto[] = [
  {
    id: 1,
    roleTitle: 'Senior Software Developer',
    companyName: 'Incedo Inc.',
    location: 'Gurugram, India',
    startDate: '2021-01-01',
    endDate: null,
    descriptionMd:
      '- AI-powered business analytics platform with customizable dashboards\n- React performance optimisation partnering with PMs\n- Built modular data visualisation components powered by AI insights',
    orderIndex: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    roleTitle: 'Game Development Intern',
    companyName: 'All Friends Studio',
    location: 'Remote',
    startDate: '2021-06-01',
    endDate: '2021-07-01',
    descriptionMd: '- Unity 2D car game bringing playful physics to life\n- Prototype UI flows and level design experiments',
    orderIndex: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    roleTitle: 'B. Tech Engineering Physics',
    companyName: 'Delhi Technological University',
    location: 'Delhi, India',
    startDate: '2017-08-01',
    endDate: '2021-05-01',
    descriptionMd:
      '- Electronics minor in Robotics\n- Built engineering + visual projects including astrophysics HR-diagram explorations',
    orderIndex: 3,
    createdAt: new Date().toISOString(),
  },
];

const formatPeriod = (start: string, end: string | null) => {
  const startFormatted = dayjs(start).format('MMM YYYY');
  const endFormatted = end ? dayjs(end).format('MMM YYYY') : 'Present';
  return `${startFormatted} — ${endFormatted}`;
};

const ExperienceSection = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<ExperienceDto[]>(seeds);
  const [adminMode, setAdminMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateExperienceDto>({
    roleTitle: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    descriptionMd: '',
    orderIndex: seeds.length + 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExperiences()
      .then((data) => {
        setExperiences([...data].sort((a, b) => a.orderIndex - b.orderIndex));
      })
      .catch(() => {
        setExperiences(seeds);
      });
  }, []);

  const experienceList = useMemo(() => [...experiences].sort((a, b) => a.orderIndex - b.orderIndex), [experiences]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: CreateExperienceDto = {
        ...form,
        endDate: form.endDate || undefined,
        orderIndex: form.orderIndex,
      };
      const created = await createExperience(payload);
      setExperiences((prev) => [...prev, created].sort((a, b) => a.orderIndex - b.orderIndex));
      setOpen(false);
      setForm({
        roleTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        descriptionMd: '',
        orderIndex: payload.orderIndex + 1,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="experience" component="section" sx={{ py: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={3}>
            <Typography variant="h2">{t('experience.title')}</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {t('experience.adminMode')}
              </Typography>
              <Switch checked={adminMode} onChange={(_, value) => setAdminMode(value)} />
              {adminMode && (
                <Button variant="contained" onClick={() => setOpen(true)}>
                  {t('experience.add')}
                </Button>
              )}
            </Stack>
          </Stack>
          <Stack
            spacing={6}
            sx={{
              position: 'relative',
              pl: { xs: 4, md: 6 },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: { xs: 18, md: 30 },
                top: 0,
                bottom: 0,
                width: 2,
                background: 'linear-gradient(180deg, rgba(59,130,246,0.4), rgba(13,148,136,0.4))',
              },
            }}
          >
            {experienceList.map((experience) => (
              <Box key={experience.id} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: -2, md: -8 },
                    top: 12,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(14,165,233,0.9))',
                    boxShadow: '0 0 0 6px rgba(59,130,246,0.15)',
                  }}
                />
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={3}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  component={motion.div}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: { md: 180 } }}>
                    {formatPeriod(experience.startDate, experience.endDate)}
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 3, md: 4 },
                      backgroundColor: 'background.paper',
                      borderRadius: 4,
                      border: '1px solid rgba(148,163,184,0.18)',
                      boxShadow: '0 24px 40px rgba(15,23,42,0.12)',
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
                        <Box>
                          <Typography variant="h5">{experience.roleTitle}</Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            {experience.companyName} · {experience.location}
                          </Typography>
                        </Box>
                        <Chip label={formatPeriod(experience.startDate, experience.endDate)} variant="outlined" />
                      </Stack>
                      <Box component="ul" sx={{ m: 0, pl: 3 }}>
                        {experience.descriptionMd
                          .split('\n')
                          .filter(Boolean)
                          .map((line, idx) => (
                            <Typography key={idx} component="li" variant="body2" color="text.secondary">
                              {line.replace(/^[-*]\s*/, '')}
                            </Typography>
                          ))}
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{t('experience.add')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={form.roleTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, roleTitle: e.target.value }))}
            />
            <TextField
              label="Company"
              fullWidth
              value={form.companyName}
              onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
            />
            <TextField
              label="Location"
              fullWidth
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.startDate}
                onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.endDate}
                onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </Stack>
            <TextField
              label="Description (markdown)"
              fullWidth
              multiline
              minRows={4}
              value={form.descriptionMd}
              onChange={(e) => setForm((prev) => ({ ...prev, descriptionMd: e.target.value }))}
            />
            <TextField
              label="Order"
              type="number"
              fullWidth
              value={form.orderIndex}
              onChange={(e) => setForm((prev) => ({ ...prev, orderIndex: Number(e.target.value) }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExperienceSection;
