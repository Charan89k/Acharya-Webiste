"use client"

import { useEffect, useState, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import {
  createGalleryItem,
  deleteGalleryItem,
  loadGallery,
  reorderGalleryItem,
  AdminGalleryItem,
} from "@/services/admin-store"

const categories = ['Events', 'Community', 'Celebrations', 'Heritage']

interface GalleryManagerProps {
  onUpdate: (gallery: AdminGalleryItem[]) => void
}

export function GalleryManager({ onUpdate }: GalleryManagerProps) {
  const [gallery, setGallery] = useState<AdminGalleryItem[]>([])
  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState<'Events' | 'Community' | 'Celebrations' | 'Heritage'>('Events')
  const [imageUrl, setImageUrl] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    setGallery(loadGallery())
  }, [])

  const refreshGallery = () => {
    const items = loadGallery()
    setGallery(items)
    onUpdate(items)
  }

  const handleUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAdd = () => {
    if (!name || !imageUrl) {
      toast({ title: 'Missing fields', description: 'Provide at least a name and an image.' })
      return
    }

    createGalleryItem({ name, caption, category, imageUrl })
    refreshGallery()
    toast({ title: 'Gallery item added', description: 'It will display on the public gallery page.' })
    setName('')
    setCaption('')
    setImageUrl('')
  }

  const handleDelete = (itemId: string) => {
    if (!window.confirm('Delete this gallery image?')) {
      return
    }
    deleteGalleryItem(itemId)
    refreshGallery()
    toast({ title: 'Deleted', description: 'Gallery image removed successfully.' })
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/25">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Gallery Management</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Upload and organize images</h2>
          <p className="mt-3 text-slate-400">Manage gallery categories, captions, and sort images for the public experience.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300">Image title</label>
              <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Image name" className="mt-3 bg-slate-950/90" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Caption</label>
              <Input value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Short caption" className="mt-3 bg-slate-950/90" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as typeof category)}
                className="mt-3 w-full rounded-md border border-slate-700 bg-slate-950/90 px-3 py-2 text-slate-100"
              >
                {categories.map((option) => (
                  <option key={option} value={option} className="bg-slate-950 text-slate-100">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Image URL</label>
              <Input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Paste image URL or upload a file" className="mt-3 bg-slate-950/90" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Upload file</label>
              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`mt-3 rounded-3xl border border-dashed px-4 py-8 text-center transition-all duration-200 ${
                  dragging ? 'border-teal-300/60 bg-teal-300/5' : 'border-white/10 bg-white/5'
                }`}
              >
                <p className="text-sm text-slate-400">Drag & drop an image here, or use the button below.</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      handleUpload(file)
                    }
                  }}
                  className="mt-4 bg-slate-950/90"
                />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full rounded-full bg-teal-300 text-slate-950 hover:bg-teal-200">
              Add Gallery Image
            </Button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Upload preview</p>
          {imageUrl ? (
            <img src={imageUrl} alt="Gallery preview" className="mt-5 h-64 w-full rounded-[1.5rem] object-cover" />
          ) : (
            <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 text-slate-500">
              Preview will appear here once an image URL or file is selected.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-4">
        {gallery.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No gallery items yet. Add images above to populate the public gallery page.
          </div>
        ) : (
          <div className="space-y-4">
            {gallery.map((item, index) => (
              <div key={item.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">{item.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 text-slate-400">{item.caption || 'No caption provided'}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => {
                        reorderGalleryItem(item.id, 'up')
                        refreshGallery()
                      }}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => {
                        reorderGalleryItem(item.id, 'down')
                        refreshGallery()
                      }}
                      disabled={index === gallery.length - 1}
                    >
                      ↓
                    </Button>
                    <Button size="sm" variant="destructive" className="rounded-full" onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
