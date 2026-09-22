---
title: "🟠 Design Twitter"
external_links:
    NeetCode: https://neetcode.io/problems/design-twitter-feed
---
!!! note ""
    Implement a simplified version of Twitter which allows users to post tweets, follow/unfollow each other, and view the `10` most recent tweets within their own news feed.

    <span/>

    Users and tweets are uniquely identified by their IDs (integers).

    Implement the following methods:
    
    - `Twitter()` Initializes the twitter object.
    - `void postTweet(int userId, int tweetId)` Publish a new tweet with ID `tweetId` by the user `userId`. You may assume that each `tweetId` is unique.
    - `List<Integer> getNewsFeed(int userId)` Fetches at most the `10` most recent tweet IDs in the user's news feed. Each item must be posted by users who the user is following or by the user themself. Tweets IDs should be ordered from most recent to least recent.
    - `void follow(int followerId, int followeeId)` The user with ID `followerId` follows the user with ID `followeeId`.
    - `void unfollow(int followerId, int followeeId)` The user with ID `followerId` unfollows the user with ID `followeeId`.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Some considerations:

- we can assume user IDs to be unique and just random
- we can assume tweet IDs to be unique and incremental (a more recent tweet has a higher ID)
- a user cannot follow themself BUT from the example we see that they still see their own tweets in the feed
- we must store all tweets, but the limit of `10` applies at the moment of showing the feed -> here we can think about a heap
- the follow action is unidirectional as expected: when following, the followee does not care about it

Today I'm a bit lazy, so here's what I came up in the solution file itself during the first session, let's see that as a different explanation method: following my raw thought process.

Maybe I'll find some time to polish it in the future.


    users { 1: [2, 3, 4] } -> user 1 follows users 2, 3 and 4
    - follow O(1)
    - unfollow O(n) n=number of users followed -> how do we improve? let's use a set instead -> O(1)
    space: O(N * M), N=total number of users, M=max number of followees for any user

    tweets { 1: [10, 20]} -> user 1 published 2 tweets with id 10 and 20
    - postTweet O(1) -> good enough, we keep a list
    space: O(N * m) N=total number of users, m=max number of tweets for any user

    - getNewsFeed: go to users[userId], go through each followee, put tweets in a min-heap of capacity 10
    all tweets remaining will be the 10 most recent onces
    time: O(1) to access users, O(n) to go through followees times O(m log 10) to put tweets in heap = O(n * m log 10) = O(n * m)

    that's bad because we're looping through all tweets, but again we only need the most recent ones

    think about this, when a user tweets and we insert it, it's by definition the most recent one -> let's start backwards!

    insert the last tweet from each user in the heap, say:

    user 1 follows {2, 3}
    tweets:
    2 → [10, 20, 25]
    3 → [15, 30, 35]

    max-heap = [35, 25]

    we already have our first most recent tweet, 35, GUARANTEED since it's the root of the heap -> pop it and store it in feed, update needed = 10 - 1 = 9

    max-heap = [25]

    now which one do we add? from user 2 or 3? 25 is still the most recent tweet from user 2, so we should add the second most recent tweet from user 3 (notice that it's the same user for which we just popped a tweet), so push 30

    max-heap=[30,25], now we pop 30 and update accordingly, needed = 8

    and so on until we obtained 10 tweet at max (might be less)

    time:
    - we push one value per followee into the heap initially, so n values O(n log n), and we pushing values at most 10 more times, so so O(10 log n): in total O(n log n) + O(10 log n) = O(n log n)
    - we pop 10 times at max, so O(10 log n) = O(log n)
    - total time O(n log n)
    space: heap will have size equal to the number of followees O(n), and feed that we use to return O(10) = O(1), irrelevant


    overall:
    time: O(1) for each operation, O(n log n) for getNewsFeed
    space = O(N * M) + O(N * m) + O(n) = O((N * M) + (N * m) + n)

One **key point** I overlooked here: turns out that tweet IDs are not incremental, or at least we can't assume that. To solve this issue, we can keep a counter in the `Twitter` object.

And don't forget about a user should also see its own tweet, super easy to forget.

## Solution

=== "Python"

        :::python
        class Twitter:

            def __init__(self):
                self.users = {}
                self.tweets = {}
                self.timestamp = 0

            def postTweet(self, userId: int, tweetId: int) -> None:
                self.tweets.setdefault(userId, []).append((self.timestamp, tweetId))
                self.timestamp += 1

            def getNewsFeed(self, userId: int) -> List[int]:
                feed = []
                heap = []

                # add the latest tweet from each followees
                for followeeId in self.users.get(userId, {}):
                    if followeeId in self.tweets:
                        currentTweets = self.tweets[followeeId]
                        index = len(currentTweets) - 1

                        heapq.heappush(heap, (-currentTweets[index][0], currentTweets[index][1], followeeId, index - 1))

                # add the latest tweet from the user itself
                ownTweets = self.tweets.get(userId, [])
                ownIndex = len(ownTweets) - 1
                if ownTweets:
                    heapq.heappush(heap, (-ownTweets[ownIndex][0], ownTweets[ownIndex][1], userId, ownIndex - 1))

                # start manipulating the heap
                while heap and len(feed) < 10:
                    timestamp, tweetId, followeeId, index = heapq.heappop(heap)
                    feed.append(tweetId)

                    if index >= 0:
                        currentTweets = self.tweets[followeeId]
                        heapq.heappush(heap, (-currentTweets[index][0], currentTweets[index][1], followeeId, index - 1))

                return feed

            def follow(self, followerId: int, followeeId: int) -> None:
                if followerId != followeeId:
                    self.users.setdefault(followerId, set()).add(followeeId)

            def unfollow(self, followerId: int, followeeId: int) -> None:
                self.users[followerId].discard(followeeId)

=== "Python (simplified)"

        :::python
        class Twitter:

            def __init__(self):
                self.users = defaultdict(set)
                self.tweets = defaultdict(list)
                self.timestamp = 0

            def postTweet(self, userId: int, tweetId: int) -> None:
                self.tweets[userId].append((self.timestamp, tweetId))
                self.timestamp += 1

            def getNewsFeed(self, userId: int) -> List[int]:
                feed = []
                heap = []

                # add the latest tweet from each followees
                for followeeId in self.users[userId]:
                    if followeeId in self.tweets:
                        currentTweets = self.tweets[followeeId]
                        index = len(currentTweets) - 1

                        heapq.heappush(heap, (-currentTweets[index][0], currentTweets[index][1], followeeId, index - 1))

                # add the latest tweet from the user itself
                ownTweets = self.tweets[userId]
                ownIndex = len(ownTweets) - 1
                if ownTweets:
                    heapq.heappush(heap, (-ownTweets[ownIndex][0], ownTweets[ownIndex][1], userId, ownIndex - 1))

                # start manipulating the heap
                while heap and len(feed) < 10:
                    timestamp, tweetId, followeeId, index = heapq.heappop(heap)
                    feed.append(tweetId)

                    if index >= 0:
                        currentTweets = self.tweets[followeeId]
                        heapq.heappush(heap, (-currentTweets[index][0], currentTweets[index][1], followeeId, index - 1))

                return feed

            def follow(self, followerId: int, followeeId: int) -> None:
                if followerId != followeeId:
                    self.users[followerId].add(followeeId)

            def unfollow(self, followerId: int, followeeId: int) -> None:
                self.users[followerId].discard(followeeId)

=== "Java"

        :::java
        class Twitter {
            private Map<Integer, Set<Integer>> users;
            private Map<Integer, List<Pair<Integer, Integer>>> tweets;
            private int timestamp;

            public Twitter() {
                this.users = new HashMap<>();
                this.tweets = new HashMap<>();
                this.timestamp = 0;
            }
            
            public void postTweet(int userId, int tweetId) {
                this.tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new Pair<>(this.timestamp, tweetId));
                this.timestamp++;
            }
            
            public List<Integer> getNewsFeed(int userId) {
                List<Integer> feed = new ArrayList<>();
                PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));

                // add the latest tweet from each followees
                for (int followeeId : this.users.getOrDefault(userId, new HashSet<>())) {
                    if (this.tweets.containsKey(followeeId)) {
                        List<Pair<Integer, Integer>> currentTweets = this.tweets.get(followeeId);
                        int index = currentTweets.size() - 1;

                        heap.offer(new int[]{-currentTweets.get(index).getKey(), currentTweets.get(index).getValue(), followeeId, index - 1});
                    }
                }

                // add the latest tweet from the user itself
                List<Pair<Integer, Integer>> ownTweets = this.tweets.get(userId);

                if (ownTweets != null) {
                    int ownIndex = ownTweets.size() - 1;
                    heap.offer(new int[]{-ownTweets.get(ownIndex).getKey(), ownTweets.get(ownIndex).getValue(), userId, ownIndex - 1});
                }

                // start manipulating the heap
                while (heap.size() > 0 && feed.size() < 10) {

                        int[] poppedTweet = heap.poll();
                        feed.add(poppedTweet[1]);
                        int followeeId = poppedTweet[2];
                        int index = poppedTweet[3];

                        if (index >= 0) {
                            List<Pair<Integer, Integer>> currentTweets = this.tweets.get(followeeId);
                            heap.offer(new int[]{-currentTweets.get(index).getKey(), currentTweets.get(index).getValue(), followeeId, index - 1});
                        }
                }
                return feed;
            }
            
            public void follow(int followerId, int followeeId) {
                if (followerId != followeeId) {
                    this.users.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
                }
            }
            
            public void unfollow(int followerId, int followeeId) {
                this.users.computeIfPresent(followerId, (k, v) -> {
                    v.remove(followeeId);
                    return v;
                });
            }
        }

## Complexity

- **Time**: $O(1)$ for each operation, $O(n \log n)$ for `getNewsFeed` _as we explained above_
- **Space**: $OO((N * M) + (N * m) + n)$ _as we explained above_

!!! note ""
    where $n$ is the number of users followed, $N$ is the total number of users and $M$ is the maximum number of followees for any user

## Key Takeaways

- `dict.get(key, default)` only works when reading, it **does not create an entry** if the key is missing. Use `dict.setdefault(key, default)` if you need to create an entry on miss (or check existence + initial value + update).
- Remember that `list.append()` (but also `list.sort()`, `list.reverse()`, etc.) and `set.add()` modify the list in place and return `None`. So doing `dict[key] = dict.get(key, default).append(anotherValue)` will actually do `dict[key] = None`.
- When the problem gets a bit more complicated (see above points), using a `defaultdict` is quite handy as it removes the need of constantly checking the existence. The usage is shown in the **simplified** Python version.
- When pushing a `tuple` or a `list` in a heap, Python compares field by field - the most important one is the first field (that's why we use it to store negative timestamps), while the others are used as tie-breakers. We are sure we won't have any tie though, since we designed timestamps to be unique.
- `set.remove(value)` removes the element if present, throws an error if not present. `set.discard(value)` does the same but won't throw any error in case the element is not present. Find all the most common methods in the [Cheatsheet](../../00_cheatsheet.md).
- In the Java solution we're constructing and passing a `int[]` to the heap. This works, but the real-world solution would of course be different: create a class representing a Tweet or a generic element of the heap.
- Since we're passing that integer array, we need to specify a custom comparator as `Comparator.comparingInt(a -> a[0])` so that the heap uses the first field.
- Same thing for the `Pair` usage: in real production Java you'd more likely reach for a `record`.
- In Java, if unsure, we can always use tha same trick `map.putIfAbsent(key, value);` and `map.add(value)`, but it's not elegant. If it's easy to remember, just use `computeIfAbsent()` as done above.
