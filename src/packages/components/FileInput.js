import React from 'react'
import { bool, string, func } from 'prop-types'
import style from './FileInput.module.css'

const propTypes = {
  accept: string,
  multiple: bool,
  onChange: func
}

const defaultProps = {
  accept: 'image',
  multiple: false,
  onChange: args => console.log(args)
}

const FileInput = ({ accept, multiple, onChange }) => {
  const handleChange = event => {
    const { files } = event.target
    files.length && onChange(Array.from(files))
  }

  return (
    <label className={style.label}>
      <input
        type="file"
        accept={accept + '/*'}
        multiple={multiple}
        onChange={handleChange}
        hidden
      />
      Add videos
    </label>
  )
}

FileInput.propTypes = propTypes
FileInput.defaultProps = defaultProps

export default FileInput
