import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Gallery } from "@/lib/models/Gallery"

export async function GET() {
  let dbConnected = false
  let galleryItems = []

  try {
    await connectToDatabase()
    dbConnected = true
    
    // Query MongoDB first
    galleryItems = await Gallery.find({}).sort({ order: 1, addedAt: -1 })
    
    if (galleryItems.length > 0) {
      return NextResponse.json(
        galleryItems.map((item) => ({
          id: item._id.toString(),
          name: item.name,
          caption: item.caption,
          category: item.category,
          imageUrl: item.imageUrl,
          addedAt: item.addedAt,
          order: item.order,
        }))
      )
    }
  } catch (dbError) {
    console.error("Database connection or query failed in Gallery API:", dbError)
  }

  // Fallback: Check if Drive details are set and import
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!apiKey || !folderId) {
    return NextResponse.json([])
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`
    const response = await fetch(url)
    
    if (!response.ok) {
      const text = await response.text()
      console.error("Google Drive API response error:", text)
      return NextResponse.json([])
    }

    const data = await response.json()
    const images = (data.files || [])
      .filter((file: any) => file.mimeType && file.mimeType.startsWith("image/"))
      .map((file: any, index: number) => ({
        name: file.name,
        caption: file.name,
        category: "Community",
        imageUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        order: index,
      }))

    if (images.length > 0) {
      if (dbConnected) {
        try {
          await Gallery.insertMany(images)
          galleryItems = await Gallery.find({}).sort({ order: 1, addedAt: -1 })
          return NextResponse.json(
            galleryItems.map((item) => ({
              id: item._id.toString(),
              name: item.name,
              caption: item.caption,
              category: item.category,
              imageUrl: item.imageUrl,
              addedAt: item.addedAt,
              order: item.order,
            }))
          )
        } catch (dbWriteError) {
          console.error("Failed to insert/find Google Drive images in database:", dbWriteError)
        }
      }

      // If database is not connected or writing failed, return images from Drive directly
      return NextResponse.json(
        images.map((img, index) => ({
          id: `drive-${index}-${img.name}`,
          name: img.name,
          caption: img.caption,
          category: img.category,
          imageUrl: img.imageUrl,
          addedAt: new Date().toISOString(),
          order: img.order,
        }))
      )
    }

    return NextResponse.json([])
  } catch (error: any) {
    console.error("Gallery API error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}