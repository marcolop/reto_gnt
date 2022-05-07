import React, { useEffect, useState } from 'react'
import Select  from 'react-select';


export const Home = ({ data }) => {
  const [priceIndex, setPrices] = useState(-1)
  const [prevData, setPrevData] = useState({ ask: 0, bid: 0 })
  const [state, setState] = useState({ ask: '', bid: '' })
  const [prevIndex, setPrevIndex] = useState(null)
  const hashState = {
    "up": 'El precio subio',
    "down": 'El precio bajo',
    "": 'El precio se mantiene estable'
  }
  
  useEffect(() =>
  {
    if(priceIndex >= 0)
    {
      let { ask, bid } = data[priceIndex]?.value
      let js = {
        ask: prevData?.ask < ask ? 'up' : prevData?.ask > ask ? 'down' : '',
        bid: prevData?.bid < bid ? 'up' : prevData?.bid > bid ? 'down' : ''
      }
      setState(prev => js)
      if(prevIndex !== priceIndex)
      {
        setState(prev => ({ ask: '', bid: '' }))
      }
      setPrices(prev => {
        setPrevIndex(prev)
        return prev
      })
    }
    setPrevData(data[priceIndex]?.value)
    
  }, [data, prevIndex])
  return (
    <>
    <div className="select">
    <Select
      width= '50px'
      menuColor= 'blue'
      onChange={({ index }) => {
        setPrices(prev => {
          setPrevIndex(prev)
          return index
        })
      }}
      options={data}/>
      </div>
      <div className="grid-container">
        <div className={`grid ${state.ask}`}>
          {priceIndex >= 0 && <small>{hashState[state.ask]}</small>}
          <h2>ASK:{data[priceIndex]?.value?.ask}</h2>
        </div>
        <div className={`grid ${state.bid}`}>
          {priceIndex >= 0 && <small>{hashState[state.bid]}</small>}
          <h2>Bid:{data[priceIndex]?.value?.bid}</h2>
        </div>
      </div>
    </>
  )
}
export default Home;