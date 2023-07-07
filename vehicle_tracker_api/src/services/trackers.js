import {Tracker} from '../models';

/**
 * Retrieve Tracker By ID
 * @param {string} id Trcaker ID
 * @return {Object}
 */
export const retrieveTrackerService = async (id) => {
  const tracker = await Tracker.findById(id);
  return tracker;
};

/**
 * Create new Tracker
 * @param {Object} payload Tracker Paylod
 * @param {Object} user Request User
 * @return {Object}
 */
export const createTrackerService = async (payload, user) => {
  const newTracker = new Tracker({...payload, in: {user: user._id}});
  const createdTracker = await newTracker.save();
  return createdTracker;
};

/**
 * Partial Update Tracker By ID
 * @param {string} id Tracker ID
 * @param {Object} payload Tracker PATCH Payload
 * @return {Object}
 */
export const updateTrackerService = async (id, payload) => {
  const updatedTracker = await Tracker.findByIdAndUpdate(
      id, payload, {new: true},
  );
  return updatedTracker;
};

/**
 * Return Tracker List By Date
 * @param {Object} query May Contain Date (YYYY-MM-DD)
 * @return  {Object[]}
 */
export const listTrackerService = async (query) => {
  const filter = {};
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

/**
 * Mark Out Time
 * @param {string} id Tracker ID
 * @param {Object} user Request User
 * @return {Object}
 */
export const leftFacilityService = async (id, user) => {
  const payload = {out: {user: user._id}};
  const tracker = await Tracker.findByIdAndUpdate(id, payload, {new: true});
  return tracker;
};
