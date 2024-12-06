import { NextResponse } from 'next/server'
import { initDB } from '@/lib/db'
import { Note } from '@/lib/entities/Note'

export async function GET() {
  const dataSource = await initDB()
  const notes = await dataSource.getRepository(Note).find({
    relations: ['user']
  })
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  const dataSource = await initDB()
  const body = await request.json()
  
  const note = dataSource.getRepository(Note).create(body)
  await dataSource.getRepository(Note).save(note)
  
  return NextResponse.json(note)
}