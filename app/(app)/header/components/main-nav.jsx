import Link from "next/link";
import { cn } from "../../../../lib/utils"

export function MainNav({ className, ...props }) {
    return (
      <nav
        className={cn("flex justify-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary hover:underline"
        >
          Dashboard
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary hover:underline"
        >
          Campaigns
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary hover:underline"
        >
          Templates
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary hover:underline"
        >
          Admin
        </Link>
      </nav>
    )
  }