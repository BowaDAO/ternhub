"use client";

import { useParams } from "next/navigation";
import { JobInfopage } from "@/containers";
import { AdminToolBox } from "@/components";
import { getJobById } from "@/utilities/data-fetching/getJobById";

const AdminJobInfoPage = () => {
  const { jobId } = useParams();

  const { job, isLoading, isError, error, refetch } = getJobById(jobId);

  return (
    <div className="py-11 sm:px-[6.94%] px-5 flex flex-col gap-4">
      <div className="flex flex-start">
        <AdminToolBox
          editButtonLabel="Edit Job"
          editButtonUrl={`/admin/jobs/${jobId}/edit`}
          deleteButtonLabel="Delete Job"
          deleteButtonOnclick={() => {}}
        />
      </div>

      <JobInfopage
        data={job}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default AdminJobInfoPage;
