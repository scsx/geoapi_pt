import Dropdown from 'react-bootstrap/Dropdown'
import HeaderDropdownItems from './HeaderDropdownItems'
import './HeaderDropdown.scss'

// This component is skipped and it's child gets context (navigatorContext)

const HeaderDropdown = () => {
  return (
    <Dropdown className='headerdrop'>
      <Dropdown.Toggle variant='link'>INFO</Dropdown.Toggle>
      <Dropdown.Menu>
        <HeaderDropdownItems />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default HeaderDropdown
