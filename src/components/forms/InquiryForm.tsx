import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { formTopics, isFormTopic, type FormTopic } from '../../data/services'
import { submitInquiry } from '../../lib/forms/submit'
import { validateInquiry, type Errors } from '../../lib/forms/validate'
import { abloyModels } from '../../data/abloy'
import { company } from '../../data/company'

type Status = 'idle' | 'sending' | 'demo' | 'sent' | 'error'

const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  location: '',
  machineModel: '',
  serviceLevel: '',
  loanMachine: false,
  material: '',
  quantity: '',
  startingPoint: '',
  schedule: '',
  message: '',
}

const placeholders: Partial<Record<FormTopic, string>> = {
  abloy: 'Esim. kone ei leikkaa tasaisesti / tarvitsemme määräaikaishuollon.',
  cnc: 'Kerro osasta: käyttötarkoitus, mitat tai liitä tieto, että lähetät kuvan sähköpostilla.',
  hitsaus: 'Mitä hitsataan ja mistä materiaalista? Korjaus vai uusi rakenne?',
  kiillotus: 'Mitä kiillotetaan? Esim. vanteet, moottorin kansi, kappalemäärä.',
  teknos: 'Kuvaile vika tai huoltotarve.',
  tuvel: 'Mitä karkeuksia ja kuinka paljon tarvitset?',
}

export function InquiryForm() {
  const [params] = useSearchParams()
  const initialTopic = params.get('palvelu')
  const initialLevel = params.get('taso')
  const [topic, setTopic] = useState<FormTopic | ''>(isFormTopic(initialTopic) ? initialTopic : '')
  const [v, setV] = useState({
    ...empty,
    serviceLevel: initialLevel === 'taysihuolto' ? 'Täysihuolto' : initialLevel === 'perushuolto' ? 'Perushuolto' : '',
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const fid = (n: string) => `${uid}-${n}`

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }))
  const fields = { ...v, topic }
  const liveErrors = validateInquiry(fields)
  // Errors appear once a field has been visited (or after a submit attempt) and update live.
  const show = (k: string) => (touched[k] ? liveErrors[k] : undefined)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validateInquiry(fields)
    setTouched({ topic: true, name: true, email: true, phone: true, message: true })
    if (Object.keys(errs).length) {
      setStatus('error')
      setSubmitError('')
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('sending')
    const res = await submitInquiry({ ...v, topic: topic as FormTopic })
    if (res.ok) {
      setStatus(res.mode === 'demo' ? 'demo' : 'sent')
      requestAnimationFrame(() => resultRef.current?.focus())
    } else {
      setStatus('error')
      setSubmitError(res.error)
    }
  }

  if (status === 'demo' || status === 'sent') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[2rem] border border-white/12 bg-ink-2 p-8 outline-none sm:p-12">
        {status === 'demo' ? <Info size={34} className="text-arc" aria-hidden /> : <CheckCircle2 size={34} className="text-arc" aria-hidden />}
        <h3 className="mt-6 font-display text-[2.2rem] leading-tight text-white">
          {status === 'demo' ? 'Demoversio – viestiä ei lähetetty.' : 'Kiitos, viesti on lähetetty.'}
        </h3>
        <p className="mt-4 max-w-lg text-steel-300">
          {status === 'demo'
            ? 'Tämä on Hades Designin konseptidemo. Lomake toimii kuten valmiilla sivustolla, mutta tietoja ei lähetetty eikä tallennettu mihinkään.'
            : 'Palaamme asiaan mahdollisimman pian.'}
        </p>
        <p className="mt-6 text-steel-300">
          Tavoitat yrityksen suoraan: <a href={company.phones[0].href} className="link-weld text-white">{company.phones[0].display}</a> ·{' '}
          <a href={`mailto:${company.email}`} className="link-weld text-white">{company.email}</a>
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-9"
          onClick={() => {
            setV(empty)
            setTouched({})
            setStatus('idle')
          }}
        >
          Täytä lomake uudelleen
        </button>
      </div>
    )
  }

  const errorList = Object.entries(liveErrors as Errors).filter(([, m]) => m)

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[2rem] border border-white/12 bg-ink-2 p-6 sm:p-10" aria-describedby={fid('info')}>
      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-arc/40 bg-arc/10 p-4 text-sm text-steel-200" id={fid('info')}>
        <Info size={18} className="mt-0.5 shrink-0 text-arc" aria-hidden />
        <p>Demoversio: lomake ei lähetä viestejä eikä tallenna tietoja. Pakolliset kentät on merkitty tähdellä (*).</p>
      </div>

      {status === 'error' && (errorList.length > 0 || submitError) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 rounded-2xl border border-red-400/50 bg-red-500/10 p-5 outline-none">
          <p className="flex items-center gap-2 font-semibold text-white">
            <AlertCircle size={18} className="text-red-300" aria-hidden />
            {submitError || 'Tarkista seuraavat kohdat:'}
          </p>
          {!submitError && (
            <ul className="mt-3 list-disc space-y-1 pl-6 text-red-100">
              {errorList.map(([k, m]) => (
                <li key={k}>
                  <a href={`#${fid(k)}`} className="underline underline-offset-2" onClick={(e) => { e.preventDefault(); document.getElementById(fid(k))?.focus() }}>
                    {m}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fid('topic')} label="Mitä asia koskee?" required error={show('topic')} className="sm:col-span-2">
          <select
            id={fid('topic')}
            value={topic}
            onChange={(e) => setTopic(e.target.value as FormTopic)}
            onBlur={() => setTouched((t) => ({ ...t, topic: true }))}
            aria-invalid={!!show('topic')}
            aria-describedby={show('topic') ? `${fid('topic')}-err` : undefined}
            className={inputCls}
            required
          >
            <option value="">Valitse palvelu…</option>
            {formTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fid('name')} label="Nimi" required error={show('name')}>
          <input id={fid('name')} value={v.name} onChange={set('name')} onBlur={() => setTouched((t) => ({ ...t, name: true }))} autoComplete="name" aria-invalid={!!show('name')} aria-describedby={show('name') ? `${fid('name')}-err` : undefined} className={inputCls} required />
        </Field>
        <Field id={fid('company')} label="Yritys" hint="valinnainen">
          <input id={fid('company')} value={v.company} onChange={set('company')} autoComplete="organization" className={inputCls} />
        </Field>
        <Field id={fid('email')} label="Sähköposti" hint="sähköposti tai puhelin" error={show('email')}>
          <input id={fid('email')} type="email" inputMode="email" value={v.email} onChange={set('email')} onBlur={() => setTouched((t) => ({ ...t, email: true }))} autoComplete="email" aria-invalid={!!show('email')} aria-describedby={show('email') ? `${fid('email')}-err` : undefined} className={inputCls} />
        </Field>
        <Field id={fid('phone')} label="Puhelin" hint="sähköposti tai puhelin" error={show('phone')}>
          <input id={fid('phone')} type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} onBlur={() => setTouched((t) => ({ ...t, phone: true }))} autoComplete="tel" aria-invalid={!!show('phone')} aria-describedby={show('phone') ? `${fid('phone')}-err` : undefined} className={inputCls} />
        </Field>

        {/* Service-specific details */}
        {topic === 'abloy' && (
          <>
            <Field id={fid('model')} label="Konemalli" hint="valinnainen">
              <select id={fid('model')} value={v.machineModel} onChange={set('machineModel')} className={inputCls}>
                <option value="">En ole varma</option>
                {abloyModels.map((m) => (
                  <option key={m}>{m}</option>
                ))}
                <option>AVA</option>
              </select>
            </Field>
            <Field id={fid('level')} label="Mitä tarvitaan?" hint="valinnainen">
              <select id={fid('level')} value={v.serviceLevel} onChange={set('serviceLevel')} className={inputCls}>
                <option value="">Valitse…</option>
                <option>Perushuolto</option>
                <option>Täysihuolto</option>
                <option>Varaosia</option>
                <option>En ole varma</option>
              </select>
            </Field>
            <label className="flex min-h-[3rem] cursor-pointer items-center gap-3 text-steel-200 sm:col-span-2">
              <input type="checkbox" checked={v.loanMachine} onChange={(e) => setV((s) => ({ ...s, loanMachine: e.target.checked }))} className="h-5 w-5 accent-[#ff6229]" />
              Tarvitsemme sijaiskoneen huollon ajaksi
            </label>
          </>
        )}
        {(topic === 'cnc' || topic === 'hitsaus' || topic === 'kiillotus' || topic === 'kokoonpano') && (
          <>
            <Field id={fid('material')} label="Materiaali" hint="valinnainen">
              <input id={fid('material')} value={v.material} onChange={set('material')} list={fid('materials')} className={inputCls} />
              <datalist id={fid('materials')}>
                <option value="Alumiini" />
                <option value="Rosteri (RST)" />
                <option value="Haponkestävä (HST)" />
                <option value="Teräs" />
                <option value="Muovi" />
              </datalist>
            </Field>
            <Field id={fid('qty')} label="Kappalemäärä" hint="valinnainen">
              <input id={fid('qty')} value={v.quantity} onChange={set('quantity')} inputMode="numeric" className={inputCls} />
            </Field>
          </>
        )}
        {topic === 'cnc' && (
          <Field id={fid('start')} label="Mitä lähtötietoja on?" hint="valinnainen" className="sm:col-span-2">
            <select id={fid('start')} value={v.startingPoint} onChange={set('startingPoint')} className={inputCls}>
              <option value="">Valitse…</option>
              <option>3D-malli tai -kuva</option>
              <option>Piirustus</option>
              <option>Mallikappale</option>
              <option>Luonnos (esim. ruutupaperilla)</option>
              <option>Pelkkä idea</option>
            </select>
          </Field>
        )}
        {topic === 'teknos' && (
          <Field id={fid('loc')} label="Liike ja paikkakunta" hint="valinnainen" className="sm:col-span-2">
            <input id={fid('loc')} value={v.location} onChange={set('location')} className={inputCls} />
          </Field>
        )}

        <Field id={fid('schedule')} label="Toivottu aikataulu" hint="valinnainen" className="sm:col-span-2">
          <input id={fid('schedule')} value={v.schedule} onChange={set('schedule')} placeholder="Esim. viikolla 48 tai mahdollisimman pian" className={inputCls} />
        </Field>

        <Field id={fid('message')} label="Kuvaus" required error={show('message')} className="sm:col-span-2">
          <textarea
            id={fid('message')}
            value={v.message}
            onChange={set('message')}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            rows={5}
            placeholder={(topic && placeholders[topic]) || 'Kerro lyhyesti, mitä pitäisi tehdä.'}
            aria-invalid={!!show('message')}
            aria-describedby={show('message') ? `${fid('message')}-err` : undefined}
            className={`${inputCls} min-h-[9rem] resize-y py-4`}
            required
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <p className="max-w-sm text-xs text-steel-500">
          Tietoja käytetään vain yhteydenottoon vastaamiseen. Piirustukset ja kuvat voit lähettää sähköpostilla {company.email}.
        </p>
        <button type="submit" className="btn btn-arc" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden /> Lähetetään…
            </>
          ) : (
            'Lähetä tarjouspyyntö'
          )}
        </button>
      </div>
    </form>
  )
}

const inputCls =
  'w-full min-h-[3.25rem] rounded-2xl border border-white/15 bg-ink px-4 text-white placeholder:text-steel-600 transition-colors focus:border-arc focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arc aria-[invalid=true]:border-red-400'

function Field({
  id,
  label,
  required,
  hint,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.95rem] font-semibold text-white">
        <span>
          {label}
          {required && (
            <span className="text-arc" aria-hidden>
              {' '}
              *
            </span>
          )}
          {required && <span className="sr-only"> (pakollinen)</span>}
        </span>
        {hint && <span className="text-xs font-normal text-steel-500">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}
