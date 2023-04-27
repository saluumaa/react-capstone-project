import { fetchData, getAllData } from '../redux/covid/covidSlice';

describe('API tests', () => {
  let error;

  beforeAll(async () => {
    const response = await Promise.all([fetchData(), getAllData()]);
    error = response[0].error?.message || response[1].error?.message;
  });

  describe('fetchData', () => {
    it('should not return an error', () => {
      expect(error).toBeUndefined();
    });
  });

  describe('getAllData', () => {
    it('should not return an error', () => {
      expect(error).toBeUndefined();
    });
  });
});
