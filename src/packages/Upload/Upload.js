import React from 'react'
import { bool, string } from 'prop-types'
import Item from './Item'

class Upload extends React.Component {
  static propTypes = { accept: string, multiple: bool }
  static defaultProps = { accept: 'image', multiple: false }
  state = {}

  handleChange = event => {
    const { files } = event.target
    files.length && this.setState({ ...Array.from(files) })
  }

  render() {
    const List = () => (
      <section style={{ display: 'flex' }}>
        {Object.entries(this.state).map(([index, file]) => (
          <Item file={file} url={URL.createObjectURL(file)} key={index} />
        ))}
      </section>
    )

    const Input = () => (
      <input
        type="file"
        accept={this.props.accept + '/*'}
        multiple={this.props.multiple}
        onChange={this.handleChange}
      />
    )

    return (
      <>
        <Input />
        <List />
      </>
    )
  }
}

export default Upload
