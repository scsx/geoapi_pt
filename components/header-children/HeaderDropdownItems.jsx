import { useContext, useState, useEffect } from 'react'
import { navigatorContext } from '../Header'
import './HeaderDropdown.scss'

const HeaderDropdownItems = () => {
  const [navState, setNavState] = useState([])
  const navigatorInfo = useContext(navigatorContext)

  useEffect(() => {
    const keys = navigatorInfo ? Object.keys(navigatorInfo) : []
    setNavState(keys)
  }, [])

  return (
    <ul>
      {navState.length > 0 &&
        navState.map((key) => (
          <li key={key}>{`${key}: ${navigatorInfo[key]}`}</li>
        ))}
        <li><i>Used to test context</i></li>
    </ul>
  )
}

export default HeaderDropdownItems
