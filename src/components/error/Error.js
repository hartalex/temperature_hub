import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './Error.css'


const errorRender = ({error}) => {
  var className = "Error"
  if (error === null || typeof error === 'undefined') {
    className = "ErrorHidden";
    error = {title:'', description:''}
  }
  return (
    <div className={className}>
      <h3>{error.title}</h3>
      <p>{error.description}</p>
    </div>
  )
}

errorRender.propTypes = {
  error: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string})
}

const mapStateToProps = function(state, props) {
  return {
    error: state.error
  }
}

const ErrorComponent = connect(mapStateToProps)(errorRender)

export default ErrorComponent
