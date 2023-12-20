import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          By{' '}
          <Image
            src='/vercel.svg'
            alt='Vercel Logo'
            className="an_image"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>

      <p>PELPFE*</p>
      <p><button type="button" className="btn btn-success">Success</button></p>
    </main>
  )
}
