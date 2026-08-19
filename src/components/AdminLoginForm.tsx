'use client'

import { useActionState } from 'react'
import { loginAdmin, type AdminLoginState } from '@/lib/adminActions'

const initialState: AdminLoginState = {}

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-verde-oscuro font-semibold text-sm mb-1.5">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full bg-white border-l-4 border-verde-olivo/60 focus:border-verde-oscuro rounded-lg px-4 py-3 text-tierra-oscuro shadow-sm outline-none transition-colors"
        />
      </div>
      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-verde-olivo hover:bg-verde-oscuro disabled:opacity-60 text-crema font-semibold py-3 rounded-xl transition-colors"
      >
        {isPending ? 'Verificando...' : 'Entrar'}
      </button>
    </form>
  )
}
