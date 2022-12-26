import { useState, useCallback, useMemo, useEffect } from 'react'
import { GlacierClient, NamespaceRecord } from '@glacier-network/client'

import useMetaMask from './useMetaMask'

export default function useGlacier() {
  const [spaces, setSpaces] = useState<NamespaceRecord[]>([])
  const { provider, account, connect, eagerConnect } = useMetaMask()

  const client = useMemo(() => {
    return new GlacierClient('http://p0.onebitdev.com/glacier-gateway', {
      provider
    })
  }, [provider])

  const listNamespace = useCallback(async () => {
    if (!account) return setSpaces([])
    const result = await client.namespaces(account)
    setSpaces(result)
  }, [client, account])

  const createNamespace = useCallback(async (name: string) => {
    const result = await client.createNamespace(name)
    return result
  }, [client])

  useEffect(() => {
    listNamespace()
  }, [listNamespace])

  return {
    client,
    spaces,
    account,
    connect,
    eagerConnect,
    listNamespace,
    createNamespace
  }
}
