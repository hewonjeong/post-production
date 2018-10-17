import React from 'react'
import { bool, string, func, node } from 'prop-types'
import style from './FileInput.module.css'

const propTypes = {
  accept: string,
  multiple: bool,
  children: node,
  onChange: func
}

const defaultProps = {
  accept: 'image',
  multiple: false,
  children: 'Add file',
  onChange: args => console.log(args)
}

const FileInput = ({ accept, multiple, children, onChange }) => (
  <label className={style.label}>
    <input
      type="file"
      accept={accept + '/*'}
      multiple={multiple}
      onChange={onChange}
      hidden
    />
    {children}
  </label>
)

FileInput.propTypes = propTypes
FileInput.defaultProps = defaultProps

export default FileInput
