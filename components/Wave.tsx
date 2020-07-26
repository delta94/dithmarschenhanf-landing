import React, { FC } from 'react'

const Wave: FC<Props> = ({ color }) => {
  return (
    <svg style={{ marginBottom: -8 }} version='1.1' viewBox='0 0 1440 158.28'>
      <g transform='translate(-3.3458 -221.1)'>
        <path
          fill={color}
          d='m1163.9 221.1c-32.19 0.0654-63.508 1.703-92.584 4.9707-64.986 7.3035-131.71 21.35-261 54.945-105.54 27.424-136.83 34.577-174.5 39.891-43.619 6.1529-70.435 7.9773-117 7.9629-64.928-0.0201-89.192-2.3345-213.5-20.377-110.65-16.06-153.97-22.996-193.2-30.93-28.942-5.8535-43.718-9.8122-107.05-28.689-1.4743-0.43942-1.698 12.898-1.7324 130.5h1440v-113.39l-25.83-9.3457c-26.952-9.7527-43.121-14.22-69.168-19.109-58.322-10.947-122.96-16.555-184.42-16.43z'
        />
      </g>
    </svg>
  )
}

export default Wave

interface Props {
  color: string
}
