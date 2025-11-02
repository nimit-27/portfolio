import { Fab, Tooltip } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useAppTheme } from '../theme/ThemeContext';

const ThemeFab = () => {
  const { rotateTheme } = useAppTheme();

  return (
    <Tooltip title="Switch theme mood">
      <Fab
        color="primary"
        onClick={rotateTheme}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: '0 24px 50px rgba(15,23,42,0.35)',
        }}
      >
        <AutoAwesomeRoundedIcon />
      </Fab>
    </Tooltip>
  );
};

export default ThemeFab;
