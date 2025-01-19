import { useEffect, useRef, useState } from 'react';
// import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';

import CrossSell from '../components/crossSell/CrossSell';
// import { useNavigate } from "react-router";
import Dashboard from '../components/dashboard/Dashboard';
import Sidebar from '../components/ui/Sidebar';
import Upsell from '../components/upsell/Upsell';
import { CROSS_SELL_NAVIGATION, DASHBOARD_NAVIGATION, UPSELL_NAVIGATION } from '../Constants';
import { changeNavigation } from '../reducers/SidebarSlice';
import type { RootState } from '../store';

interface Props {
  navigation?: number;
}

export default function Homepage({ navigation = 0 }: Props) {
  // const [cookies] = useCookies(["onboardingDone", "shopId"]);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentNavigation = useSelector((state: RootState) => state.sidebar.currentNavigation);
  const detailView = useSelector((state: RootState) => state.sidebar.view);
  const [sidebarView, setSidebarView] = useState(<></>);
  const dataFetchedRef = useRef(false);
  const usePrevious = (value: any) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevNavigation = usePrevious(currentNavigation);

  useEffect(() => {
    if (!dataFetchedRef.current) {
      window.scrollTo(0, 0);
      dataFetchedRef.current = true;
      if (navigation !== -1) {
        dispatch(changeNavigation(navigation));
        setSidebarView(getViewByNavigation(navigation));
      }
    }
  }, []);

  useEffect(() => {
    if (dataFetchedRef.current && prevNavigation !== undefined && prevNavigation !== currentNavigation) {
      setSidebarView(getViewByNavigation(currentNavigation));
    }
  }, [currentNavigation]);

  useEffect(() => {
    if (dataFetchedRef.current && detailView !== undefined) {
      setSidebarView(detailView);
    }
  }, [detailView]);

  function getViewByNavigation(nav: number) {
    switch (nav) {
      case DASHBOARD_NAVIGATION:
        return <Dashboard />;
      case CROSS_SELL_NAVIGATION:
        return <CrossSell />;
      case UPSELL_NAVIGATION:
        return <Upsell />;
      default:
        return <Dashboard />;
    }
  }

  return <Sidebar view={sidebarView} />;
}
