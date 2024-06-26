import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {
    const loggedIn = {
        firstName: "Husnain",
        lastName: "Shafique",
        email: "husnainshafique234@gmail.com"
    };
  return (
    <section className='home'>
       <div className='home-content'>
        <header className='home-header'>
            <HeaderBox 
                type='greeting'
                title='Welcome'
                user={loggedIn?.FirstName || 'Guest'}
                subtext= 'Access and Manage your Account Transactions efficiently.' 
            />
        <TotalBalanceBox 
         accounts={[]}
         totalBanks={1}
         totalCurrentBalance={1250.35}
        />
        </header>\
        Recent Transcations
       </div>
       <RightSidebar 
       user={loggedIn}
       transactions={[]}
       banks={[{currentBalance: 125}, {currentBalance: 160}]}
       />
    </section>
  )
}

export default Home
