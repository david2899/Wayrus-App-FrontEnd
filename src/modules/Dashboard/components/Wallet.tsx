import React, { useRef, useState } from 'react'
import { Tab, Tabs, TabContainer } from 'react-bootstrap';
import * as backend from "../../../contract/index.main.mjs";
import { Balance } from './Balance';
import DevApps from './DevApps';
import Deposit from './Deposit';
import { loadStdlib } from "@reach-sh/stdlib";
import { ALGO_WalletConnect as WalletConnect } from "@reach-sh/stdlib";

const reach = loadStdlib("ALGO");
reach.setWalletFallback(
    reach.walletFallback({
        providerEnv: "TestNet",
        WalletConnect,
    })
);

const Wallet = () => {

    const account = useRef<any>();
    const balance = useRef<any>();

    const [accountBal, setAccountBal] = useState(0);
    const [accountAddress, setAccountAddress] = useState("");
    const [accountCurrent, setAccountCurrent] = useState<any>(null);
    const [status, setStatus] = useState("initial");
    const [contractAddress, setContractAddress] = useState("");

    const connectWallet = async (): Promise<any> => {
        try {
            await getAccount();
            await getBalance();
        } catch (err) {
            console.log(err);
        }
    };

    const getAccount = async () => {
        try {
            account.current = await reach.getDefaultAccount();
            if (account && account.current) {
                setAccountCurrent(account.current);
                setAccountAddress((account.current as any).networkAccount.addr);
                console.log("Account :" + (account.current as any).networkAccount.addr);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getBalance = async () => {
        try {
            let rawBalance = await reach.balanceOf(account.current);
            balance.current = reach.formatCurrency(rawBalance, 4);
            setAccountBal(balance.current);
            console.log("Balance :" + balance.current);
        } catch (err) {
            console.log(err);
        }
    };

    const MakeDeposit = async (amount: number): Promise<any> => {
        try {

            const ctcCreator = accountCurrent.contract(backend, amount);
            console.log(ctcCreator)
            await backend.Bidder(ctcCreator, {
                getDeposit: () => {
                    const amount = reach.parseCurrency(1);
                    console.log('creating deposit amount ' + reach.formatCurrency(amount, 2));
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='content-tab'>
            <TabContainer>
                <Tabs defaultActiveKey="balance" >
                    <Tab eventKey="balance" title="Balance">
                        <Balance
                            connect={connectWallet}
                            balance={accountBal}
                            accountAddress={accountAddress}
                            accountCurrent={accountCurrent}
                        />
                    </Tab>
                    <Tab eventKey="send" title="Deposit">
                        <Deposit makeDeposit={MakeDeposit} />
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