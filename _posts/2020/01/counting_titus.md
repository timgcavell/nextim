---
title: 'Counting Titus'
date: '2020-01-23'
---
I needed a message counter. There’s this distributed message processing system that takes messages in, works on them, passing them around, then finally sends some messages back out. I wanted to know precisely how many messages went in, how many were passed around, and how many came out.

Because the system is distributed, an in memory counter wouldn’t do. I need to persist the counts somewhere that all parts of the system could access. The system—that’s getting old, let’s give it a name: Titus. Every part of <del>the system</del> Titus has access to a centralized Redis cache and so was the obvious choice.

My first and naive approach incremented a counter at a key in the cache every time a message came in and every time a message went out. I implemented this, tested it to make sure the counts were correct, and it was deployed. Let’s count those messages!

…Titus wasn’t having any of it. Before message counting was introduced, Titus could handle thousands of messages a second. It was an efficiently calibrated production line. Now Titus more resembled a lone craftsman hand making each individual message. Throughput was cut 100 fold.

An in memory counter is fast but doesn’t give a true picture of all of Titus. A persistent counter tells the whole story but is slow. How do I get speed and an exhaustive count?

The solution: merge the two approaches. Every part of the system keeps its own counts in memory. While processing a message, Titus never communicates to an external system its message counts. Every minute, out of band of the message processing, Titus retrieves its internal counts, resets them to zero, and increments the true persistent counts.

This may sound familiar. The problem’s been solved and the industry term is eventual consistency. All distributed systems rely on this concept. As things change, every facet of the system won’t have identical or the most current information. But given enough time, the true state will propagate to the entire system.

For Titus, this means compromise. While messages are in flight, Titus cannot say exactly how many messages have been processed. But given a couple minutes of down time, the counts are available. If that downtime never occurs, Titus can only give a best guess of current message counts.

This trade off in the name of speed has been worth it. Titus gives a good estimate of messages through the system and importantly does not sacrifice on speed. Constant and exact consistency in a system like Titus is not often possible. But with multiple layers of caching and persistence and a little bit of patience we can find the truth.