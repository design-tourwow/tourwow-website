import { useState, useEffect, useCallback } from 'react'

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface UseVoiceSearchProps {
  onSearchResult: (query: string) => void
  language?: string
}

export function useVoiceSearch({ onSearchResult, language = 'th-TH' }: UseVoiceSearchProps) {
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  const [voiceSearchSupported, setVoiceSearchSupported] = useState(false)
  const [voiceSearchResult, setVoiceSearchResult] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Check for speech recognition support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setVoiceSearchSupported(!!SpeechRecognition)
    }
  }, [])

  // Clear voice search result after 3 seconds
  useEffect(() => {
    if (voiceSearchResult) {
      const timer = setTimeout(() => {
        setVoiceSearchResult('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [voiceSearchResult])

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const startVoiceSearch = useCallback(() => {
    if (!voiceSearchSupported) {
      setError('เบราว์เซอร์ของคุณไม่รองรับการค้นหาด้วยเสียง')
      return
    }

    if (isVoiceSearchActive) {
      setIsVoiceSearchActive(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = language
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsVoiceSearchActive(true)
      setVoiceSearchResult('')
      setError(null)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setVoiceSearchResult(transcript)
      onSearchResult(transcript)
      setIsVoiceSearchActive(false)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsVoiceSearchActive(false)
      
      let errorMessage = 'เกิดข้อผิดพลาดในการรับรู้เสียง'
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'ไม่ได้ยินเสียงใดๆ กรุณาลองใหม่'
          break
        case 'audio-capture':
          errorMessage = 'ไม่สามารถเข้าถึงไมโครโฟนได้'
          break
        case 'not-allowed':
          errorMessage = 'กรุณาอนุญาตการใช้ไมโครโฟน'
          break
        case 'network':
          errorMessage = 'เกิดข้อผิดพลาดเครือข่าย'
          break
        default:
          errorMessage = `เกิดข้อผิดพลาด: ${event.error}`
      }
      
      setError(errorMessage)
    }

    recognition.onend = () => {
      setIsVoiceSearchActive(false)
    }

    try {
      recognition.start()
    } catch (error) {
      console.error('Failed to start speech recognition:', error)
      setIsVoiceSearchActive(false)
      setError('ไม่สามารถเริ่มการค้นหาด้วยเสียงได้')
    }
  }, [voiceSearchSupported, isVoiceSearchActive, onSearchResult, language])

  const stopVoiceSearch = useCallback(() => {
    setIsVoiceSearchActive(false)
  }, [])

  return {
    isVoiceSearchActive,
    voiceSearchSupported,
    voiceSearchResult,
    error,
    startVoiceSearch,
    stopVoiceSearch
  }
}