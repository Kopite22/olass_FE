import assetApiInstance from '@/apis/asset/assetApiInstance';

interface RawJob {
  id: string;
  name: string;
}

interface Job {
  jobId: string;
  name: string;
}

const inPort = (rawJob: RawJob[]): Job[] => {
  return rawJob.map((job) => {
    return {
      jobId: job.id,
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
