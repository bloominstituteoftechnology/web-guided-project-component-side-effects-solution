import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  useEffect(() => {
    // create an effect that runs ONLY after first render
    // and logs something to the console
    console.log("you will only see me after FIRST RENDER of Details")
  }, [])

  // 1- test this URL in Chrome first!
  // 2- http://localhost:4000/friends/1?api_key=xyz
  // 3- create an effect that gets the friends details from the API
  // 4- on happy path, shoves the details of the friend in 'details' slice of state
  useEffect(() => {
    console.log('this runs whenever friendId changes!!!!')
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

  useEffect(() => {
    // HEY, run this code after component mounts for first time
    const callback = () => console.log('clicking!!!')
    document.body.addEventListener('click', callback)

    return () => {
      // cleanup code
      // HEY, before this component is unmounted, run the following:
      document.body.removeEventListener('click', callback)
    }
  }, [])

  useEffect(() => {
    // HEY, run this code after every render
    const callback = () => console.log('YOU CLICKSED!!!!!!!!!!!!!!!')
    document.body.addEventListener('click', callback)

    return () => {
      // cleanup code
      // HEY, before running the effect above, run the following cleanup:
      document.body.removeEventListener('click', callback)
    }
  })

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
