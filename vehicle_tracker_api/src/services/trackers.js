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

export const listTrackerService = async (query) => {
  const filter = {user: user._id};
  let {date} = query;
  if (!date) {
    date = new Date().toISOString().split('T')[0];
  }

  filter.created = {
    $gte: new Date(`${date}T00:00:00Z`),
    $lte: new Date(`${date}T23:59:59Z`),
  };
  const trackers = await Tracker.find(filter);
  return trackers;
};

export const leftFacilityService = async (id, user) => {
  const payload = {out: {user: user._id}};
  const tracker = await Tracker.findByIdAndUpdate(id, payload, {new: true});
  return tracker;
};
