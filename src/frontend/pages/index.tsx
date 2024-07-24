

export async function getServerSideProps() {
  const res = await fetch('http://backend:8080/ping', {
    method: 'GET',
    mode: 'cors',
  })
  console.log(res)
  const answer = await res.json()
  console.log(answer)

  return { props: {answer}}
}


export default function PingWindow({ answer }) {
  console.log(answer)
  return (
    <div>
      <h1>PingWindows</h1>
      <div>
        <p>Hi backend. Are you go server? Ping?</p>
        <p>Answer: {answer.message}</p>
      </div>
    </div>
  )
}