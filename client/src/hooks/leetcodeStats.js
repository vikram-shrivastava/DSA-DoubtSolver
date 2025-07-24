// src/hooks/useLeetcodeStats.js
import { useState, useEffect } from "react";

// GraphQL query for both submitStatsGlobal & topic counts
const QUERY = `
  query stats($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
      }
    }
  }
`;

export default function useLeetcodeStats(username) {
  const [stats, setStats] = useState({ totalSolved: 0, byDifficulty: {}, byTopic: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!username) return setLoading(false);
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/users/leetcode/${username}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username })
        });
        const data = await res.json(); // Fix here
        console.log("LeetCode stats data:", data); // Debug
        if (!data) throw new Error("No user data");

        // Parse counts
        const byDifficulty = {};
        let totalSolved = 0;
        data.matchedUser.submitStats.acSubmissionNum.forEach(({ difficulty, count }) => {
          byDifficulty[difficulty.toLowerCase()] = count;
          if (difficulty === "All") totalSolved = count;
        });


        // Parse topics
        const byTopic = {};
        ["advanced", "intermediate", "fundamental"].forEach(key => {
          data.matchedUser.tagProblemCounts[key]?.forEach(item => {
            byTopic[item.tagName] = item.problemsSolved;
          });
        });
        setStats({ totalSolved, byDifficulty, byTopic });
      } catch {
        setStats({ totalSolved: 0, byDifficulty: {}, byTopic: {} });
      }
      setLoading(false);
    }
    fetchStats();
  }, [username]);


  return { stats, loading };
}
