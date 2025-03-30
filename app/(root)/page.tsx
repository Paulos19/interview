import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Tenha Entrevistas prontas com o Poder da IA, Prática & Feedback</h2>
          <p className='text-lg'>
            Pratique questões reais de Entrevistas e obtenha feedbacks instantâneos
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>
              Comece uma Entrevistas Agora
            </Link>
          </Button>
        </div>
        <Image
          src='/robot.png'
          alt='robot'
          width={400}
          height={400}
          className='max-sm:hidden'
        />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Suas Entrevistas</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}

          {/*<p>Você ainda não possui Entrevistas</p>*/}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Inicie uma Entrevista</h2>
        <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
