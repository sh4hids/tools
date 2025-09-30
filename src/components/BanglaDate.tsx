import { useState } from "react"
import {
  getDate,
} from 'bangla-calendar';

export function BanglaDate() {
  const [date, setDate] = useState(new Date())

  return <span>
    {getDate(date, { format: 'D MMMM, YYYYb', calculationMethod: 'BD' })}
  </span>
}
