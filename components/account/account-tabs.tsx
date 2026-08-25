'use client'

import { useEffect, useState } from 'react'
import { Settings, Package, LifeBuoy } from 'lucide-react'
import { ProfileSettingsForm } from '@/components/account/profile-settings-form'
import { OrderHistoryTable } from '@/components/account/order-history-table'
import { TicketsTab } from '@/components/account/tickets-tab'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'orders', label: 'Order History', icon: Package },
  { id: 'support', label: 'Support Tickets', icon: LifeBuoy },
] as const

type TabId = (typeof tabs)[number]['id']

function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {[0, 1].map((i) => (
        <div key={i} className="rounded-md border border-border p-5">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className="size-14 rounded-md" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-2 h-3 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AccountTabs() {
  const [active, setActive] = useState<TabId>('settings')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulates data fetch; replaced by real Supabase queries when connected
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Account sections" className="flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {loading ? (
          <OrdersSkeleton />
        ) : (
          <>
            {active === 'settings' && <ProfileSettingsForm />}
            {active === 'orders' && <OrderHistoryTable />}
            {active === 'support' && <TicketsTab />}
          </>
        )}
      </div>
    </div>
  )
}
