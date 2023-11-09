\c cc_test

-- SELECT * FROM interests;
-- SELECT * FROM trips;
-- SELECT * FROM users;
-- SELECT * FROM cards;
-- SELECT * FROM friends;
-- SELECT * FROM friendsRequests;
-- SELECT * FROM events;
-- SELECT * FROM events_users;
-- SELECT * FROM interests_users;
SELECT * FROM friendsRequests;
SELECT * FROM friends;

CREATE TEMP TABLE matched_requests_temp AS 
    SELECT * FROM friendsRequests fr1
    WHERE EXISTS (
        SELECT 1 FROM friendsRequests fr2
        WHERE fr1.friend_a = fr2.friend_b
        AND fr1.friend_b = fr2.friend_a
    );

INSERT INTO friends (friend_a, friend_b)
SELECT friend_a, friend_b FROM matched_requests_temp;

DELETE FROM friendsRequests
WHERE EXISTS (
    SELECT 1 FROM matched_requests_temp
    WHERE friendsRequests.friend_a = matched_requests_temp.friend_a
    AND friendsRequests.friend_b = matched_requests_temp.friend_b
);

SELECT * FROM friendsRequests;
SELECT * FROM friends;

DROP TABLE matched_requests_temp;