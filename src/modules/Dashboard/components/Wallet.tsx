import React, { useRef, useState } from 'react'
import { Tab, Tabs, TabContainer } from 'react-bootstrap';
import * as backend from "../../../contract/build/index.main.mjs";
import { ALGO_WalletConnect as WalletConnect } from "@reach-sh/stdlib";
import * as algosdk from "algosdk"
import { Balance } from './Balance';
import DevApps from './DevApps';
import Deposit from './Deposit';
import { loadStdlib } from "@reach-sh/stdlib";
import { BigNumber } from "ethers";
import { Withdraw } from './Withdraw';
const tokenAuth = "ueOT8Mon3C64bcGXSiovX3izdLrJUGWG7LRkIiAb"
const token = {
    "X-API-Key": tokenAuth,
}
const indexerServer = "https://testnet-algorand.api.purestake.io/idx2"
const indexerClient = new algosdk.Indexer(token, indexerServer, "")
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
    const [logsContract, setLogsContracts] = useState<any>([]);
    const [contractAddress, setContractAddress] = useState("");
    const [listContracts, setListContracts] = useState([])
    const [withdraw, setWithdraw] = useState(false);
    const [contractAppId, setContractAppId] = useState(0);
    const [contractBalance, setContractBalance] = useState(0);

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

    const CreatePurse = async (): Promise<any> => {
        const stdlib = reach
        const ctcCreator = accountCurrent.contract(backend)
        setStatus("Deploying")
        backend.Creator(ctcCreator, {
            initialDeposit: () => stdlib.parseCurrency(1),
            newDeposit: (amount: BigNumber, balance: BigNumber) => {
                setLogsContracts(logsContract.concat(`new deposit amount ${stdlib.formatCurrency(
                    amount,
                    2
                )}, contract have balance ${stdlib.formatCurrency(balance, 2)}`))
                setContractBalance(Number(stdlib.formatCurrency(balance, 2)))
            },
            showOutcome: async () => {
                console.log("next show balance creator")
                getBalance()
            },
            withdraw: () => {
                return withdraw
            },
        })
        // console.log(creator)
        const ctcInfoStr = await ctcCreator.getInfo()
        console.log("info", ctcInfoStr)
        setStatus("Waiting for Attacher")
        setContractAddress(await ctcCreator.getContractAddress())
        setStatus("Contract deploy")
        connectToContract(ctcInfoStr.toNumber())
    }

    const connectToContract = async (appId: number) => {
        setContractAppId(appId)
        const ctcCreator = accountCurrent.contract(backend, reach.bigNumberify(appId))
        setContractAddress(await ctcCreator.getContractAddress())
        const contractInitialize = ctcCreator._initialize()
        const amt = await (contractInitialize).getBalance()
        setContractBalance(Number(reach.formatCurrency(amt, 2)))
        console.log(ctcCreator)
    }
    const MakeDeposit = async (appId: number, amount: number): Promise<any> => {
        try {
            const ctcCreator = accountCurrent.contract(backend, appId)
            await backend.Depositor(ctcCreator, {
                getDeposit: () => {
                    const deposit = reach.parseCurrency(amount)
                    console.log(
                        "creating deposit amount " + reach.formatCurrency(deposit, 2)
                    )
                    return deposit
                },
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getContracts = async (): Promise<any> => {
        try {
            const txn_type = "appl"
            const response = await indexerClient
                .searchForTransactions()
                .address(accountAddress)
                .txType(txn_type)
                .do()
            console.log(response.transactions)
            setListContracts(response.transactions)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='content-tab'>
            <TabContainer>
                <Tabs defaultActiveKey="balance" >
                    <Tab eventKey="balance" title="Balance">
                        <Balance
                            contractBalance={contractBalance}
                            contractAddress={contractAddress}
                            contractAppId={contractAppId}
                            createPurse={CreatePurse}
                            connect={connectWallet}
                            balance={accountBal}
                            accountAddress={accountAddress}
                            accountCurrent={accountCurrent}
                        />
                    </Tab>
                    <Tab eventKey="deposit" title="Deposit">
                        <Deposit makeDeposit={MakeDeposit} />
                    </Tab>
                    <Tab eventKey="devApps" title="DevApps">
                        <DevApps 
                        connectToContract={connectToContract}
                        getContracts={getContracts}
                        listContracts={listContracts} />
                    </Tab>
                    <Tab eventKey="Withdraw" title="Withdraw">
                        <Withdraw
                            setWithdraw={setWithdraw}
                        />
                    </Tab>
                </Tabs>
            </TabContainer>
        </div>
    )
}
export default Wallet