'use client'

import React, { useState, useCallback } from 'react'
import { X, Phone, Mail, Users, Calendar, DollarSign, Shield } from 'lucide-react'
import { TS33LeadModalProps, TS33LeadData, TS33LeadFormErrors, TS33Tour } from '../types'
import { TS33Button, TS33Input, TS33Modal } from './primitives'
import { TS33_DESIGN_TOKENS, ts33 } from '../lib/design-tokens'

const BUDGET_RANGES = [
  { value: '10000-30000', label: '10,000 - 30,000 บาท' },
  { value: '30000-50000', label: '30,000 - 50,000 บาท' },
  { value: '50000-100000', label: '50,000 - 100,000 บาท' },
  { value: '100000-200000', label: '100,000 - 200,000 บาท' },
  { value: '200000+', label: '200,000+ บาท' }
]

const MONTHS = [
  { value: 'jan', label: 'มกราคม' },
  { value: 'feb', label: 'กุมภาพันธ์' },
  { value: 'mar', label: 'มีนาคม' },
  { value: 'apr', label: 'เมษายน' },
  { value: 'may', label: 'พฤษภาคม' },
  { value: 'jun', label: 'มิถุนายน' },
  { value: 'jul', label: 'กรกฎาคม' },
  { value: 'aug', label: 'สิงหาคม' },
  { value: 'sep', label: 'กันยายน' },
  { value: 'oct', label: 'ตุลาคม' },
  { value: 'nov', label: 'พฤศจิกายน' },
  { value: 'dec', label: 'ธันวาคม' }
]

const PARTICIPANT_OPTIONS = [
  { value: 1, label: '1 คน' },
  { value: 2, label: '2 คน' },
  { value: 3, label: '3 คน' },
  { value: 4, label: '4 คน' },
  { value: 5, label: '5 คน' },
  { value: 6, label: '6+ คน' }
]

export function TS33LeadModal({ open, tour, on_close, on_submit, loading = false }: TS33LeadModalProps) {
  const [formData, setFormData] = useState<Partial<TS33LeadData>>({
    name: '',
    phone: '',
    email: '',
    tour_id: tour?.id || '',
    preferred_months: [],
    participants: 2,
    budget_range: '',
    message: '',
    privacy_consent: false,
    source: 'search33'
  })

  const [errors, setErrors] = useState<TS33LeadFormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = useCallback((): boolean => {
    const newErrors: TS33LeadFormErrors = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ-นามสกุล'
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์'
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'กรุณากรอกอีเมลให้ถูกต้อง'
    }

    if (!formData.preferred_months?.length) {
      newErrors.preferred_months = 'กรุณาเลือกเดือนที่ต้องการเดินทาง'
    }

    if (!formData.participants || formData.participants < 1) {
      newErrors.participants = 'กรุณาเลือกจำนวนผู้เดินทาง'
    }

    if (!formData.budget_range) {
      newErrors.budget_range = 'กรุณาเลือกงบประมาณ'
    }

    if (!formData.privacy_consent) {
      newErrors.privacy_consent = 'กรุณายอมรับเงื่อนไขความเป็นส่วนตัว'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleInputChange = useCallback((field: keyof TS33LeadData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))
  }, [])

  const handleMonthToggle = useCallback((month: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_months: prev.preferred_months?.includes(month)
        ? prev.preferred_months.filter(m => m !== month)
        : [...(prev.preferred_months || []), month]
    }))
    setTouched(prev => ({ ...prev, preferred_months: true }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await on_submit(formData as TS33LeadData)
      setFormData({
        name: '',
        phone: '',
        email: '',
        tour_id: tour?.id || '',
        preferred_months: [],
        participants: 2,
        budget_range: '',
        message: '',
        privacy_consent: false,
        source: 'search33'
      })
      setTouched({})
      setErrors({})
      on_close()
    } catch (error) {
      console.error('Lead submission error:', error)
    }
  }, [formData, validateForm, on_submit, on_close, tour])

  if (!open || !tour) return null

  return (
    <TS33Modal
      open={open}
      on_close={on_close}
      size="lg"
      className="ts33-lead-modal"
    >
      <div className="ts33-lead-modal__container">
        {/* Header */}
        <div className="ts33-lead-modal__header">
          <div className="ts33-lead-modal__tour-info">
            <h2 className="ts33-lead-modal__title">สอบถามข้อมูลทัวร์</h2>
            <p className="ts33-lead-modal__tour-name">{tour.title}</p>
            <div className="ts33-lead-modal__tour-details">
              <span>{tour.duration_days} วัน {tour.nights} คืน</span>
              <span>เริ่มต้น {tour.price_from.toLocaleString()} บาท</span>
            </div>
          </div>
          <button
            onClick={on_close}
            className="ts33-lead-modal__close"
            aria-label="ปิด"
          >
            <X size={24} />
          </button>
        </div>

        {/* Trust Copy */}
        <div className="ts33-lead-modal__trust">
          <div className="ts33-lead-modal__trust-item">
            <Shield size={16} />
            <span>ข้อมูลของคุณจะถูกเก็บเป็นความลับ</span>
          </div>
          <div className="ts33-lead-modal__trust-item">
            <Phone size={16} />
            <span>ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="ts33-lead-modal__form">
          {/* Personal Information */}
          <div className="ts33-lead-modal__section">
            <h3 className="ts33-lead-modal__section-title">ข้อมูลส่วนตัว</h3>
            
            <TS33Input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={touched.name ? errors.name : undefined}
              required
            />

            <TS33Input
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={touched.phone ? errors.phone : undefined}
              required
            />

            <TS33Input
              type="email"
              placeholder="อีเมล"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={touched.email ? errors.email : undefined}
              required
            />
          </div>

          {/* Travel Preferences */}
          <div className="ts33-lead-modal__section">
            <h3 className="ts33-lead-modal__section-title">ข้อมูลการเดินทาง</h3>
            
            {/* Participants */}
            <div className="ts33-lead-modal__field">
              <label className="ts33-lead-modal__label">จำนวนผู้เดินทาง</label>
              <div className="ts33-lead-modal__participants">
                {PARTICIPANT_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('participants', option.value)}
                    className={`ts33-lead-modal__participant ${
                      formData.participants === option.value ? 'active' : ''
                    }`}
                  >
                    <Users size={16} />
                    {option.label}
                  </button>
                ))}
              </div>
              {touched.participants && errors.participants && (
                <p className="ts33-lead-modal__error">{errors.participants}</p>
              )}
            </div>

            {/* Budget Range */}
            <div className="ts33-lead-modal__field">
              <label className="ts33-lead-modal__label">งบประมาณต่อคน</label>
              <div className="ts33-lead-modal__budget">
                {BUDGET_RANGES.map(range => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => handleInputChange('budget_range', range.value)}
                    className={`ts33-lead-modal__budget-option ${
                      formData.budget_range === range.value ? 'active' : ''
                    }`}
                  >
                    <DollarSign size={16} />
                    {range.label}
                  </button>
                ))}
              </div>
              {touched.budget_range && errors.budget_range && (
                <p className="ts33-lead-modal__error">{errors.budget_range}</p>
              )}
            </div>

            {/* Preferred Months */}
            <div className="ts33-lead-modal__field">
              <label className="ts33-lead-modal__label">เดือนที่ต้องการเดินทาง</label>
              <div className="ts33-lead-modal__months">
                {MONTHS.map(month => (
                  <button
                    key={month.value}
                    type="button"
                    onClick={() => handleMonthToggle(month.value)}
                    className={`ts33-lead-modal__month ${
                      formData.preferred_months?.includes(month.value) ? 'active' : ''
                    }`}
                  >
                    <Calendar size={16} />
                    {month.label}
                  </button>
                ))}
              </div>
              {touched.preferred_months && errors.preferred_months && (
                <p className="ts33-lead-modal__error">{errors.preferred_months}</p>
              )}
            </div>

            {/* Message */}
            <div className="ts33-lead-modal__field">
              <label className="ts33-lead-modal__label">ข้อความเพิ่มเติม (ไม่บังคับ)</label>
              <textarea
                placeholder="เช่น ความต้องการพิเศษ, คำถาม, หรือข้อมูลเพิ่มเติม"
                value={formData.message || ''}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="ts33-lead-modal__textarea"
                rows={4}
              />
            </div>
          </div>

          {/* Privacy Consent */}
          <div className="ts33-lead-modal__consent">
            <label className="ts33-lead-modal__consent-label">
              <input
                type="checkbox"
                checked={formData.privacy_consent || false}
                onChange={(e) => handleInputChange('privacy_consent', e.target.checked)}
                className="ts33-lead-modal__checkbox"
              />
              <span className="ts33-lead-modal__consent-text">
                ยอมรับ<a href="#" className="ts33-lead-modal__consent-link">เงื่อนไขการใช้งาน</a>และ<a href="#" className="ts33-lead-modal__consent-link">นโยบายความเป็นส่วนตัว</a>
              </span>
            </label>
            {touched.privacy_consent && errors.privacy_consent && (
              <p className="ts33-lead-modal__error">{errors.privacy_consent}</p>
            )}
          </div>

          {/* Submit Button */}
          <TS33Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            className="ts33-lead-modal__submit"
          >
            {loading ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลให้ทีมงาน'}
          </TS33Button>
        </form>
      </div>

      <style jsx>{`
        .ts33-lead-modal__container {
          max-height: 90vh;
          overflow-y: auto;
          padding: ${ts33.space('6')};
        }

        .ts33-lead-modal__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: ${ts33.space('6')};
          padding-bottom: ${ts33.space('4')};
          border-bottom: 1px solid ${TS33_DESIGN_TOKENS.colors.border.primary};
        }

        .ts33-lead-modal__tour-info {
          flex: 1;
        }

        .ts33-lead-modal__title {
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes['2xl']};
          font-weight: ${TS33_DESIGN_TOKENS.typography.weights.bold};
          color: ${TS33_DESIGN_TOKENS.colors.text.primary};
          margin: 0 0 ${ts33.space('2')} 0;
        }

        .ts33-lead-modal__tour-name {
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.lg};
          font-weight: ${TS33_DESIGN_TOKENS.typography.weights.semibold};
          color: ${TS33_DESIGN_TOKENS.colors.primary[600]};
          margin: 0 0 ${ts33.space('2')} 0;
        }

        .ts33-lead-modal__tour-details {
          display: flex;
          gap: ${ts33.space('4')};
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.sm};
          color: ${TS33_DESIGN_TOKENS.colors.text.secondary};
        }

        .ts33-lead-modal__close {
          background: none;
          border: none;
          cursor: pointer;
          padding: ${ts33.space('2')};
          color: ${TS33_DESIGN_TOKENS.colors.text.tertiary};
          border-radius: ${ts33.radius('base')};
          transition: all ${TS33_DESIGN_TOKENS.motion.durations.fast} ${TS33_DESIGN_TOKENS.motion.easings.default};
        }

        .ts33-lead-modal__close:hover {
          background: ${TS33_DESIGN_TOKENS.colors.surface.tertiary};
          color: ${TS33_DESIGN_TOKENS.colors.text.primary};
        }

        .ts33-lead-modal__trust {
          background: ${TS33_DESIGN_TOKENS.colors.surface.secondary};
          border-radius: ${ts33.radius('base')};
          padding: ${ts33.space('4')};
          margin-bottom: ${ts33.space('6')};
        }

        .ts33-lead-modal__trust-item {
          display: flex;
          align-items: center;
          gap: ${ts33.space('2')};
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.sm};
          color: ${TS33_DESIGN_TOKENS.colors.text.secondary};
        }

        .ts33-lead-modal__trust-item:not(:last-child) {
          margin-bottom: ${ts33.space('2')};
        }

        .ts33-lead-modal__form {
          display: flex;
          flex-direction: column;
          gap: ${ts33.space('6')};
        }

        .ts33-lead-modal__section {
          display: flex;
          flex-direction: column;
          gap: ${ts33.space('4')};
        }

        .ts33-lead-modal__section-title {
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.lg};
          font-weight: ${TS33_DESIGN_TOKENS.typography.weights.semibold};
          color: ${TS33_DESIGN_TOKENS.colors.text.primary};
          margin: 0;
        }

        .ts33-lead-modal__field {
          display: flex;
          flex-direction: column;
          gap: ${ts33.space('2')};
        }

        .ts33-lead-modal__label {
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.sm};
          font-weight: ${TS33_DESIGN_TOKENS.typography.weights.medium};
          color: ${TS33_DESIGN_TOKENS.colors.text.primary};
        }

        .ts33-lead-modal__participants,
        .ts33-lead-modal__budget,
        .ts33-lead-modal__months {
          display: grid;
          gap: ${ts33.space('2')};
        }

        .ts33-lead-modal__participants {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }

        .ts33-lead-modal__budget {
          grid-template-columns: 1fr;
        }

        .ts33-lead-modal__months {
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }

        .ts33-lead-modal__participant,
        .ts33-lead-modal__budget-option,
        .ts33-lead-modal__month {
          display: flex;
          align-items: center;
          gap: ${ts33.space('2')};
          padding: ${ts33.space('3')};
          border: 1px solid ${TS33_DESIGN_TOKENS.colors.border.primary};
          border-radius: ${ts33.radius('base')};
          background: ${TS33_DESIGN_TOKENS.colors.surface.primary};
          cursor: pointer;
          transition: all ${TS33_DESIGN_TOKENS.motion.durations.fast} ${TS33_DESIGN_TOKENS.motion.easings.default};
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.sm};
          color: ${TS33_DESIGN_TOKENS.colors.text.secondary};
          text-align: left;
        }

        .ts33-lead-modal__participant:hover,
        .ts33-lead-modal__budget-option:hover,
        .ts33-lead-modal__month:hover {
          border-color: ${TS33_DESIGN_TOKENS.colors.primary[300]};
          background: ${TS33_DESIGN_TOKENS.colors.primary[50]};
        }

        .ts33-lead-modal__participant.active,
        .ts33-lead-modal__budget-option.active,
        .ts33-lead-modal__month.active {
          border-color: ${TS33_DESIGN_TOKENS.colors.primary[500]};
          background: ${TS33_DESIGN_TOKENS.colors.primary[100]};
          color: ${TS33_DESIGN_TOKENS.colors.primary[700]};
        }

        .ts33-lead-modal__textarea {
          width: 100%;
          padding: ${ts33.space('3')};
          border: 1px solid ${TS33_DESIGN_TOKENS.colors.border.primary};
          border-radius: ${ts33.radius('base')};
          font-family: ${TS33_DESIGN_TOKENS.typography.fonts.sans.join(', ')};
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.base};
          resize: vertical;
          min-height: 100px;
          transition: border-color ${TS33_DESIGN_TOKENS.motion.durations.fast} ${TS33_DESIGN_TOKENS.motion.easings.default};
        }

        .ts33-lead-modal__textarea:focus {
          outline: none;
          border-color: ${TS33_DESIGN_TOKENS.colors.border.focus};
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .ts33-lead-modal__consent {
          padding: ${ts33.space('4')};
          background: ${TS33_DESIGN_TOKENS.colors.surface.secondary};
          border-radius: ${ts33.radius('base')};
        }

        .ts33-lead-modal__consent-label {
          display: flex;
          align-items: flex-start;
          gap: ${ts33.space('3')};
          cursor: pointer;
        }

        .ts33-lead-modal__checkbox {
          margin: 0;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .ts33-lead-modal__consent-text {
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.sm};
          color: ${TS33_DESIGN_TOKENS.colors.text.secondary};
          line-height: ${TS33_DESIGN_TOKENS.typography.lineHeights.normal};
        }

        .ts33-lead-modal__consent-link {
          color: ${TS33_DESIGN_TOKENS.colors.primary[600]};
          text-decoration: underline;
        }

        .ts33-lead-modal__consent-link:hover {
          color: ${TS33_DESIGN_TOKENS.colors.primary[700]};
        }

        .ts33-lead-modal__error {
          font-size: ${TS33_DESIGN_TOKENS.typography.sizes.sm};
          color: ${TS33_DESIGN_TOKENS.colors.status.error};
          margin: 0;
        }

        .ts33-lead-modal__submit {
          width: 100%;
          margin-top: ${ts33.space('2')};
        }

        @media (max-width: ${TS33_DESIGN_TOKENS.breakpoints.md}) {
          .ts33-lead-modal__container {
            padding: ${ts33.space('4')};
            max-height: 95vh;
          }

          .ts33-lead-modal__title {
            font-size: ${TS33_DESIGN_TOKENS.typography.sizes.xl};
          }

          .ts33-lead-modal__participants {
            grid-template-columns: repeat(2, 1fr);
          }

          .ts33-lead-modal__months {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: ${TS33_DESIGN_TOKENS.breakpoints.sm}) {
          .ts33-lead-modal__participants,
          .ts33-lead-modal__months {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </TS33Modal>
  )
}