import React from 'react'
import { Tab, Tabs, TabContainer } from 'react-bootstrap';
import  {Balance}  from './Balance';
import DevApps from './DevApps';
import  Withdraw  from './Withdraw';

 const Wallet = () => {
    return (
       <div className='content-tab'>
         <TabContainer>
                <Tabs unmountOnExit={true} defaultActiveKey="balance" >
                    <Tab eventKey="balance" title="Balance">
                        <Balance />
                    </Tab>
                    <Tab eventKey="send" title="Withdraw">
                        <Withdraw />
                    </Tab>
                    <Tab eventKey="devApps" title="DevApps">
                        <DevApps />
                    </Tab>
                </Tabs>
            </TabContainer>
       </div>
    )
}
export default Wallet