import React, { useState } from 'react';


interface PingProps {
  answer: Pong
}

interface Pong {
  message: string
}

// Get ping when the engine is in SSR mode
export async function getServerSideProps() {
  const url = process.env.SSR_API_URL + '/ping'
  console.log('Try to fetch. url: ' + url)
  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  console.log(res)
  const answer = await res.json()
  console.log(answer)

  return { props: { answer } }
}


export default function PingWindow({ answer }: PingProps) {
  // Get ping when the engine is in SPA mode
  const [text, setText] = useState('');
  const hanbleButton = async () => {
    setText('Now calling...')

    const url = process.env.NEXT_PUBLIC_SPA_API_URL + '/ping'
    console.log('Try to fetch. url: ' + url)
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
    console.log(res)
    const answer = await res.json()
    console.log(answer)

    setText(answer.message)
  }

  console.log('hey, what is answer exactly??')
  console.log(answer)
  return (
    <div>
      <h1>PingWindows</h1>
      <div>
        <p>Can you see go server's answer?</p>
        <p>SSR Answer: {answer.message}</p>
      </div>
      <div className='mt-2'>
        <div>
          <span>How about ping from client?</span>
          <button className='rounded bg-gray-800 mx-2 px-2 shadow-md' onClick={hanbleButton}>Ping</button>
        </div>
        
        
        <p>SPA Answer: {text}</p>
      </div>
    </div>
  )
}