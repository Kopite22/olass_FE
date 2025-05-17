import { useSuspenseQuery } from '@tanstack/react-query';

import { AutoComplete } from '@/components/common/AutoComplete';

import { assetQueryKeys, Job } from '@/apis/asset';

interface Props {
  onSelect: (job: Job) => void;
  selectedJob: Job | null;
}

export default function JobInputDropdown({ onSelect, selectedJob }: Props) {
  const { data } = useSuspenseQuery(assetQueryKeys.getAllJobs());

  const handleSelect = (option: { label: string; value: string }) => {
    onSelect({
      jobId: option.value,
      name: option.label,
    });
  };

  return (
    <AutoComplete
      options={data.map((job) => ({ label: job.name, value: job.jobId }))}
      onSelect={handleSelect}
      selectedValue={
        selectedJob === null
          ? null
          : {
              label: selectedJob.name,
              value: selectedJob.jobId,
            }
      }
      placeholder='예: 디자이너, 개발자, 마케터 등'
    />
  );
}
