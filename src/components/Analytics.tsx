import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import config from '@/config';

export default function Analytics() {
  const { pathname, search } = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!config.GA_MEASUREMENT_ID) return;
    ReactGA.initialize(config.GA_MEASUREMENT_ID);
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    ReactGA.send({ hitType: 'pageview', page: `${pathname}${search}` });
  }, [pathname, search]);

  return null;
}
