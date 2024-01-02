import Link from 'next/link'
import PrettyNumber from '@/components/PrettyNumber'
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function NotFound() {
  return (
    <div className='sitepage sitepage--404'>
      <div className='container'>
        <h1>Página não encontrada</h1>
        <div className='graphics404'>
          <PrettyNumber number={404} cssclass='d-inline-block mr-3' />
          <span className='icon'>
            <IoIosCloseCircleOutline />
          </span>
        </div>
        <Link href='/'>Voltar ao início</Link>
      </div>
    </div>
  )
}
