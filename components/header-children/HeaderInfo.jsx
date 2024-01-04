import { useContext, useState, useEffect } from 'react'
import { navigatorContext } from '../Header'
import Dropdown from 'react-bootstrap/Dropdown'
import './HeaderInfo.scss'

const HeaderInfo = () => {
  const [navState, setNavState] = useState([])
  const navigatorInfo = useContext(navigatorContext)

  useEffect(() => {
    const keys = navigatorInfo ? Object.keys(navigatorInfo) : []
    setNavState(keys)
  }, [])

  return (
    <Dropdown className='headerdrop'>
      <Dropdown.Toggle variant='link'>INFO</Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          {navState.length > 0 &&
            navState.map((key) => (
              <li key={key}>{`${key}: ${navigatorInfo[key]}`}</li>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default HeaderInfo
