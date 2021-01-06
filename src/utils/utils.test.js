import { happyHoursTimeFormat } from './formatTime.js';

describe('utils', () => {
  describe('checkDescriptionAfterTime', () => {

    it('should return null if there is no arg', () => {
      expect(happyHoursTimeFormat()).toBe(null);
    });

    it('should return null if arg is not a number', () => {
      expect(happyHoursTimeFormat('abc')).toBe(null);
      expect(happyHoursTimeFormat(() => {})).toBe(null);
    });


    it('should return null if arg is lower than zero', () => {
      expect(happyHoursTimeFormat(-1)).toBe(null);
      expect(happyHoursTimeFormat(-2)).toBe(null);
    });

    it('should return time in hh:mm:ss if arg is proper', () => {
      expect(happyHoursTimeFormat(122)).toBe('00:02:02');
      expect(happyHoursTimeFormat(3793)).toBe('01:03:13');
      expect(happyHoursTimeFormat(120)).toBe('00:02:00');
      expect(happyHoursTimeFormat(3604)).toBe('01:00:04');
    });

  });
});

