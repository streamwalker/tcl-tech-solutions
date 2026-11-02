import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const root = document.getElementById("root")
    const onChange = () => {
      setIsMobile(Math.min(window.innerWidth, root?.clientWidth || window.innerWidth) < MOBILE_BREAKPOINT)
    }
    const observer = new ResizeObserver(onChange)
    if (root) observer.observe(root)
    window.addEventListener("resize", onChange)
    window.addEventListener("tcl:viewportchange", onChange)
    onChange()
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", onChange)
      window.removeEventListener("tcl:viewportchange", onChange)
    }
  }, [])

  return !!isMobile
}
