import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import config from '@/config';

export default function Analytics() {
  const { pathname, search } = useLocation();
  const initialized = useRef(false);
  const lastPage = useRef('');

  useEffect(() => {
    if (!config.GA_MEASUREMENT_ID) return;
    ReactGA.initialize(config.GA_MEASUREMENT_ID);
    initialized.current = true;
  }, []);

  useEffect(() => {
    const page = `${pathname}${search}`;
    if (!initialized.current) return;
    if (lastPage.current === page) return;
    ReactGA.send({ hitType: 'pageview', page });
    lastPage.current = page;
  }, [pathname, search]);

  return null;
}
