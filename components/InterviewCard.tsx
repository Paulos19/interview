import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "./DisplayTechIcons";


const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {

  const feedback = null as Feedback | null
  const normalizeType = /mix/gi.test(type) ? 'Mixed' : type
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('D MMM, YYYY')

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
            )}
          >
            <p className="badge-text ">{normalizeType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Entrevistas</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || '---'}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || 'Você ainda não viu a Entrevista. Participe'}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack}/>
          <Button className="btn-primary">
            <Link
             href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}
            >
                {feedback ? 'Checar Feedback' : 'Ver Feedback'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
