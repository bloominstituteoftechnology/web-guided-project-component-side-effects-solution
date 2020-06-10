import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // TASK 4 - Create a side effect 🥇 that runs only after first render.
  useEffect(() => {
    console.log('🥇 ONLY AFTER FIRST RENDER')
    return () => console.log('🥇 COMPONENT ABOUT TO DIE')
  }, [])

  // TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.
  useEffect(() => {
    console.log('👻 ADDING SILLY LISTENER')
    const sillyClickListener = () => {
      // console.log(`Here's a random number: ${Math.random()}`)
    }
    document.addEventListener('click', sillyClickListener)
    return () => {
      console.log('👻 CLEANING UP SILLY LISTENER')
      document.removeEventListener('click', sillyClickListener)
    }
  }, [])

  // TASK 6 - Create a side effect that runs after every render.
  useEffect(() => {
    // console.log('AFTER EVERY RENDER OF Details')
  })

  // TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state
  useEffect(() => {
    console.log(`📲 fetching the friend with id ${friendId}`)
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
      .then(res => {
        setDetails(res.data)
      })
      .catch(err => {
        debugger
      })
    return () => {
      console.log(`📲 old friendId was ${friendId}. This is cleanup`)
    }
  }, [friendId])

  return (
    <div className='container'>
      <h2>Details:</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {
              details.hobbies.map((like, idx) => <li key={idx}>{like}</li>)
            }
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
