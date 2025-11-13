import prisma from "./lib/prisma"

async function checkDatabase() {
  try {
    console.log("🔍 Verificando conexión a la base de datos...")
    
    // Verificar conexión
    await prisma.$connect()
    console.log("✅ Conectado a la base de datos")
    
    // Contar vehículos
    const vehicleCount = await prisma.vehicle.count()
    console.log(`\n📊 Total de vehículos: ${vehicleCount}`)
    
    // Contar categorías
    const categoryCount = await prisma.category.count()
    console.log(`📊 Total de categorías: ${categoryCount}`)
    
    // Contar usuarios
    const userCount = await prisma.user.count()
    console.log(`📊 Total de usuarios: ${userCount}`)
    
    // Listar vehículos
    if (vehicleCount > 0) {
      console.log("\n🚗 Vehículos en la base de datos:")
      const vehicles = await prisma.vehicle.findMany({
        select: {
          id: true,
          brand: true,
          model: true,
          year: true,
          price: true,
          status: true,
          isVisible: true,
        },
        take: 5,
      })
      console.table(vehicles)
    } else {
      console.log("\n⚠️  No hay vehículos en la base de datos")
      console.log("💡 Ejecuta: npm run db:seed")
    }
    
    await prisma.$disconnect()
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

checkDatabase()
