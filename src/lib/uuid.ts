import { v4 as uuidv4 } from 'uuid';

let globalUUID: string | null = null;

const getUUID = (): string => {
  return globalUUID || (globalUUID = uuidv4());
};

export default getUUID;
