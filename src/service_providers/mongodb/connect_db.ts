import { MONGODB_URI } from '@/constants'
import mongoose from 'mongoose'

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

interface MongooseCache {
  conn: typeof mongoose | null,
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise

  return cached.conn
}
