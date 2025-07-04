import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI =
  "Your_MongoDB_URL"

let client: MongoClient

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
  }
  return client.db("filestore")
}

export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase()
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    // Get stored password
    const storedPassword = await db.collection("vault_access_passwords").findOne({ type: "vault_access" })

    if (!storedPassword) {
      return NextResponse.json({ error: "No vault access password set" }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, storedPassword.password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    return NextResponse.json({ message: "Password verified successfully" })
  } catch (error) {
    console.error("Verify vault access password error:", error)
    return NextResponse.json({ error: "Failed to verify password" }, { status: 500 })
  }
}
