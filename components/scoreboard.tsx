'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronDown, LockKeyhole, Radio, RotateCcw, Shield, Terminal, X, Zap } from 'lucide-react'

const MISSIONS = [
  {
    id: 1,
    title: 'Protocolo de Contención',
    objective: 'Infiltrarse en la web principal de la ONI y obtener el acceso de bajo nivel.',
    riddle: 'A los robots se les prohíbe el paso en los servidores... Revisa dónde no deben mirar, y luego busca en la base que tiene 64 caras.',
    flag: 'OneFlag{ONI_PR0T0C0L_BR3ACH}',
  },
  {
    id: 2,
    title: 'Intercepción Covenant',
    objective: 'Analizar el tráfico de red interceptado por el ODST Buck para escalar privilegios.',
    riddle: 'El archivo de red fluye como un río, pero el protocolo FTP no guarda secretos. Sigue el flujo y extrae los textos legibles, ahí nadan el usuario y su clave.',
    flag: 'OneFlag{C0V3NANT_C0MMS_INT3RC3PT}',
  },
  {
    id: 3,
    title: 'El Artefacto Forerunner',
    objective: 'Extraer la información vital oculta por la Capitana Dare antes de la caída del sistema.',
    riddle: 'Una imagen vale más que mil palabras, pero esta esconde un polizón. Revisa el historial para ver qué herramienta usó, e inyecta la contraseña para romper el espejismo.',
    flag: 'OneFlag{F0R3RUNN3R_GLYPH_D3C0D3D}',
  },
  {
    id: 4,
    title: 'El Archivo de Halsey',
    objective: 'Desencriptar la investigación militar de la Dra. Halsey para obtener el acceso de la IA.',
    riddle: 'Dos cerraduras para un solo cofre. Primero rompe el candado AES con tu llave maestra, luego usa la llave que descubras para abrir la directiva pública.',
    flag: 'OneFlag{HALS3Y_R3S3ARCH_UNL0CK3D}',
  },
  {
    id: 5,
    title: 'El Índice de Activación',
    objective: 'Superar el consenso matemático Forerunner y restaurar el control de la instalación.',
    riddle: 'Las matemáticas son el idioma del universo. Averigua qué número multiplicado por sí mismo llega a 8 en el reloj del 23. Ese es tu poder oculto.',
    flag: 'OneFlag{M4ST3R_C0NTR0L_R3ST0R3D}',
  },
]

const STORAGE_OPERATIVE = 'mjolnir-operative-name'
const STORAGE_COMPLETED = 'mjolnir-completed-missions'

export function Scoreboard() {
  const [operativeName, setOperativeName] = useState('')
  const [loginInput, setLoginInput] = useState('')
  const [completedMissions, setCompletedMissions] = useState<number[]>([])
  const [expandedMission, setExpandedMission] = useState<number | null>(null)
  const [missionInputs, setMissionInputs] = useState<Record<number, string>>({})
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; title: string; detail: string } | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem(STORAGE_OPERATIVE)
      const savedCompleted = JSON.parse(window.localStorage.getItem(STORAGE_COMPLETED) || '[]')
      if (savedName) setOperativeName(savedName)
      if (Array.isArray(savedCompleted)) setCompletedMissions(savedCompleted.filter((id): id is number => Number.isInteger(id)))
    } catch {
      window.localStorage.removeItem(STORAGE_OPERATIVE)
      window.localStorage.removeItem(STORAGE_COMPLETED)
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (hydrated) {
      if (operativeName) window.localStorage.setItem(STORAGE_OPERATIVE, operativeName)
      window.localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedMissions))
    }
  }, [operativeName, completedMissions, hydrated])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 4200)
    return () => window.clearTimeout(timer)
  }, [notice])

  if (!hydrated) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = loginInput.trim()
    if (!trimmed) return
    setOperativeName(`SPARTAN ${trimmed.toUpperCase()}`)
    setLoginInput('')
  }

  const handleMissionSubmit = (missionId: number) => {
    const input = missionInputs[missionId]?.trim()
    if (!input) return

    const mission = MISSIONS.find((m) => m.id === missionId)
    if (!mission) return

    if (input === mission.flag) {
      setCompletedMissions((prev) => [...new Set([...prev, missionId])])
      setNotice({
        type: 'success',
        title: 'SISTEMA COMPROMETIDO',
        detail: `Misión ${missionId} asegurada. +200 puntos de operación.`,
      })
      setMissionInputs((prev) => ({ ...prev, [missionId]: '' }))
    } else {
      setNotice({
        type: 'error',
        title: 'CLAVE INVÁLIDA',
        detail: 'La firma no coincide con los protocolos de ONI.',
      })
      setMissionInputs((prev) => ({ ...prev, [missionId]: '' }))
    }
  }

  const score = completedMissions.length * 200
  const progress = Math.round((score / 1000) * 100)

  // Login Screen
  if (!operativeName) {
    return (
      <main className="min-h-screen flex items-center justify-center overflow-hidden bg-[#06090c] text-[#d7e5e2] selection:bg-cyan-300 selection:text-black">
        <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:linear-gradient(rgba(88,210,192,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(88,210,192,.04)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,.13),transparent_70%)]" />

        <div className="relative z-10 w-full max-w-md px-5">
          <div className="border border-[#244346] bg-[#0a1114]/90 p-8 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,.3)]">
            <div className="absolute -left-px -top-px h-4 w-4 border-l border-t border-cyan-300" />
            <div className="absolute -right-px -bottom-px h-4 w-4 border-b border-r border-cyan-300" />

            <div className="mb-8 flex justify-center">
              <div className="flex size-14 items-center justify-center border border-cyan-300/60 bg-cyan-300/10 text-cyan-200 shadow-[0_0_20px_rgba(103,232,249,.12)]">
                <Shield size={28} strokeWidth={1.5} />
              </div>
            </div>

            <div className="mb-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[.35em] text-cyan-300/70">RED DE LA INFINITY</p>
              <p className="font-mono text-[11px] uppercase tracking-[.35em] text-cyan-300/70">ACCESO RESTRINGIDO</p>
              <h1 className="mt-4 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Terminal de <span className="text-cyan-300">Sincronización</span>
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="operative-name" className="mb-3 block font-mono text-[11px] uppercase tracking-[.22em] text-[#8da9a5]">
                  &gt; ingrese su nombre operativo
                </label>
                <div className="flex items-center border border-[#27494b] bg-[#060b0e] px-4 focus-within:border-cyan-300/70 focus-within:shadow-[0_0_18px_rgba(103,232,249,.08)]">
                  <Terminal size={16} className="mr-3 shrink-0 text-cyan-300/70" />
                  <input
                    id="operative-name"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Ingrese su nombre..."
                    autoComplete="off"
                    className="w-full bg-transparent py-3 font-mono text-sm text-cyan-100 outline-none placeholder:text-[#46605d]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-300 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#061013] transition hover:bg-cyan-200 hover:shadow-[0_0_24px_rgba(103,232,249,.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                Iniciar Enlace
              </button>
            </form>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-[#526d69]">
              Conexión local segura • ONI PROTOCOL 2559
            </p>
          </div>
        </div>
      </main>
    )
  }

  // Dashboard Screen
  return (
    <main className="min-h-screen overflow-hidden bg-[#06090c] text-[#d7e5e2] selection:bg-cyan-300 selection:text-black">
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:linear-gradient(rgba(88,210,192,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(88,210,192,.04)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,.13),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:py-10">
        <header className="mb-8 flex items-start justify-between border-b border-[#193337] pb-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="mt-1 flex size-10 items-center justify-center border border-cyan-300/60 bg-cyan-300/10 text-cyan-200 shadow-[0_0_20px_rgba(103,232,249,.12)]">
              <Shield size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.35em] text-cyan-300/70">OPERATIVO: {operativeName}</p>
              <h1 className="font-mono text-lg font-bold tracking-tight text-white sm:text-2xl">Terminal de Sincronización</h1>
              <p className="font-mono text-xs tracking-[.18em] text-[#6f8b89] sm:text-sm">OPERACIÓN MJOLNIR</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#76918e] sm:flex">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /> uplink online
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div className="space-y-4">
            {MISSIONS.map((mission) => {
              const isCompleted = completedMissions.includes(mission.id)
              const isExpanded = expandedMission === mission.id
              const inputValue = missionInputs[mission.id] || ''

              return (
                <div
                  key={mission.id}
                  className={`border transition-all ${
                    isCompleted ? 'border-emerald-400/50 bg-[#0b1b18]/80' : 'border-[#1d383b] bg-[#081013]/80 hover:border-[#2a4a4d]'
                  }`}
                >
                  <button
                    onClick={() => setExpandedMission(isExpanded ? null : mission.id)}
                    disabled={isCompleted}
                    className={`w-full px-5 py-4 sm:px-7 flex items-start gap-4 transition ${
                      isCompleted ? 'cursor-default' : 'hover:bg-[#0f1517]'
                    } ${isCompleted ? 'text-emerald-200' : 'text-[#d7e5e2]'}`}
                  >
                    <div
                      className={`mt-1 flex size-6 items-center justify-center border text-xs shrink-0 ${
                        isCompleted ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300' : 'border-cyan-300/50 text-cyan-300'
                      }`}
                    >
                      {isCompleted ? <Check size={14} /> : mission.id}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{mission.title}</h3>
                      {isCompleted && <p className="font-mono text-[10px] uppercase tracking-wider mt-1 text-emerald-300">SISTEMA COMPROMETIDO</p>}
                    </div>
                    {!isCompleted && (
                      <ChevronDown size={18} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {isExpanded && !isCompleted && (
                    <div className="border-t border-[#1d383b] px-5 py-4 sm:px-7 space-y-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-cyan-300/70 mb-2">Objetivo</p>
                        <p className="font-mono text-xs leading-6 text-[#89a7a2]">{mission.objective}</p>
                      </div>

                      <div className="border-l-2 border-amber-500/60 bg-amber-500/5 px-4 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-amber-300/70 mb-2">Acertijo de la IA</p>
                        <p className="font-mono text-xs leading-6 text-amber-100/80">{mission.riddle}</p>
                      </div>

                      <div>
                        <label htmlFor={`mission-${mission.id}`} className="mb-3 block font-mono text-[11px] uppercase tracking-[.22em] text-[#8da9a5]">
                          &gt; ingrese la bandera
                        </label>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <div className="flex flex-1 items-center border border-[#27494b] bg-[#060b0e] px-4 focus-within:border-cyan-300/70 focus-within:shadow-[0_0_18px_rgba(103,232,249,.08)]">
                            <Terminal size={16} className="mr-3 shrink-0 text-cyan-300/70" />
                            <input
                              id={`mission-${mission.id}`}
                              value={inputValue}
                              onChange={(e) => setMissionInputs((prev) => ({ ...prev, [mission.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                  e.preventDefault()
                                  handleMissionSubmit(mission.id)
                                }
                              }}
                              placeholder="OneFlag{...}"
                              autoComplete="off"
                              className="w-full bg-transparent py-3 font-mono text-sm text-cyan-100 outline-none placeholder:text-[#46605d]"
                            />
                          </div>
                          <button
                            onClick={() => handleMissionSubmit(mission.id)}
                            className="bg-cyan-300 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#061013] transition hover:bg-cyan-200 hover:shadow-[0_0_24px_rgba(103,232,249,.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                          >
                            Descifrar Núcleo
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <aside className="border border-[#1d383b] bg-[#0a1114]/80 p-5 sm:p-7">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.25em] text-[#76918e]">mission status</p>
                <p className="mt-2 font-mono text-3xl font-bold text-white">
                  {score.toString().padStart(4, '0')} <span className="text-sm font-normal text-cyan-300">PTS</span>
                </p>
              </div>
              <Zap size={22} className="text-cyan-300" />
            </div>
            <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-[#78928e]">
              <span>sincronización</span>
              <span className="text-cyan-300">{progress}%</span>
            </div>
            <div className="h-2 bg-[#162326]">
              <div
                className="h-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.7)] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-8 space-y-3">
              {MISSIONS.map((mission) => {
                const complete = completedMissions.includes(mission.id)
                return (
                  <div
                    key={mission.id}
                    className={`flex items-center gap-3 border-b border-[#193337] pb-3 font-mono ${complete ? 'text-emerald-200' : 'text-[#55706d]'}`}
                  >
                    <span className={`flex size-7 items-center justify-center border text-xs ${complete ? 'border-emerald-300 bg-emerald-300/10' : 'border-[#294547]'}`}>
                      {complete ? <Check size={14} /> : <LockKeyhole size={13} />}
                    </span>
                    <span className="text-xs uppercase tracking-wider">misión 0{mission.id}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wider">{complete ? 'secured' : 'awaiting'}</span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => {
                setOperativeName('')
                setCompletedMissions([])
                setNotice({ type: 'success', title: 'SESIÓN CERRADA', detail: 'Memoria local purgada. Listo para nueva operación.' })
              }}
              className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#56706d] transition hover:text-cyan-300"
            >
              <RotateCcw size={12} /> logout
            </button>
          </aside>
        </section>

        <footer className="mt-16 flex flex-col gap-2 border-t border-[#193337] pt-5 font-mono text-[10px] uppercase tracking-widest text-[#4e6865] sm:flex-row sm:justify-between">
          <span>classified // mjolnir protocol</span>
          <span>five phases // one objective</span>
        </footer>
      </div>

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-5 top-5 z-10 flex max-w-sm gap-3 border p-4 shadow-2xl ${
            notice.type === 'success' ? 'border-emerald-400/50 bg-[#0b1b18] text-emerald-100' : 'border-red-400/50 bg-[#1d0d11] text-red-100'
          }`}
        >
          <div className="mt-0.5">{notice.type === 'success' ? <Check size={17} /> : <X size={17} />}</div>
          <div>
            <p className="font-mono text-xs font-bold tracking-widest">{notice.title}</p>
            <p className="mt-1 font-mono text-[11px] leading-5 opacity-70">{notice.detail}</p>
          </div>
          <button
            aria-label="Cerrar notificación"
            onClick={() => setNotice(null)}
            className="ml-2 self-start opacity-60 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </main>
  )
}
