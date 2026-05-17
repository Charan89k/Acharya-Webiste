import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

    console.log("API KEY EXISTS:", !!apiKey)
    console.log("FOLDER ID:", folderId)

    if (!apiKey || !folderId) {
      return NextResponse.json(
        {
          error: "Missing environment variables",
        },
        { status: 500 }
      )
    }

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`

    console.log("Fetching URL:", url)

    const response = await fetch(url)

    const text = await response.text()

    console.log("GOOGLE RESPONSE:", text)

    if (!response.ok) {
      return NextResponse.json(
        {
          error: text,
        },
        { status: 500 }
      )
    }

    const data = JSON.parse(text)

    const images = data.files
      .filter((file: any) => file.mimeType.startsWith("image/"))
      .map((file: any) => ({
        id: file.id,
        name: file.name,

        // FIXED IMAGE URL
        imageUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      }))

    return NextResponse.json(images)
  } catch (error) {
    console.error("FULL ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    )
  }
}