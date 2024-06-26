import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const Home = () => {
    const loggedIn = {
        FirstName: "Husnain"
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
        </header>
       </div>
    </section>
  )
}

export default Home
