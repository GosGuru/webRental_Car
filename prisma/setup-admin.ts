import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Setting up admin user...')

  const email = 'admin@autosbustamante.com'
  const password = 'admin123'

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('✅ Admin user already exists')
    return
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email,
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created successfully!')
  console.log('📧 Email:', email)
  console.log('🔑 Password:', password)
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
