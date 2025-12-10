import { createContext, useState, useContext, useLayoutEffect } from "react";

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useLayoutEffect(() => {
    // target ukuran tablet & mobile (<= 1024px)
    const mq = window.matchMedia("(max-width: 1024px)")

    // handler: sinkronkan state dengan media query
    const handler = (e) => {
      setIsCollapsed(e.matches) //true
    }
    setIsCollapsed(mq.matches) 

    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);

    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    }
  }, [])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
