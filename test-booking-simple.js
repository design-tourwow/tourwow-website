// Simple test to check if booking modal state works
console.log('🔥 Testing booking modal state...')

// Test React state
const React = require('react')

// Simple component to test state
function TestBookingState() {
  const [showModal, setShowModal] = React.useState(false)
  
  console.log('State:', { showModal })
  
  const handleClick = () => {
    console.log('Button clicked!')
    setShowModal(true)
    console.log('State after click:', { showModal })
  }
  
  return {
    showModal,
    handleClick
  }
}

// Test the component
const testComponent = TestBookingState()
console.log('Initial state:', testComponent)

testComponent.handleClick()
console.log('After click:', testComponent)