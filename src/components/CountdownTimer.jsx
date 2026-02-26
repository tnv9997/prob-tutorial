import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const INITIAL_SECONDS = 60;

const CountdownTimer = forwardRef(function CountdownTimer(_props, ref) {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);

  function tick() {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setSeconds(INITIAL_SECONDS - elapsed);
  }

  useEffect(() => {
    startTimeRef.current = Date.now();
    setSeconds(INITIAL_SECONDS);
    intervalRef.current = setInterval(tick, 250);
    return () => clearInterval(intervalRef.current);
  }, []);

  useImperativeHandle(ref, () => ({
    getElapsedMs() {
      return Date.now() - startTimeRef.current;
    },
    reset() {
      startTimeRef.current = Date.now();
      setSeconds(INITIAL_SECONDS);
    },
  }));

  const absSeconds = Math.abs(seconds);
  const minutes = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  const negative = seconds < 0;
  const display = `${negative ? '-' : ''}${minutes}:${secs.toString().padStart(2, '0')}`;

  let colorClass = 'timer-green';
  if (seconds <= 0) colorClass = 'timer-flash';
  else if (seconds <= 10) colorClass = 'timer-red';
  else if (seconds <= 30) colorClass = 'timer-yellow';

  return (
    <div className={`countdown-timer ${colorClass}`}>
      {display}
    </div>
  );
});

export default CountdownTimer;
