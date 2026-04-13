import Header from "../header"
import Sidebar from "../sidebar"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex m-6">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </main>
  )
}
