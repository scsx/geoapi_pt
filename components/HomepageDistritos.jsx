import React from 'react'

const HomepageDistritos = () => {
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
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
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
