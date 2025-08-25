/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {MembershipDetailModel} from '../models/MembershipModel'

type Props = {
  memberships: any[]
  loading: boolean
  handleScroll: (e?: React.MouseEvent) => void
  handleMembershipSelected: (data: MembershipDetailModel | null) => void
}

const uniq = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)))
const SECTION_REQ = '__SECTION_REQUIREMENTS__'

const MembershipWidget: React.FC<Props> = ({
  memberships,
  loading,
  handleScroll,
  handleMembershipSelected,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const allFeatures = useMemo(
    () => uniq(memberships.flatMap((m: any) => (m.features ?? []) as string[])),
    [memberships]
  )
  const allRequirements = useMemo(
    () => uniq(memberships.flatMap((m: any) => (m.requirements ?? []) as string[])),
    [memberships]
  )

  const headRef = useRef<HTMLDivElement | null>(null)
  const labelRefs = useRef<HTMLDivElement[]>([])
  const [headH, setHeadH] = useState<number>(174)
  const [rowHeights, setRowHeights] = useState<number[]>([])
  const zoomRef = useRef<HTMLDivElement | null>(null)
  const boardRef = useRef<HTMLDivElement | null>(null)

  const labelRows = useMemo(
    () => [...allFeatures, SECTION_REQ, ...allRequirements],
    [allFeatures, allRequirements]
  )

  useEffect(() => {
    const measure = () => {
      if (headRef.current) setHeadH(headRef.current.offsetHeight || 174)
      const hs = labelRefs.current.map((el) => (el ? el.offsetHeight || 44 : 44))
      setRowHeights(hs)
    }
    requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [labelRows.length, memberships.length])

  useEffect(() => {
    if (!selectedId) handleMembershipSelected(null)
  }, [selectedId, handleMembershipSelected])

  useEffect(() => {
    const resize = () => {
      if (!zoomRef.current || !boardRef.current) return
      const available = zoomRef.current.clientWidth
      const natural = boardRef.current.scrollWidth
      const s = Math.min(1, available / (natural || 1))
      zoomRef.current.style.setProperty('--nb-scale', String(s))
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [memberships.length])

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{minHeight: 400}}>
        <span className='spinner-border text-primary' role='status' />
      </div>
    )
  }

  const hasItem = (m: any, label: string) =>
    (m.features ?? []).includes(label) || (m.requirements ?? []).includes(label)

  const specialValue = (m: any, label: string): string | undefined =>
    m?.values?.[label] as string | undefined

  const toggleSelect = (idx: number, m: any) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null)
      setSelectedId(null)
      handleMembershipSelected(null)
    } else {
      setSelectedIdx(idx)
      setSelectedId(m.id)
      handleMembershipSelected(m)
    }
  }

  return (
    <div className='nb-ms-shell'>
      <div className='nb-ms-header'>
        <div className='nb-ms-kicker'>NOBILIS</div>
        <h2 className='nb-ms-title'>Membership plans and benefits</h2>
        <p className='nb-ms-sub'>
          Kindly choose your membership plan and complete the payment to secure your place in the
          community. The initiation fee is a one-time contribution for lifetime access.
        </p>
      </div>

      <div className='nb-ms-card'>
        <div className='nb-zoom' ref={zoomRef}>
          <div className='nb-board' ref={boardRef}>
            {/* Columna de labels */}
            <div className='nb-labels'>
              <div ref={headRef} className='nb-labels__head'>
                <span className='nbq-option__title'>BENEFITS</span>
              </div>

              {labelRows.map((label, i) =>
                label === SECTION_REQ ? (
                  <div
                    key={`lbl-sec-${i}`}
                    ref={(el) => (labelRefs.current[i] = el!)}
                    className='nb-l-row nb-l-row--section'
                  >
                    <span className='nbq-option__title'>REQUIREMENT</span>
                  </div>
                ) : (
                  <div
                    key={`lbl-${label}`}
                    ref={(el) => (labelRefs.current[i] = el!)}
                    className='nb-l-row nb-satoshi-14-300'
                  >
                    {label}
                  </div>
                )
              )}
              <div className='nb-labels__btnrow' />
            </div>

            {/* Deck de cards */}
            <div className='nb-deck'>
              {memberships.map((m: any, idx: number) => {
                const hot = hoverIdx === idx || selectedIdx === idx
                const rowsCss =
                  `${headH}px ` +
                  rowHeights.map((h) => `${Math.max(44, h)}px`).join(' ') +
                  ` var(--nb-btn-row-h)`

                const sizeCls = m.featured ? 'nb-plan--lg' : 'nb-plan--sm'

                return (
                  <article
                    key={m.id}
                    className={`nb-plan ${sizeCls} ${hot ? 'is-hot' : ''}`}
                    style={{gridTemplateRows: rowsCss} as React.CSSProperties}
                    onMouseEnter={() => setHoverIdx(idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                    role='button'
                    tabIndex={0}
                    onClick={() => toggleSelect(idx, m)}
                  >
                    {/* Header */}
                    <div className='nb-plan__head'>
                      <div className='nb-oswald-22'>{m.title}</div>
                      <div className='nb-head__divider' />
                      <div className='nb-head__price'>
                        <div className='nb-oswald-22'>
                          {m.priceYear}/{m.interval}
                        </div>
                        <div className='nb-head__tag nb-oswald-18'>
                          {m.priceStr} {m.priceDescription}
                        </div>
                      </div>
                    </div>

                    {/* Filas */}
                    {labelRows.map((label) => {
                      if (label === SECTION_REQ) {
                        return (
                          <div key={`sec-${m.id}`} className='nb-plan__row nb-plan__row--section' />
                        )
                      }
                      const val = specialValue(m, label)
                      const on = hasItem(m, label)
                      return (
                        <div key={`${m.id}-${label}`} className='nb-plan__row'>
                          {on ? (
                            val ? (
                              <span className='nb-chip nb-satoshi-12-600'>{val}</span>
                            ) : (
                              <span className='nb-check nb-inter-24-700'>✓</span>
                            )
                          ) : (
                            <span className='nb-empty' />
                          )}
                        </div>
                      )
                    })}

                    {/* Botón */}
                    <div className='nb-plan__btnrow'>
                      <button
                        type='button'
                        className={`nb-select-btn ${hot ? 'is-active' : ''}`}
                        onMouseEnter={() => setHoverIdx(idx)}
                        onMouseLeave={() => setHoverIdx(null)}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSelect(idx, m)
                        }}
                      >
                        {/* Estado por defecto */}
                        <span className='txt-inactive nb-oswald-12'>INACTIVE</span>

                        {/* Estado en hover/seleccionado — estilos del login + SVG */}
                        <span className='txt-active'>
                          <span className='nb-heading-md'>SELECT PLAN</span>
                          <img
                            src='/media/svg/nobilis/vector1.svg'
                            alt=''
                            className='nb-btn-icon nb-btn-icon--black'
                          />
                        </span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          <div className='nb-disclaimers'>
            <p className='nb-disclaimer'>
              *The Founding Member plan will remain active for two years following the official
              launch. After that, you will transition to either the Electi or Electi+ plan, while
              retaining the lifelong benefits of being a Founding Member.
            </p>
            <p className='nb-disclaimer'>
              ** Required within 30 days of paying the Initiation Fee; non-compliance will lead to
              restricted profile functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export {MembershipWidget}
