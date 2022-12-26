import { useState, useEffect, useCallback } from 'react'
import { MetaMaskInpageProvider } from '@metamask/providers'

export default function useMetaMask() {
  const [account, setAccount] = useState<string>()
  const [provider, setProvider] = useState<MetaMaskInpageProvider>()

  const connect = useCallback(async () => {
    const accounts = await window.ethereum.request<string[]>({
      method: 'eth_requestAccounts',
      params: []
    })
    if (accounts) setAccount(accounts[0])
  }, [])

  const eagerConnect = useCallback(async () => {
    if (!window.ethereum) return
    const accounts = await window.ethereum?.request<string[]>({
      method: 'eth_accounts',
      params: []
    })
    if (accounts) setAccount(accounts[0])
    setProvider(window.ethereum)
  }, [])

  useEffect(() => {
    window.ethereum?.on('accountsChanged', args => {
      const accounts = args as string[]
      if (accounts) setAccount(accounts[0])
      setProvider(window.ethereum)
    })
  }, [])

  return {
    account,
    provider,
    connect,
    eagerConnect
  }
}
