import type { Metadata } from 'next'
import { TS33_BASE_METADATA, generateTS33StructuredData } from './lib/seo'

export const metadata: Metadata = {
  ...TS33_BASE_METADATA,
  other: {
    'application/ld+json': JSON.stringify(generateTS33StructuredData())
  }
}