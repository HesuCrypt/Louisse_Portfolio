import React, { useEffect, useState } from 'react';

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/**
 * Live Manila clock. A running second is the cheapest possible signal that a
 * real person is on the other end of the page.
 */
export const LocalTime: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(timeFormatter.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className={`tnum ${className}`}>{time} PHT</span>;
};
