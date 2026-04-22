import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 bg-white/10 border border-gray-700/15 p-1 rounded-full backdrop-blur-sm shadow-inner">
      <button
        onClick={() => setTheme("light")}
        className={`relative p-2 rounded-full transition-all duration-300 ${theme === "light"
          ? "bg-primary text-slate-900 shadow-lg"
          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
          }`}
        title="Light Mode"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`relative p-2 rounded-full transition-all duration-300 ${theme === "dark"
          ? "bg-primary text-slate-900 shadow-lg"
          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
          }`}
        title="Dark Mode"
      >
        <Moon size={18} />
      </button>
    </div>
  )
}
