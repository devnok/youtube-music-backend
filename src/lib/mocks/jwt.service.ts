const mockedJwtService = {
  sign: (payload: string, options?: object) => 'mocked_token',
};

export default mockedJwtService;
