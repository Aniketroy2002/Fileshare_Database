import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

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

export async function GET() {
  try {
    const db = await connectToDatabase()
    const personalVaultPassword = await db.collection("personal_vault_passwords").findOne({ type: "personal_vault" })

    return NextResponse.json({ exists: !!personalVaultPassword })
  } catch (error) {
    console.error("Check personal vault password error:", error)
    return NextResponse.json({ error: "Failed to check password" }, { status: 500 })
  }
}
