import React, { useState, useEffect } from 'react'
import axios from 'axios'

const url = 'http://localhost:4000'
const api_key = 'xyz' // use in the query string 'api_key'

// props syntax
// destructuring?
// function Details({ friendId }) {
function Details(props) {
  const { friendId } = props
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
    axios.get(`${url}/friends/${friendId}?api_key=${api_key}`)
      .then(res => {
        setDetails(res.data)
      })
      .catch(err => {
        debugger
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
    <div>
      <h2>Details</h2>
      <p>{details.name} is {details.age}</p>
      <p>email is {details.email}</p>
      {name} likes:
      <ul>
        {
          details.likes.map((like, idx) => <li key={idx}>{like}</li>)
        }
      </ul>
    </div>
  )
}

export default function App() {
  const [friends, setFriends] = useState([]) // bug here if we initialize to null
  const [currentFriendId, setCurrentFriendId] = useState(null)

  useEffect(() => {
    // we put our arbitrary code
    // we will fetch with axios
    // and set our friends in state (happy path)
    axios.get(`${url}/friends?api_key=${api_key}`)
      .then(res => {
        setFriends(res.data) // it's an array of friends
      })
      .catch(err => {
        debugger
      })
  }, []) // arg 1- callback, arg 2- []

  return (
    <div>
      <h1>My friends:</h1>
      {
        friends.map(friend => { // crash here if we initialize friends to null
          return (
            <div key={friend.id}>
              {friend.name} <button onClick={() => {
                return setCurrentFriendId(friend.id)
              }}>see details</button>
            </div>
          )
        })
      }
      {
        // currentFriendId ? <Details /> : null
        currentFriendId && <Details friendId={currentFriendId} />
      }
    </div>
  )
}
