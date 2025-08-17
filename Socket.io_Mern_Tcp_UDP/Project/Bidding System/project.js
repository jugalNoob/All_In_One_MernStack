Stock Market Live Feed

Stream updates via Socket.io.

Redis Sorted Sets for price ranking.

HMAC signatures to verify price feed authenticity.



C. Real-time Bidding System

Description: Auction platform with bids updating instantly for all users.

Redis usage:

Sorted sets (ZADD) to store and rank bids.

Pub/Sub to broadcast changes to all bidders.

Security:

Verify bid authenticity with digital signatures (crypto.sign).