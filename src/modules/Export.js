import React from 'react'
import { connect } from 'react-redux'

const Export = ({ url }) =>
  url ? (
    <>
      <video src={url} style={style.video} autoPlay loop controls />
      <a href={url} download="video.webm" style={style.download}>
        Download
      </a>
    </>
  ) : (
    'Recording...'
  )

const style = {
  component: { padding: 16 },
  video: { borderRadius: 4 },
  download: { color: 'white', textDecoration: 'none', marginTop: 8 }
}

export default connect(({ record: { url } }) => ({ url }))(Export)
