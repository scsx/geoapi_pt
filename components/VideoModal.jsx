import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Link from 'next/link'
import ReactPlayer from 'react-player/youtube'

import './VideoModal.scss'

const VideoModal = ({ youtubecode, distrito, link }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='outline-primary videomodal__btn' onClick={handleShow}>
        Ver vídeo
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className='videomodal__modal'
        size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{distrito}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtubecode}`}
            playing={true}
            muted={true}
            controls={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Link
            href={link}
            className='btn btn-primary'>
            Ver distrito
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default VideoModal
