import React, { createContext, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Ctx = createContext({ open: () => {} })
export const useDemoChooser = () => useContext(Ctx)

// Botões "Conheça o Sistema": levam ao contato para agendar uma apresentação
export function DemoChooserProvider({ children }) {
  const navigate = useNavigate()
  const open = useCallback(() => navigate('/contato'), [navigate])
  return <Ctx.Provider value={{ open }}>{children}</Ctx.Provider>
}
