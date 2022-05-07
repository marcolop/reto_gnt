import { useEffect, useState } from 'react';
import Header from './components/Header'
import './App.css'
import { Home } from './components/Home';

function App() {
  const [data, setData] = useState([])

  useEffect(()=> {
    const ws = new WebSocket("wss://wssx.gntapi.com:443");
    ws.onopen = () => ws.send('prices')
    ws.onmessage = (e) => {
      let formatedData = Object.entries(JSON.parse(e.data)?.prices).map((item, index) => {
        return {label: item[0], value: item[1], index}
      })
      setData(prev => formatedData)
    }
  }, []);
  return (
    <div>
        <Header/>
        <Home data={data}/>
    </div>
  )
}

export default App;
