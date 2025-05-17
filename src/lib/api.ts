const getServerUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.SERVER_URL;
  }

  return process.env.NEXT_PUBLIC_SERVER_URL;
};

export { getServerUrl };
