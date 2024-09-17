

export async function getServerSideProps() {
  const res = await fetch(process.env.SSR_API_URL + '/ping', {
    method: 'GET',
    mode: 'cors',
  })
  console.log(res)
  const answer = await res.json()
  console.log(answer)

  return { props: {answer}}
}


export default function PingWindow({ answer }) {
  console.log('hey, what is answer exactly??')
  console.log(answer)
  return (
    <div>
      <h1>PingWindows</h1>
      <div>
        <p>Can you see go server's answer?</p>
        <p>Answer: {answer.message}</p>
      </div>
    </div>
  )
}