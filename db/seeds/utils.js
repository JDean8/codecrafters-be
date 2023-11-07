exports.convertTimestampToDateUsers = ({ created_at, ...restOfUser }) => {
  if (!created_at) return { ...restOfUser };
  return { created_at: new Date(created_at), ...restOfUser };
};

exports.convertTimestampToDateTrips = ({
  start_date,
  end_date,
  ...restOfTrip
}) => {
  if (start_date && end_date) {
    return {
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      ...restOfTrip,
    };
  } else {
    return { ...restOfTrip };
  }
};

exports.convertTimestampToDateEvents = ({ date, ...restOfEvent }) => {
  if (date) {
    return { date: new Date(date), ...restOfEvent };
  } else {
    return { ...restOfEvent };
  }
};
