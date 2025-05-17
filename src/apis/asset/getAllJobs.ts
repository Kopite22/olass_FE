import assetApiInstance from '@/apis/asset/assetApiInstance';

interface RawJob {
  job_id: string;
  name: string;
}

interface Job {
  jobId: string;
  name: string;
}

const inPort = (rawJob: RawJob[]): Job[] => {
  return rawJob.map((job) => {
    return {
      jobId: job.job_id,
      name: job.name,
    };
  });
};

const getAllJobs = async () => {
  const response = await assetApiInstance.get<RawJob[]>('jobs', {
    cache: 'force-cache',
  });

  const rawJobs = await response.json();

  return inPort(rawJobs);
};

export default getAllJobs;
export type { Job };
