import assetApiInstance from '@/apis/asset/assetApiInstance';

interface Response {
  code: number;
  data: {
    items: RawJob[];
  };
  message: string;
  success: boolean;
}

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
  const response = await assetApiInstance.get<Response>('jobs', {
    cache: 'force-cache',
  });

  const rawJobs = (await response.json()).data.items;

  return inPort(rawJobs);
};

export default getAllJobs;
export type { Job };
