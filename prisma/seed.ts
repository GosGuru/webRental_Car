import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with scraped vehicles...')

  // Limpiar datos existentes (opcional)
  console.log('🗑️  Cleaning existing data...')
  await prisma.vehicle.deleteMany()
  
  console.log('📦 Creating vehicles...')

  await prisma.vehicle.create({
    data: {
      brand: 'BMW',
      model: 'X5 XDRIVE 40D 306CV',
      year: 2014,
      price: 29900.0,
      mileage: 208000,
      enginePower: '306CV',
      engineSize: null,
      features: ["Retrovisores eléctricos", "Elevalunas eléctricos", "Llantas", "Techo solar", "Sensores", "Volante multifunción", "Cámara", "Climatizador"],
      description: 'BMW X5 XDRIVE 40D 306CV. AÑO 2014. 208.000 KM. Se Vende BMW X5 en perfecto estado. Vehículo nacional. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado, con todos los mantenimientos al día. Viene equipado con 2 llaves, 7 plazas, climatizad|or bizona, llantas de aluminio, cámara de marcha atrás, sensores de aparcamiento, techo solar, sensor de lluvia y luces, retrovisores eléctricos, elevalunas eléctricos, ordenador de abordo.',
      isVisible: true,
      isFeatured: true,
      fuelType: 'DIESEL',
      transmission: 'AUTOMATIC',
      bodyType: 'SUV',
      slug: 'bmw-x5-xdrive-40d-306cv-2014',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'OPEL',
      model: 'CORSA 1.4 90CV',
      year: 2008,
      price: 5900.0,
      mileage: 163000,
      enginePower: '90CV',
      engineSize: '1.4L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'OPEL CORSA 1.4 90CV. AÑO 2008. 163.000 KM. Se vende OPEL CORSA en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, pantalla, aire acondicionado, control de estabilidad, etc.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'GASOLINE',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'opel-corsa-14-90cv-2008',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'VOLKSWAGEN',
      model: 'Polo 1.2 60CV',
      year: 2008,
      price: 4990.0,
      mileage: 235000,
      enginePower: '60CV',
      engineSize: '1.2L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'VOLKSWAGEN Polo 1.2 60CV. AÑO 2008. 235.000 KM. Se vende VOLKSWAGEN POLO en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, pantalla, aire acondicionado, control de estabilidad.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'GASOLINE',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'volkswagen-polo-12-60cv-2008',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'VOLKSWAGEN',
      model: 'GOLF 1.9 TDI 105CV',
      year: 2006,
      price: 5990.0,
      mileage: 230000,
      enginePower: '105CV',
      engineSize: '1.9L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'VOLKSWAGEN GOLF 1.9 TDI 105CV. AÑO 2006. 230.000 KM. Se vende VOLKSWAGEN GOLF en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con mp3, aire acondicionado.',
      isVisible: true,
      isFeatured: true,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'volkswagen-golf-19-tdi-105cv-2006',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'CITROEN',
      model: 'C3 HDI 70 CV',
      year: 2007,
      price: 3900.0,
      mileage: 296000,
      enginePower: '70CV',
      engineSize: null,
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'CITROEN C3 HDI 70 CV. AÑO 2007. 296.000 KM. Se vende CITROEN C3 en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'citroen-c3-hdi-70-cv-2007',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'RENAULT',
      model: 'MEGANE 1.9 DCI 120CV',
      year: 2004,
      price: 2990.0,
      mileage: 290000,
      enginePower: '120CV',
      engineSize: '1.9L',
      features: ["Climatizador", "Elevalunas eléctricos"],
      description: 'RENAULT MEGANE 1.9 DCI 120CV. AÑO 2004. 290.000 KM. Se vende Renault Megane en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, radio CD, climatizador, mandos al volante.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'renault-megane-19-dci-120cv-2004',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'FORD',
      model: 'FIESTA 1.4 TDCI 68 CV',
      year: 2007,
      price: 4990.0,
      mileage: 220000,
      enginePower: '68CV',
      engineSize: '1.4L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'FORD FIESTA 1.4 TDCI 68 CV. AÑO 2007. 220.000 KM. Se vende FORD FIESTA en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con mp3, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'ford-fiesta-14-tdci-68-cv-2007',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'PEUGEOT',
      model: '207 1.6 HDI 90 CV',
      year: 2008,
      price: 4900.0,
      mileage: 254000,
      enginePower: '90CV',
      engineSize: '1.6L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'PEUGEOT 207 1.6 HDI 90 CV. AÑO 2008. 254.000 KM. Se vende PEUGEOT 207 en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con mp3, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'peugeot-207-16-hdi-90-cv-2008',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'SEAT',
      model: 'LEON 1.9 TDI 105 CV',
      year: 2006,
      price: 4990.0,
      mileage: 288000,
      enginePower: '105CV',
      engineSize: '1.9L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'SEAT LEON 1.9 TDI 105 CV. AÑO 2006. 288.000 KM. Se vende SEAT LEON en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con mp3, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'seat-leon-19-tdi-105-cv-2006',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'CITROEN',
      model: 'XSARA PICASSO 2.0 HDI 90 CV',
      year: 2002,
      price: 2490.0,
      mileage: 317000,
      enginePower: '90CV',
      engineSize: '2.0L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'CITROEN XSARA PICASSO 2.0 HDI 90 CV. AÑO 2002. 317.000 KM. Se vende CITROEN XSARA PICASSO en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, radio CD, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'VAN',
      slug: 'citroen-xsara-picasso-20-hdi-90-cv-2002',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'RENAULT',
      model: 'CLIO 1.5 DCI 65 CV',
      year: 2006,
      price: 3990.0,
      mileage: 287000,
      enginePower: '65CV',
      engineSize: '1.5L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'RENAULT CLIO 1.5 DCI 65 CV. AÑO 2006. 287.000 KM. Se vende RENAULT CLIO en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con mp3, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'renault-clio-15-dci-65-cv-2006',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'NISSAN',
      model: 'QASHQAI 1.5 DCI 110 CV',
      year: 2008,
      price: 7490.0,
      mileage: 291000,
      enginePower: '110CV',
      engineSize: '1.5L',
      features: ["Elevalunas eléctricos", "Aire acondicionado", "Llantas"],
      description: 'NISSAN QASHQAI 1.5 DCI 110 CV. AÑO 2008. 291.000 KM. Se vende NISSAN QASHQAI en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con USB, llantas de aluminio, aire acondicionado.',
      isVisible: true,
      isFeatured: true,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'SUV',
      slug: 'nissan-qashqai-15-dci-110-cv-2008',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'RENAULT',
      model: 'SCENIC 1.9 DCI 120 CV',
      year: 2005,
      price: 3490.0,
      mileage: 289000,
      enginePower: '120CV',
      engineSize: '1.9L',
      features: ["Climatizador", "Elevalunas eléctricos"],
      description: 'RENAULT SCENIC 1.9 DCI 120 CV. AÑO 2005. 289.000 KM. Se vende RENAULT SCENIC en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, radio CD, climatizador, mandos al volante.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'VAN',
      slug: 'renault-scenic-19-dci-120-cv-2005',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'PEUGEOT',
      model: '308 1.6 HDI 90 CV',
      year: 2009,
      price: 3900.0,
      mileage: 316000,
      enginePower: '90CV',
      engineSize: '1.6L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'PEUGEOT 308 1.6 HDI 90 CV. AÑO 2009. 316.000 KM. Se vende Peugeot 308 en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, ordenador de abordo, radio CD con mp3, aire acondicionado, control de estabilidad.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'peugeot-308-16-hdi-90-cv-2009',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'RENAULT',
      model: 'LAGUNA 1.9 CDI 120CV',
      year: 2004,
      price: 2990.0,
      mileage: 271000,
      enginePower: '120CV',
      engineSize: '1.9L',
      features: ["Climatizador", "Elevalunas eléctricos"],
      description: 'RENAULT LAGUNA 1.9 CDI 120CV. AÑO 2004. 271.000 KM. Se vende Renault Laguna en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, radio CD, climatizador, mandos al volante.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'SEDAN',
      slug: 'renault-laguna-19-cdi-120cv-2004',
    }
  })

  await prisma.vehicle.create({
    data: {
      brand: 'DACIA',
      model: 'SANDERO 1.5 DCI 75 CV',
      year: 2011,
      price: 4390.0,
      mileage: 230000,
      enginePower: '75CV',
      engineSize: '1.5L',
      features: ["Elevalunas eléctricos", "Aire acondicionado"],
      description: 'DACIA SANDERO 1.5 DCI 75 CV. AÑO 2011. 230.000 KM. Se vende Dacia Sandero en perfecto estado. Cambio de nombre y un año de garantía incluido en el precio. Financiación a tu medida. Se entrega totalmente revisado y con todos los mantenimientos al día. Viene equipado con cierre centralizado, elevalunas eléctricos, radio CD con USB, aire acondicionado.',
      isVisible: true,
      isFeatured: false,
      fuelType: 'DIESEL',
      transmission: 'MANUAL',
      bodyType: 'HATCHBACK',
      slug: 'dacia-sandero-15-dci-75-cv-2011',
    }
  })

  console.log('✅ Seeding completed! Created 17 vehicles.')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
