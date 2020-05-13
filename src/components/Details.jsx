import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // TASK 4 - Create a side effect that runs only after first render.
  useEffect(() => {
    console.log('FIRST render of Details')
  }, [])

  // TASK 5 - Create a side effect that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.
  useEffect(() => {
    // HEY, run this code after component mounts for first time
    const listener = e => {
      console.log(`Clicking the body at ${e.timeStamp}`)
    }
    document.addEventListener('click', listener)

    return () => {
      // HEY, before this component is unmounted, run the following:
      document.body.removeEventListener('click', listener)
    }
  }, [])

  // TASK 6 - Create a side effect that runs after every render.
  useEffect(() => {
    console.log('EVERY render of Details')
  }, [])

  // TASK 7 - Create a side effect that runs when a particular variable changes.
  useEffect(() => {
    console.log('RENDER CAUSED BY CHANGE in friendId')
  }, [friendId])

  // TASK 8 - Use an effect to fetch the details of the current friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state
  useEffect(() => {
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
      .then(res => {
        setDetails(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
    // we can put variables inside the array
    // whenever any of the variables change, the effect will re-run
    [friendId]
  )

  if (!details) {
    return null
  }

  return (
    <div className='container'>
      <h2>Details:</h2>
      <p>{details.name} is {details.age}</p>
      <p>email is {details.email}</p>
      {name} likes:
      <ul>
        {
          details.likes.map((like, idx) => <li key={idx}>{like}</li>)
        }
      </ul>
      <button onClick={close}>Close</button>
    </div>
  )
}
