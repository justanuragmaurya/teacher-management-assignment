import { PrismaClient, Role } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Sample data arrays with Indian names
const teacherNames = [
  'Dr. Priya Sharma', 'Prof. Rajesh Kumar', 'Ms. Anita Patel', 'Dr. Vikram Singh',
  'Prof. Meera Gupta', 'Mr. Suresh Reddy', 'Dr. Kavita Joshi', 'Prof. Arjun Nair',
  'Ms. Deepika Rao', 'Dr. Rohit Agarwal', 'Prof. Sneha Iyer', 'Mr. Kiran Mishra',
  'Dr. Pooja Verma', 'Prof. Arun Menon', 'Ms. Ritu Chopra', 'Dr. Nitin Bhat',
  'Prof. Shweta Malhotra', 'Mr. Manish Tiwari', 'Dr. Neha Bansal', 'Prof. Varun Khanna',
  'Ms. Divya Sinha', 'Dr. Sanjay Kulkarni', 'Prof. Rekha Pandey', 'Mr. Ashish Jain',
  'Dr. Preeti Saxena', 'Prof. Ravi Thakur', 'Ms. Sunita Shah', 'Dr. Ajay Kapoor',
  'Prof. Madhuri Desai', 'Mr. Vikas Goyal'
]

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature',
  'History', 'Geography', 'Computer Science', 'Psychology', 'Economics',
  'Philosophy', 'Art', 'Music', 'Physical Education', 'Sociology'
]

const qualificationTitles = [
  'Bachelor of Science in Mathematics',
  'Master of Arts in English Literature',
  'PhD in Physics',
  'Bachelor of Education',
  'Master of Science in Computer Science',
  'PhD in Chemistry',
  'Master of Arts in History',
  'Bachelor of Science in Biology',
  'Master of Education',
  'PhD in Psychology',
  'Bachelor of Arts in Philosophy',
  'Master of Fine Arts',
  'Bachelor of Music',
  'Master of Science in Physics',
  'PhD in Mathematics'
]

const addresses = [
  'A-123, Sector 18, Noida, Uttar Pradesh 201301',
  'B-456, Koramangala, Bangalore, Karnataka 560034',
  'C-789, Bandra West, Mumbai, Maharashtra 400050',
  'D-321, CP, New Delhi, Delhi 110001',
  'E-654, Park Street, Kolkata, West Bengal 700016',
  'F-987, Anna Nagar, Chennai, Tamil Nadu 600040',
  'G-147, Hitech City, Hyderabad, Telangana 500081',
  'H-258, MG Road, Pune, Maharashtra 411001',
  'I-369, Satellite, Ahmedabad, Gujarat 380015',
  'J-741, Civil Lines, Jaipur, Rajasthan 302006',
  'K-852, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
  'L-963, Jubilee Hills, Hyderabad, Telangana 500033',
  'M-159, Salt Lake, Kolkata, West Bengal 700064',
  'N-357, Electronic City, Bangalore, Karnataka 560100',
  'O-468, Powai, Mumbai, Maharashtra 400076'
]

function getRandomEmail(name: string): string {
  const cleanName = name.toLowerCase()
    .replace(/dr\.|prof\.|ms\.|mr\./g, '')
    .replace(/[^a-z\s]/g, '')
    .trim()
    .split(' ')
    .join('.')
  
  const domains = ['university.ac.in', 'college.edu.in', 'iit.ac.in', 'nit.ac.in', 'school.org.in']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  
  return `${cleanName}@${domain}`
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomPhone(): number {
  return Math.floor(Math.random() * 1000000000) + 1000000000 // 1000000000 to 1999999999
}

function getRandomBirthdate(): Date {
  // Teachers typically between 25-65 years old
  const currentYear = new Date().getFullYear()
  const minYear = currentYear - 65
  const maxYear = currentYear - 25
  
  return getRandomDate(
    new Date(minYear, 0, 1),
    new Date(maxYear, 11, 31)
  )
}

function getRandomQualificationDate(): Date {
  const currentDate = new Date()
  const fortyYearsAgo = new Date(currentDate.getFullYear() - 40, 0, 1)
  
  return getRandomDate(fortyYearsAgo, currentDate)
}

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.qualifications.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('✅ Existing data cleared')

  // Create your specific user first
  const yourUser = await prisma.user.create({
    data: {
      name: 'Anurag Maurya',
      email: 'anurag.ftw.pubg@gmail.com',
      role: Role.Admin,
      birthdate: new Date('1995-01-15'),
      phone: 1987654321, // Safe phone number within INT4 range
      address: 'Block A, Tech Park, Sector 62, Noida, Uttar Pradesh 201309',
      image: 'https://avatars.githubusercontent.com/u/placeholder'
    }
  })

  console.log(`✅ Created admin user: ${yourUser.name}`)

  // Create random teachers
  const teachers = []
  
  for (let i = 0; i < teacherNames.length; i++) {
    const name = teacherNames[i]
    const email = getRandomEmail(name)
    
    const teacher = await prisma.user.create({
      data: {
        name,
        email,
        role: Math.random() > 0.9 ? Role.Admin : Role.Teacher, // 10% chance of admin
        birthdate: getRandomBirthdate(),
        phone: getRandomPhone(),
        address: addresses[Math.floor(Math.random() * addresses.length)],
        image: `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(name)}`,
        emailVerified: Math.random() > 0.3 ? new Date() : null // 70% verified
      }
    })
    
    teachers.push(teacher)
    console.log(`👨‍🏫 Created teacher: ${teacher.name}`)
  }

  // Create qualifications for each teacher
  for (const teacher of teachers) {
    const numQualifications = Math.floor(Math.random() * 4) + 1 // 1-4 qualifications per teacher
    
    for (let i = 0; i < numQualifications; i++) {
      const qualification = await prisma.qualifications.create({
        data: {
          title: qualificationTitles[Math.floor(Math.random() * qualificationTitles.length)],
          date: getRandomQualificationDate(),
          rate: Math.floor(Math.random() * 10) + 1, // Rating from 1-10
          teacherid: teacher.id
        }
      })
      
      console.log(`📜 Created qualification for ${teacher.name}: ${qualification.title}`)
    }
  }

  // Create some qualifications for your admin user too
  for (let i = 0; i < 3; i++) {
    await prisma.qualifications.create({
      data: {
        title: qualificationTitles[Math.floor(Math.random() * qualificationTitles.length)],
        date: getRandomQualificationDate(),
        rate: Math.floor(Math.random() * 3) + 8, // High ratings (8-10) for admin
        teacherid: yourUser.id
      }
    })
  }

  console.log('🎉 Database seeding completed successfully!')
  console.log(`📊 Created ${teachers.length + 1} users total`)
  console.log(`👥 ${teachers.filter(t => t.role === Role.Teacher).length} teachers`)
  console.log(`👑 ${teachers.filter(t => t.role === Role.Admin).length + 1} admins`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
