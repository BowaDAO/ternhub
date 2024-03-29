"use client";

import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { Message, JobCard } from "@/components";
import { useGetUserSavedJobs } from "@/utilities/data-fetching/getUserSavedJobs";
import { illustrations } from "@/constants";

const SavedJobsPage = () => {
  const { savedJobs, isError, isLoading, error, refetch } =
    useGetUserSavedJobs();

  return (
    <div
      className={`w-full ${
        (savedJobs && savedJobs.length > 0) || isLoading
          ? "job_list_grid"
          : "flex items-center justify-center"
      } `}
    >
      {isLoading ? (
        [...Array(6)].map((_, index) => <JobSkeletonLoader key={index} />)
      ) : isError ? (
        <Message
          message={error?.response?.data?.message}
          isError={isError}
          buttonLabel="Try again"
          onClickButton={refetch}
          illustration={illustrations.error_2}
        />
      ) : savedJobs && savedJobs.length < 1 ? (
        <Message
          message="Keep track of jobs you're interested in. Press the save button on a job card to save it for later."
          illustration={illustrations.no_saved_jobs}
        />
      ) : (
        savedJobs &&
        savedJobs.map((job) => (
          <JobCard props={job} key={job._id} rootUrl="/jobs" />
        ))
      )}
    </div>
  );
};

export default SavedJobsPage;
