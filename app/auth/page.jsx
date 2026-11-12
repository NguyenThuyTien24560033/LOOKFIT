'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Check, LockKeyhole, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedMode = params.get('mode')
    const registeredEmail = params.get('email')
    if (requestedMode === 'signup' || requestedMode === 'login') setMode(requestedMode)
    if (registeredEmail) setEmail(registeredEmail)
    if (params.get('registered') === '1') setMessage('Đăng ký thành công. Hãy đăng nhập để tiếp tục.')
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setError(''); setMessage('')
    if (mode === 'signup' && password.length < 8) { setError('Mật khẩu phải từ 8 ký tự trở lên'); return }
if (mode === 'signup' && !fullName.trim()) { setError('Vui lòng nhập Full name.'); return }
  if (mode === 'signup' && password !== confirmPassword) { setError('Mật khẩu xác nhận không khớp.'); return }
  setLoading(true)
  const existingAccount = JSON.parse(sessionStorage.getItem('lookfit_mock_auth') || 'null')
  const accountName = fullName.trim() || existingAccount?.name || ''
  sessionStorage.setItem('lookfit_mock_auth', JSON.stringify({ email, name: accountName, fullName: accountName }))
    if (mode === 'signup') localStorage.removeItem('lookfit_home_visited')
    router.push('/home')
  }

  return <main className={`${styles.page} auth-page`}><div className="auth-shell"><a className="auth-back" href="/"><ArrowLeft size={15} /> Back to LookFit</a><div className="auth-card"><div className="auth-intro"><img src="/lookfit-logo-new.png" alt="LookFit" /><span className="eyebrow">YOUR PERSONAL STYLING STUDIO</span><h1>Style that feels like <em>you.</em></h1><p>Save your edits, discover new looks, and make every outfit feel intentional.</p><div className="auth-perks"><span><Check size={13} /> Personalised outfit edits</span><span><Check size={13} /> Your looks, saved securely</span></div></div><div className="auth-form"><div className="auth-heading"><span className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'JOIN THE COMMUNITY'}</span><h2>{mode === 'login' ? 'Log in to LookFit' : 'Create your account'}</h2></div><form onSubmit={submit}>{mode === 'signup' && <label><span aria-hidden="true">✦</span> Full name<input type="text" value={fullName} onChange={event => setFullName(event.target.value)} placeholder="Your name" autoComplete="name" required /></label>}<label><Mail size={15} /> Email<input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" required /></label><label><LockKeyhole size={15} /> Password<input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Tối thiểu 8 ký tự" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required /></label>{mode === 'signup' && <label><LockKeyhole size={15} /> Confirm password<input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Repeat your password" minLength={6} autoComplete="new-password" required /></label>}<button className="primary-button auth-submit" disabled={loading}>{mode === 'login' ? 'Log in' : 'Create account'}</button></form>{error && <p className="auth-error" role="alert">{error}</p>}{message && <p className="auth-message" role="status">{message}</p>}<p className="auth-switch">{mode === 'login' ? 'New to LookFit?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMessage('') }}>{mode === 'login' ? 'Sign up' : 'Log in'}</button></p></div></div></div></main>
}
