import Icons from '../../assets/icons.svg'

import { iconProps } from './types/types'

export default function Icon(props: iconProps) {
  const classes = ['icon', `icon-${props.name}`]
  if (props.className) classes.push(props.className)

  // return <>.</>

  return (
    <svg className={classes.join(' ')}>
      <use xlinkHref={`${Icons}#icon-${props.name}`} />
    </svg>
  )
}
