"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import {
  createMember,
  deleteMember,
  loadMembers,
  updateMember,
  MemberData,
} from "@/services/admin-store"
import { Search, UserPlus, Trash, Edit2, X, Check } from "lucide-react"

const memberTypes = ['Ordinary', 'Life', 'Patron'] as const

const initialFormState: Omit<MemberData, 'id' | 'joinedAt'> = {
  name: '',
  email: '',
  memberType: 'Ordinary',
  phone: '',
  address: '',
}

export function MemberManager() {
  const [members, setMembers] = useState<MemberData[]>([])
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'All' | 'Ordinary' | 'Life' | 'Patron'>('All')
  const [formValues, setFormValues] = useState(initialFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await loadMembers()
        setMembers(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase())
      const matchesType = filterType === 'All' || m.memberType === filterType
      return matchesSearch && matchesType
    })
  }, [members, search, filterType])

  const resetForm = () => {
    setFormValues(initialFormState)
    setEditingId(null)
    setIsFormOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formValues.name || !formValues.email) {
      toast({ title: 'Missing fields', description: 'Name and email are required fields.' })
      return
    }

    if (editingId) {
      const success = await updateMember({
        id: editingId,
        ...formValues,
        joinedAt: members.find((m) => m.id === editingId)?.joinedAt ?? new Date().toISOString(),
      })
      if (success) {
        const next = await loadMembers()
        setMembers(next)
        toast({ title: 'Member updated', description: 'Member details saved successfully.' })
        resetForm()
      } else {
        toast({ title: 'Update failed', description: 'Could not save member details.' })
      }
    } else {
      const created = await createMember(formValues)
      if (created) {
        const next = await loadMembers()
        setMembers(next)
        toast({ title: 'Member added', description: 'New member registered successfully.' })
        resetForm()
      } else {
        toast({ title: 'Addition failed', description: 'Check if this email is already registered.' })
      }
    }
  }

  const handleEdit = (member: MemberData) => {
    setEditingId(member.id)
    setFormValues({
      name: member.name,
      email: member.email,
      memberType: member.memberType,
      phone: member.phone || '',
      address: member.address || '',
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (memberId: string) => {
    if (!window.confirm('Remove this member permanently?')) {
      return
    }
    const success = await deleteMember(memberId)
    if (success) {
      const next = await loadMembers()
      setMembers(next)
      toast({ title: 'Member deleted', description: 'Member has been removed.' })
    } else {
      toast({ title: 'Delete failed', description: 'Could not remove member record.' })
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Members Management</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Manage community list</h2>
          <p className="mt-3 text-slate-400">Add, edit, search, and categorize members from a central table registry.</p>
        </div>
        {!isFormOpen && (
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200 flex items-center gap-2 self-start lg:self-center"
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </Button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-serif text-white">{editingId ? 'Edit Member Details' : 'Register New Member'}</h3>
            <button type="button" onClick={resetForm} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Full Name *</label>
              <Input
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                placeholder="Enter member's name"
                className="bg-slate-900/90 border-white/5"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Email Address *</label>
              <Input
                type="email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                placeholder="email@example.com"
                className="bg-slate-900/90 border-white/5"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Phone Number</label>
              <Input
                value={formValues.phone}
                onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                placeholder="Phone number"
                className="bg-slate-900/90 border-white/5"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Membership Type *</label>
              <select
                value={formValues.memberType}
                onChange={(e) => setFormValues({ ...formValues, memberType: e.target.value as typeof memberTypes[number] })}
                className="w-full rounded-md border border-slate-700 bg-slate-900/90 px-3 py-2 text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-300"
              >
                {memberTypes.map((type) => (
                  <option key={type} value={type} className="bg-slate-950 text-slate-100">
                    {type} Member
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Residential Address</label>
            <Input
              value={formValues.address}
              onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
              placeholder="Full address details"
              className="bg-slate-900/90 border-white/5"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" className="rounded-full text-slate-200 border-white/10" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200 flex items-center gap-1">
              <Check className="h-4 w-4" />
              Save Record
            </Button>
          </div>
        </form>
      )}

      {/* Filters & Search */}
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex gap-2 flex-wrap">
          {(['All', 'Ordinary', 'Life', 'Patron'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all duration-200 ${
                filterType === type
                  ? 'bg-teal-300/10 border-teal-300/40 text-teal-300'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              {type} Members
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            className="pl-10 bg-slate-950/90"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading member records...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">No member records found matching filters.</div>
        ) : (
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-6 py-4 text-left">Member Name</th>
                <th className="px-6 py-4 text-left">Email Address</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-white">{m.name}</td>
                  <td className="px-6 py-4">{m.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs uppercase tracking-wider font-semibold border ${
                      m.memberType === 'Patron'
                        ? 'bg-amber-500/15 border-amber-500/35 text-amber-300'
                        : m.memberType === 'Life'
                        ? 'bg-teal-500/15 border-teal-500/35 text-teal-300'
                        : 'bg-slate-500/15 border-slate-500/35 text-slate-300'
                    }`}>
                      {m.memberType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{m.phone || '-'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Button size="sm" variant="outline" className="rounded-full text-slate-200 border-white/10" onClick={() => handleEdit(m)}>
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="rounded-full" onClick={() => handleDelete(m.id)}>
                      <Trash className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
