import React from 'react'

export function renderRoot() {
  var style = {
    textAlign: 'center',
    fontFamily: 'Roboto'
  }

  var submit = function() {
    var obj = {
      date: document.getElementById('date').value,
      firstOption: document.getElementById('firstOption').value,
      secondOption: document.getElementById('secondOption').value,
      otherStuff: document.getElementById('otherStuff').value
    }
    var json = JSON.stringify(obj)
    fetch('menu/add', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
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
            (First Option) <input type="text" id="firstOption" />{' '}
          </li>{' '}
          <li>
            {' '}
            Or(Second Option) <input type="text" id="secondOption" />{' '}
          </li>{' '}
          <li>
            {' '}
            (Other Stuff) <input type="text" id="otherStuff" />{' '}
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
