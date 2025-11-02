import { useState } from 'react';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <Box id="contact" component="section" sx={{ py: { xs: 12, md: 16 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Typography variant="h2" textAlign="center">
            {t('contact.title')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              background: 'linear-gradient(160deg, rgba(15,23,42,0.85), rgba(30,64,175,0.75))',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence>
              {submitted &&
                Array.from({ length: 12 }).map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0.8, 1, 0],
                      x: Math.cos((index / 12) * Math.PI * 2) * 120,
                      y: Math.sin((index / 12) * Math.PI * 2) * 120,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: index % 2 === 0 ? '#38bdf8' : '#fbbf24',
                    }}
                  />
                ))}
            </AnimatePresence>
            <Stack spacing={3}>
              <TextField
                label={t('contact.name')}
                fullWidth
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                InputLabelProps={{ sx: { color: 'rgba(248,250,252,0.7)' } }}
                InputProps={{ sx: { color: 'white' } }}
              />
              <TextField
                label={t('contact.email')}
                type="email"
                fullWidth
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                InputLabelProps={{ sx: { color: 'rgba(248,250,252,0.7)' } }}
                InputProps={{ sx: { color: 'white' } }}
              />
              <TextField
                label={t('contact.message')}
                fullWidth
                multiline
                minRows={4}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                InputLabelProps={{ sx: { color: 'rgba(248,250,252,0.7)' } }}
                InputProps={{ sx: { color: 'white' } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                component={motion.button}
                whileTap={{ scale: 0.97 }}
              >
                {submitted ? t('contact.success') : t('contact.submit')}
              </Button>
              <Typography
                variant="body2"
                color="rgba(248,250,252,0.75)"
                textAlign="center"
                component="a"
                href="https://www.linkedin.com/in/nimitjain/"
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                {t('contact.alt')}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactSection;
