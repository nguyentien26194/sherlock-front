import * as React from 'react';
import { useDispatch } from 'react-redux';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, IconButton, Snackbar, Switch } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { changeView } from '../../reducers/SidebarSlice';
import { UpsellModel } from '../../reducers/UpsellSlice';

import UpsellWidgetEdit from './UpsellWidgetEdit';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface Props {
  widget: UpsellModel;
  handleDeleteWidget: (widgetId: number) => void;
}

export default function UpsellWidgetItem({ widget, handleDeleteWidget }: Props) {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = await axiosPrivate.put(`/api/upsell-widgets/${widget.id}/status/update/`, {
      status: event.target.checked ? 'active' : 'inactive',
    });

    if (response.status === 200) {
      setOpen(true);
    }
  };

  const handleEditWidget = (widgetId: number) => {
    dispatch(changeView(<UpsellWidgetEdit widgetId={widgetId} />));
  };

  const handleOpenDashboard = (widgetId: number) => {
    dispatch(changeView(<UpsellWidgetEdit widgetId={widgetId} />));
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginBottom: 2,
        maxWidth: 660,
        flexGrow: 1,
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Update widget status successfully!
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={widget.detailed_product.image_url} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ height: '25px' }}>
                {widget.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {widget.detailed_product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Impressions: {widget.dashboard.impressions} - Clicks: {widget.dashboard.clicks} - CTR:{' '}
                {widget.dashboard.ctr}% - Sales: €{widget.dashboard.sales}
              </Typography>
            </Grid>
            <Grid>
              <Typography>
                <IconButton onClick={() => handleDeleteWidget(widget.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleEditWidget(widget.id)}>
                  <CreateOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDashboard(widget.id)}>
                  <AssessmentOutlinedIcon />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <Switch defaultChecked={widget.status === 'active'} onChange={handleChange} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
