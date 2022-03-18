
import './App.css';
import Header from './components/Header'
import CollectionCard from './components/CollectionCard';
import {useState, useEffect } from 'react'
import axios from 'axios'
import Punklist from './components/Punklist';
import Main from './components/Main';
import Loading from './components/Loading';

function App() {
  const [punkListData, setPunkListData] = useState ([])
  const [selectedPunk, setSelectedPunk] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const getMyNfts =async () => {
      setLoading(true)
      const openSeaData = await axios.get('https://testnets-api.opensea.io/assets?asset_contract_address=0x3Fd0EDfefb21750D386f19f914f71985c7afb9Ee&order_direction=asc')
    
     console.log(openSeaData.data.assets)
     setPunkListData(openSeaData.data.assets)
     setLoading(false)
    } 
    return getMyNfts()
  }, [])
  if (loading){
        return (
          <main>
            <Header />
            <Loading />
          </main>
        )
      }
  return (
   <div className='app'>
     <Header />
     
     {
       punkListData.length > 0 && (
        <>
        <Main punkListData={punkListData} selectedPunk={selectedPunk} /> 
        <Punklist punkListData={punkListData} setSelectedPunk={setSelectedPunk} />
        </>
       )

       
     }
     
   </div>
   
  );
}

export default App;
