import { useEffect, useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import useGlacier from './useGlacier'

export default function App() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    account,
    spaces,
    connect,
    eagerConnect,
    createNamespace,
    listNamespace
  } = useGlacier()

  useEffect(() => {
    eagerConnect()
  }, [eagerConnect])

  const onCreate = async () => {
    try {
      setLoading(true)
      const result = await createNamespace(name)
      await listNamespace()
      alert(result.insertedId)
    } catch (error) {
      console.trace(error)
    } finally {
      setLoading(false)
    }
  }

  if (!account) {
    return (
      <div className="container my-3">
        <Button onClick={connect}>Connect Wallet</Button>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="my-3">Connected: {account}</div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Namespace"
            value={name}
            onChange={e => {
              setName(e.target.value.trim())
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          disabled={loading || !name}
          onClick={onCreate}
        >
          Create Namespace
        </Button>
      </Form>
      <div className="my-3">My Namespaces:</div>
      <ListGroup>
        {spaces.map(item => (
          <ListGroup.Item key={item.namespace}>{item.namespace}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
