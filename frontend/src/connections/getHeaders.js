const getHeaders = () => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    return {
      headers: {
        'x-auth-token': token,
      },
    };
  }
  return {};
};

export default getHeaders;
