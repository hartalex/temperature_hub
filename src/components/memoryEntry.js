import React from 'react'
import { hub_api_url } from '../config.js'

export function renderRoot() {
  var style = {
    textAlign: 'center',
    fontFamily: 'Roboto'
  }

  var submit = function() {
    var obj = {
      date: document.getElementById('date').value,
      firstMemory: document.getElementById('firstMemory').value,
      secondMemory: document.getElementById('secondMemory').value
    }
    var json = JSON.stringify(obj)
    fetch(hub_api_url + '/memory/add', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'no-cors',
      body: json
    })
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        alert(JSON.stringify(data))
      })
    return true
  }

  return (
    <div className="body" style={style}>
      <form action={'#'}>
        <ul style={{ textAlign: 'right' }}>
          <li>
            {' '}
            Date(YYYY - MM - DD): <input type="text" id="date" />{' '}
          </li>{' '}
          <li>
            {' '}
            (First Memory) <input type="text" id="firstMemory" />{' '}
          </li>{' '}
          <li>
            {' '}
            Or(Second Memory) <input type="text" id="secondMemory" />{' '}
          </li>{' '}
          <li>
            {' '}
            <button onClick={submit}> Save </button>
          </li>
        </ul>{' '}
      </form>{' '}
    </div>
  )
}
