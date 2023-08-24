import mongoose from 'mongoose';
import {Tracker} from '../models';

describe('Tracker Service Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Tracker.deleteMany({});
  });

  afterEach(async () => {
    await Tracker.deleteMany({});
  });

  describe('retrieveTrackerService', () => {
    it('Retrieves a tracker by ID', async () => {
      const trackerData = { /* mock tracker data */ };
      Tracker.findById.mockResolvedValue(trackerData);

      const result = await retrieveTrackerService('trackerId');
      expect(result).toEqual(trackerData);
    });

    it('Returns null if tracker is not found', async () => {
      Tracker.findById.mockResolvedValue(null);

      const result = await retrieveTrackerService('nonExistentTrackerId');
      expect(result).toBeNull();
    });
  });

  describe('createTrackerService', () => {
    it('Creates a new tracker', async () => {
      const payload = { /* mock payload */ };
      const user = {_id: 'userId'};
      const createdTracker = { /* mock created tracker */ };
      Tracker.prototype.save = jest.fn().mockResolvedValue(createdTracker);

      const result = await createTrackerService(payload, user);
      expect(result).toEqual(createdTracker);
    });
  });

  describe('updateTrackerService', () => {
    it('Updates a tracker by ID', async () => {
      const updatedTracker = { /* mock updated tracker */ };
      Tracker.findByIdAndUpdate.mockResolvedValue(updatedTracker);

      const result = await updateTrackerService('trackerId', {});
      expect(result).toEqual(updatedTracker);
    });

    it('Returns null if tracker is not found', async () => {
      Tracker.findByIdAndUpdate.mockResolvedValue(null);

      const result = await updateTrackerService('nonExistentTrackerId', {});
      expect(result).toBeNull();
    });
  });

  describe('listTrackerService', () => {
    it('Retrieves a list of trackers for a date', async () => {
      const query = { /* mock query */ };
      const trackers = [{ /* mock tracker 1 */ }, { /* mock tracker 2 */ }];
      Tracker.find.mockResolvedValue(trackers);

      const result = await listTrackerService(query);
      expect(result).toEqual(trackers);
    });

    it('Retrieves a list of trackers for current date if no date is provided',
        async () => {
          const currentDate = new Date().toISOString().split('T')[0];
          const query = {};
          const trackers = [{ /* mock tracker 1 */ }, { /* mock tracker 2 */ }];
          Tracker.find.mockResolvedValue(trackers);

          const result = await listTrackerService(query);
          expect(result).toEqual(trackers);
          expect(Tracker.find).toHaveBeenCalledWith({
            created: {
              $gte: new Date(`${currentDate}T00:00:00Z`),
              $lte: new Date(`${currentDate}T23:59:59Z`),
            },
          });
        });
  });

  describe('leftFacilityService', () => {
    it('Marks out time for a tracker', async () => {
      const user = {_id: 'userId'};
      const updatedTracker = { /* mock updated tracker */ };
      Tracker.findByIdAndUpdate.mockResolvedValue(updatedTracker);

      const result = await leftFacilityService('trackerId', user);
      expect(result).toEqual(updatedTracker);
    });

    it('Returns null if tracker is not found', async () => {
      Tracker.findByIdAndUpdate.mockResolvedValue(null);

      const result = await leftFacilityService('nonExistentTrackerId', {});
      expect(result).toBeNull();
    });
  });
});
