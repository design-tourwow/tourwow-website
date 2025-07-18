'use client'

import { useState } from 'react'

export default function UltraSimpleTest() {
  const [result, setResult] = useState('')
  
  const test = async () => {
    try {
      const response = await fetch('https://online.ttnconnect.com/api/agency/get-allprogram')
      const data = await response.json()
      setResult(`Success: ${data.length} items`)
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
    }
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={test}>Test API</button>
      <div>{result}</div>
    </div>
  )
}