import { EorzeanTime, ConvertToEorzeanTime } from "./eorzeanTime"

describe('ConvertToEorzeanTime function', () => {
    it('should return EorzeanTime correctly', () => {
        const et: EorzeanTime = ConvertToEorzeanTime(0)
        expect(et.source).toBe(0)
    });
});