"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-providers"

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <SessionProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            </ThemeProvider>
        </SessionProvider>
    )
}