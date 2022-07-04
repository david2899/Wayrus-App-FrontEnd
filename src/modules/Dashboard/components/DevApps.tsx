import React from 'react';

type Props = {
    listContracts: Array<any>,
    getContracts: () => Promise<any>,
    connectToContract: (appId: number) => Promise<any>
}

const DevApps = ({ listContracts, getContracts, connectToContract }: Props) => {
    return (
        <div>
            {
                listContracts.length > 0 ?
                <div className="d-flex justify-content-center mt-3">
                    <div >
                        
                            {
                               listContracts.filter(it => it['application-transaction']['application-id'] !== 0 && it['application-transaction']['on-completion'] !== 'delete')
                               .map((it, index) => {
                                 return (<div key={index} className='mt-2 mb-2'>
                                   <span style={{'marginRight': '40px'}}>{it['application-transaction']['application-id']}</span>
                                   <button className="btn btn-primary" onClick={() => connectToContract(it['application-transaction']['application-id'])}>
                                     connect to contract
                                   </button>
                                 </div>)
                               })
                            }
                    </div>
                    </div> :
                    <div className='d-flex justify-content-center mt-4'>
                        <button onClick={() => getContracts()} className="btn btn-primary">get Contracts</button>
                    </div>

            }

        </div>
    )
}

export default DevApps