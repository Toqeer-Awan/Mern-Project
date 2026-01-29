import React from 'react'
import Cards from '../components/Cards'
import Filestable from '../components/Filestable'
import { chartData } from '../assets/Chartsdata'

const Dashboard = () => {
  return (
    <div>
       <Cards cardsData={chartData} />
       <Filestable/>
    </div>
  )
}

export default Dashboard