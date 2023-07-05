import {Tracker} from '../models';

export const retrieveTrackerService = async (id) => {
  const tracker = await Tracker.findById(id);
  return tracker;
};

export const createTrackerService = async (payload, user) => {
  const newTracker = new Tracker({...payload, in: {user: user._id}});
  const createdTracker = await newTracker.save();
  return createdTracker;
};

export const updateTrackerService = async (id, payload) => {
  const updatedTracker = await Tracker.findByIdAndUpdate(
      id, payload, {new: true},
  );
  return updatedTracker;
};

export const listTrackerService = async () => {
  const trackers = await Tracker.find();
  return trackers;
};

export const leftFacilityService = async (id, user) => {
  const payload = {out: {user: user._id}};
  const tracker = await Tracker.findByIdAndUpdate(id, payload, {new: true});
  return tracker;
};
