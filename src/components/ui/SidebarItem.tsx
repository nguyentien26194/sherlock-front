import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';

// import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import { RootState } from "../../store";
import {
  CROSS_SELL_ITEM,
  CROSS_SELL_NAVIGATION,
  DASHBOARD_ITEM,
  DASHBOARD_NAVIGATION,
  UPSELL_ITEM,
  UPSELL_NAVIGATION,
} from '../../Constants';
import { changeNavigation } from '../../reducers/SidebarSlice';
import { RootState } from '../../store';

interface Props {
  id: number;
}

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

export default function SidebarItem({ id }: Props) {
  // const currentNavigation = useSelector(
  //   (state: RootState) => state.sidebar.currentNavigation
  // );
  const dispatch = useDispatch();
  // const axiosPrivate = useAxiosPrivate();
  const currentNavigation = useSelector((state: RootState) => state.sidebar.currentNavigation);

  function getSidebarItem() {
    switch (id) {
      case DASHBOARD_NAVIGATION:
        return (
          <Link
            to={DASHBOARD_ITEM.href}
            style={{
              textDecoration: 'none',
              fontFamily: 'Roboto Helvetica Arial ans-serif',
              fontWeight: '400',
              fontSize: '1rem',
              lineHeight: '1.5',
              color: 'rgba(0, 0, 0, 0.84)',
            }}
          >
            <ListItemButton
              sx={{
                backgroundColor: currentNavigation == DASHBOARD_NAVIGATION ? '#a1ccf6' : '',
                ':hover': {
                  backgroundColor: '#c5d9ec',
                },
              }}
              key={DASHBOARD_ITEM.id}
              onClick={() => dispatch(changeNavigation(id))}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={DASHBOARD_ITEM.name} />
            </ListItemButton>
          </Link>
        );
      case CROSS_SELL_NAVIGATION:
        return (
          <Link
            to={CROSS_SELL_ITEM.href}
            style={{
              textDecoration: 'none',
              fontFamily: 'Roboto Helvetica Arial ans-serif',
              fontWeight: '400',
              fontSize: '1rem',
              lineHeight: '1.5',
              color: 'rgba(0, 0, 0, 0.84)',
            }}
          >
            <ListItemButton
              sx={{
                backgroundColor: currentNavigation == CROSS_SELL_NAVIGATION ? '#a1ccf6' : '',
                ':hover': {
                  backgroundColor: '#c5d9ec',
                },
              }}
              key={CROSS_SELL_ITEM.id}
              onClick={() => dispatch(changeNavigation(id))}
            >
              <ListItemIcon>
                <MultipleStopIcon />
              </ListItemIcon>
              <ListItemText primary={CROSS_SELL_ITEM.name} />
            </ListItemButton>
          </Link>
        );
      case UPSELL_NAVIGATION:
        return (
          <Link
            to={UPSELL_ITEM.href}
            style={{
              textDecoration: 'none',
              fontFamily: 'Roboto Helvetica Arial ans-serif',
              fontWeight: '400',
              fontSize: '1rem',
              lineHeight: '1.5',
              color: 'rgba(0, 0, 0, 0.84)',
            }}
          >
            <ListItemButton
              sx={{
                backgroundColor: currentNavigation == UPSELL_NAVIGATION ? '#a1ccf6' : '',
                ':hover': {
                  backgroundColor: '#c5d9ec',
                },
              }}
              key={UPSELL_ITEM.id}
              onClick={() => dispatch(changeNavigation(id))}
            >
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary={UPSELL_ITEM.name} />
            </ListItemButton>
          </Link>
        );
      default:
        return <></>;
    }
  }

  return getSidebarItem();
}
