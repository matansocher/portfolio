import './styles/EasterEgg.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import config from '../config';

const SECRET = 'gili';
const VISIBLE_DURATION_MS = 3000;
const IMAGE_URL = `${config.STORAGE_BASE_URL}/new/shared/gili.png`;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export default function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const bufferRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setIsVisible(false);
  }, [clearTimer]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (event.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + event.key.toLowerCase()).slice(-SECRET.length);
      if (bufferRef.current === SECRET) {
        bufferRef.current = '';
        setIsVisible(true);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;
    timeoutRef.current = setTimeout(() => setIsVisible(false), VISIBLE_DURATION_MS);
    return clearTimer;
  }, [isVisible, clearTimer]);

  if (!isVisible) return null;

  return (
    <div
      className="easter-egg-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="easter-egg" role="dialog" aria-modal="true" aria-label="A special surprise">
        <button type="button" className="easter-egg-close" onClick={close} aria-label="Close">
          <i className="uil uil-times" aria-hidden="true" />
        </button>
        <img className="easter-egg-image" src={IMAGE_URL} alt="A special surprise" />
      </div>
    </div>
  );
}
