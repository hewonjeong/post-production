import React, { Component } from 'react'
import { connect } from 'react-redux'
import { equals, clone } from 'ramda'
import { addAssets } from '../actions/assetsActions'
import FileInput from '../components/FileInput'
import Analyze from './Analyze'
import ListWrap from '../layout/ListWrap'

class ImportAssets extends Component {
  state = { assets: {}, isLoading: false }

  componentDidUpdate(prevProps, prevState) {
    const validate = asset => asset.thumbnail && asset.duration
    const { assets } = this.state
    const hasAssets = !!Object.values(assets).length
    const isUpdated = !equals(this.state, prevState)
    const isValid = Object.values(assets).every(validate)
    const isFinished = hasAssets && isUpdated && isValid
    const assetsClone = clone(assets)
    isFinished && this.clear(() => this.props.onImport(assetsClone))
  }

  clear = callback => {
    this.setState({ assets: {}, isLoading: false }, callback)
  }

  handleChange = event => {
    const reducer = (acc, file) => {
      const asset = { filename: file.name, url: getURL(file), file }
      return { ...acc, [file.name]: asset }
    }

    const assets = Array.from(event.target.files).reduce(reducer, {})
    this.setState({ assets, isLoading: true })
  }

  addMetadata = filename => metadata => {
    this.setState(({ assets }) => ({
      assets: { ...assets, [filename]: { ...assets[filename], ...metadata } }
    }))
  }

  render() {
    const { assets, isLoading } = this.state
    const entries = Object.entries(assets)

    return (
      <>
        <FileInput accept="video" multiple onChange={this.handleChange}>
          {isLoading ? 'Adding videos...' : 'Add videos'}
        </FileInput>

        {!!entries.length && (
          <ListWrap>
            {entries.map(([filename, asset]) => (
              <Analyze
                {...asset}
                onAnalyze={this.addMetadata(filename)}
                skipCollectingImages={false}
                key={filename}
              />
            ))}
          </ListWrap>
        )}
      </>
    )
  }
}

export default connect(
  null,
  dispatch => ({ onImport: assets => dispatch(addAssets(assets)) })
)(ImportAssets)

/* utils */
const getURL = blob => URL.createObjectURL(blob)
