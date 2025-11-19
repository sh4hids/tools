import { useState } from 'react';
import { getDate } from 'bangla-calendar';

export function BanglaDate() {
  const [date, _setDate] = useState(new Date());

  return (
    <a
      className="dark:text-brand-300 text-brand-700 bg-brand-600/20 rounded-md border border-dashed px-2 py-1"
      href="https://github.com/sh4hids/bangla-calendar"
      target="_blank"
    >
      {getDate(date, { format: 'D MMMM, YYYYb', calculationMethod: 'BD' })}
    </a>
  );
}
