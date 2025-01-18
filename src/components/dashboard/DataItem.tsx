import Box from '@mui/material/Box';

interface Props {
  name: string;
  value: number;
}

export default function DataItem({ name, value }: Props) {
  return (
    <Box
      component="main"
      sx={{
        boxShadow: 2,
        backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
        flexGrow: 1,
        height: '100%',
        overflow: 'auto',
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        padding: 2,
      }}
    >
      {name} <br />
      {value} {name == 'CTR' && ' %'}
    </Box>
  );
}
