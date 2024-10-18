import * as React from "react"

export default function Component() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted">
        <div className="p-4 font-semibold text-lg border-b">Accounting Basics</div>
        <div className="h-[calc(100vh-57px)]">
          <nav className="p-2">
            {[
              "Introduction to Accounting",
              "The Accounting Equation",
              "Financial Statements",
              "Double-Entry Bookkeeping",
              "Chart of Accounts",
              "Journal Entries",
              "Trial Balance",
              "Adjusting Entries",
              "Financial Statement Preparation",
              "Closing the Books",
            ].map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded-md cursor-pointer ${
                  index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Introduction to Accounting</h1>
          <p className="text-muted-foreground">
            This is where the main content of the tutorial would go. For now, it's just a placeholder.
          </p>
        </main>

        {/* Bottom Right Buttons */}
        <div className="p-4 flex justify-end gap-4">
          <button>IDK</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  )
}