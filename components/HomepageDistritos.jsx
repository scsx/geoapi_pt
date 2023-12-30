'use client'

import React from 'react'
import useReadMore from '@/hooks/useReadMore'

const HomepageDistritos = () => {
  const [DistritoText] = useReadMore(
    'We create the boolean state with the useState hook. useState returns an array of two values, the first is the value of the state, the second is a function that updates the state when it is called.',
    'Read more',
    'readmore--homepage'
  )

  return (
    <div>
      <div className='container px-4 py-5' id='hanging-icons'>
        <h2 className='pb-2 border-bottom'>Distritos</h2>
        <div className='row g-4 py-5 row-cols-1 row-cols-lg-3'>
          <div className='col d-flex align-items-start'>
            <div className='icon-square bg-light text-dark flex-shrink-0 me-3'>
              <img src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/store.png' />
            </div>
            <div>
              <h2>Évora</h2>
              <DistritoText />
              <a href='#' className='btn btn-primary'>
                Primary button
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageDistritos
