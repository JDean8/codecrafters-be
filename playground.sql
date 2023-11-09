\c cc_test

SELECT * FROM interests;
SELECT * FROM trips;
SELECT * FROM users;
SELECT * FROM cards;
SELECT * FROM friends;
SELECT * FROM friendsRequests;
SELECT * FROM events;
SELECT * FROM events_users;
SELECT * FROM interests_users;

WITH matched_requests AS (
  SELECT fr1.friend_a AS friend_a, fr1.friend_b AS friend_b
  FROM friendsRequests fr1
  WHERE EXISTS (
    SELECT 1 
    FROM friendsRequests fr2 
    WHERE fr1.friend_a = fr2.friend_b 
    AND fr1.friend_b = fr2.friend_a
  )
)
INSERT INTO friends (friend_a, friend_b)
SELECT friend_a, friend_b
FROM matched_requests;

DELETE FROM friendsRequests
WHERE (friend_a, friend_b) IN (
  SELECT friend_a, friend_b 
  FROM matched_requests
) OR (friend_b, friend_a) IN (
  SELECT friend_a, friend_b 
  FROM matched_requests
);