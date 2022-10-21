import { useEffect, useState } from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import Web3 from 'web3';

const injected = injectedModule();
// initialize Onboard
init({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://api.mycryptoapi.com/eth",
    },
    {
      id: "0xa4ec",
      token: "CELO",
      label: "Celo",
      rpcUrl: "https://forno.celo.org",
    },
    {
      id: "0xaef3",
      token: "CELO",
      label: "Alfajores",
      rpcUrl: "https://alfajores-forno.celo-testnet.org",
    },
    {
      id: "0x13881",
      rpcUrl: "https://rpc-mumbai.maticvigil.com/",
      label: "Mumbai",
      token: "MATIC",
    },
  ],
})

function App() {
  const [{ wallet }, connect] = useConnectWallet()
  const [web3, setWeb3] = useState<undefined | Web3>(undefined);
  const [account, setAccount] = useState("");

  //Connect wallet on page load
  useEffect(() => {
    if (!wallet) {
      connect();
    }
  }, [wallet, connect])

  //Create web3 instance using the wallet provider
  useEffect(() => {
    if (wallet) {
      //@ts-ignore
      setWeb3(new Web3(wallet.provider));
    }
  }, [wallet])

  //Get account id once web3 is connected
  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then(res => setAccount(res[0]))
    }
  }, [web3])

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <span style={{ fontSize: 32, textAlign: "center" }}>
        {account}
      </span>
    </div>
  )
}

export default App
