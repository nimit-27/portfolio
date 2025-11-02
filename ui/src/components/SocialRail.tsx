import { Box, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialRail = () => (
  <Box
    sx={{
      position: 'fixed',
      left: { xs: 'auto', md: 32 },
      right: { xs: 16, md: 'auto' },
      bottom: { xs: 24, md: '30%' },
      display: 'flex',
      flexDirection: { xs: 'row', md: 'column' },
      gap: 1,
      zIndex: 10,
      backgroundColor: { xs: 'background.paper', md: 'transparent' },
      borderRadius: { xs: 999, md: 0 },
      px: { xs: 1.5, md: 0 },
      py: { xs: 1, md: 0 },
      boxShadow: { xs: '0 12px 24px rgba(15,23,42,0.14)', md: 'none' },
      border: { xs: '1px solid rgba(148, 163, 184, 0.2)', md: 'none' },
    }}
  >
    <IconButton size="large" color="inherit" href="https://github.com/nimitjain" target="_blank" rel="noreferrer">
      <GitHubIcon fontSize="inherit" />
    </IconButton>
    <IconButton size="large" color="inherit" href="https://www.linkedin.com/in/nimitjain/" target="_blank" rel="noreferrer">
      <LinkedInIcon fontSize="inherit" />
    </IconButton>
  </Box>
);

export default SocialRail;
