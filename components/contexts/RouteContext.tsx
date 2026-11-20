import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react"

import type { Route } from "~types"

/**
 * Context chứa route của extension
 */
export const RouteContext = createContext<{
  route: Route
  setRoute: Dispatch<SetStateAction<Route>>
} | null>(null)

export default function RouteProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>("home")

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  )
}
