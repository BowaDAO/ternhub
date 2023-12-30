import { JobCard } from "@/components";
import Link from "next/link";
import { Grotesk } from "@/app/font";

type Props = {
  relatedJobs: JobType[] | undefined;
};

const RelatedJobs = (props: Props) => {
  return (
    <>
      {props.relatedJobs && (
        <section className="flex flex-col lg:gap-[42px] gap-[28px]">
          <div className="flex items-center justify-between">
            <h3
              className="text-xl lg:text-[28px] font-[500] text-textblack"
              style={Grotesk.style}
            >
              Related Jobs
            </h3>

            <Link
              href="/jobs"
              className="text-purple text-base lg:text-lg font-semibold"
            >
              See all jobs
            </Link>
          </div>

          <div className="job_list_grid w-full">
            {props.relatedJobs.slice(0, 4).map((job) => (
              <JobCard key={job._id} props={job} rootUrl="/" />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedJobs;
