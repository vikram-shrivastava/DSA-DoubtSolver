import React, { useEffect, useState } from "react";
import axios from "axios";

const TOPICS = [
  "Array", "String", "Tree", "Graph", "Dynamic Programming", "Math",
  "Greedy", "Backtracking", "Heap", "Bit Manipulation", "Stack", "Queue", "Linked List"
];

const getAvatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

// Coding-themed Loading Component
const CodingLoader = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="text-6xl font-mono text-blue-600 dark:text-blue-400 animate-pulse">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>{'{'}</span>
            <span className="inline-block animate-bounce mx-4" style={{ animationDelay: '200ms' }}>💻</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '400ms' }}>{'}'}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Loading Profile{dots}</h2>
          <div className="font-mono text-lg text-gray-600 dark:text-gray-400">
            <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">profile</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">=</span>{' '}
            <span className="text-green-600 dark:text-green-400">await</span>{' '}
            <span className="text-yellow-600 dark:text-yellow-400">fetchUserData</span>
            <span className="text-gray-900 dark:text-gray-100">()</span>
            <span className="animate-pulse text-gray-900 dark:text-gray-100">|</span>
          </div>
        </div>
        
        <div className="space-y-3 w-80">
          <div className="flex items-center gap-3">
            <span className="text-sm w-20 text-left text-gray-700 dark:text-gray-300">Profile:</span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full animate-pulse w-full transition-colors"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm w-20 text-left text-gray-700 dark:text-gray-300">LeetCode:</span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-600 dark:bg-yellow-400 h-2 rounded-full animate-pulse w-3/4 transition-colors"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm w-20 text-left text-gray-700 dark:text-gray-300">Stats:</span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-600 dark:bg-green-400 h-2 rounded-full animate-pulse w-1/2 transition-colors"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="inline-block animate-spin text-4xl">⚙️</div>
        </div>
      </div>
    </div>
  );
};

// LeetCode Stats Loading Component
const LeetCodeStatsLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-yellow-300 dark:bg-yellow-700 rounded transition-colors"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 transition-colors"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/50 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-800 transition-colors">
          <div className="w-16 h-12 bg-blue-200 dark:bg-blue-700 rounded mb-2 transition-colors"></div>
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded transition-colors"></div>
        </div>
        <div className="rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3 transition-colors">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full transition-colors"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm w-full min-h-[80px] transition-colors">
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 transition-colors"></div>
            <div className="w-8 h-6 bg-blue-200 dark:bg-blue-700 rounded mb-1 transition-colors"></div>
            <div className="w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leetcodeLoading, setLeetcodeLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/users/profile", {
          withCredentials: true
        });
        const userData = res.data.user;
        setUser({
          name: userData.username,
          leetcodeUsername: userData.leetcodeUsername || "",
          avatar: getAvatarUrl(userData.username),
          programmingLanguage: userData.PreferredLanguage || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch LeetCode stats when user data is loaded and has a LeetCode username
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      if (!user?.leetcodeUsername) {
        setLeetcodeStats(null);
        return;
      }

      setLeetcodeLoading(true);
      setLeetcodeError(null);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/leetcode/profile", // Update this to match your actual endpoint
          { username: user.leetcodeUsername },
          { withCredentials: true }
        );

        if (response.data.success) {
          setLeetcodeStats(response.data.data);
        } else {
          setLeetcodeError("Failed to fetch LeetCode data");
        }
      } catch (error) {
        console.error("LeetCode fetch error:", error);
        if (error.response?.status === 404) {
          setLeetcodeError("LeetCode user not found or profile is private");
        } else if (error.response?.status === 429) {
          setLeetcodeError("Rate limited. Please try again later");
        } else {
          setLeetcodeError("Failed to fetch LeetCode data");
        }
      } finally {
        setLeetcodeLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [user?.leetcodeUsername]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    
    const formData = new FormData(e.target);
    const updatedLeetCode = formData.get('leetcodeUsername');
    const updatedLanguage = formData.get('PreferredLanguage');

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/users/update-profile",
        {
          leetcodeUsername: updatedLeetCode,
          PreferredLanguage: updatedLanguage
        },
        { withCredentials: true }
      );

      setUser((prev) => ({
        ...prev,
        leetcodeUsername: updatedLeetCode,
        programmingLanguage: updatedLanguage
      }));

      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
    setUpdateLoading(false);
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
  };

  // Show main loading screen when profile is loading
  if (loading || !user) return <CodingLoader />;

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full mt-16">
      <div className="w-full md:max-w-4xl rounded-xl shadow-lg dark:shadow-2xl shadow-gray-300 dark:shadow-black/25 p-8 flex flex-col gap-8 transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        
        {/* Edit Button */}
        <div className="flex justify-end items-start px-2 sm:px-4 pt-2 sm:pt-4">
          <button
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            onClick={() => setEditing(true)}
            title="Edit Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414a1 1 0 01-1.263-1.263l1.414-4.243a4 4 0 01.828-1.414z" />
            </svg>
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div className="relative group">
            <img
              src={leetcodeStats?.profile?.userAvatar || user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
            />
            <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {user.name}
            </h2>
            <div className="space-y-1">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Preferred Language:{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                  {user.programmingLanguage || "Not set"}
                </span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                LeetCode:{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md">
                  {user.leetcodeUsername || "Not set"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 px-4 sm:px-6 backdrop-blur-sm transition-all duration-200">
            <form
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 w-full max-w-md md:max-w-lg transition-all duration-200"
              onSubmit={handleProfileUpdate}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  Edit Profile
                </h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setEditing(false)}
                  title="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center gap-2">
                <img
                  src={leetcodeStats?.profile?.userAvatar || user.avatar}
                  alt="Avatar"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-blue-500 dark:border-blue-400 shadow-lg object-cover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  LeetCode Username
                </label>
                <input
                  type="text"
                  name="leetcodeUsername"
                  defaultValue={user.leetcodeUsername}
                  placeholder="Enter your LeetCode username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Preferred Language
                </label>
                <select
                  name="PreferredLanguage"
                  defaultValue={user.programmingLanguage}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="C">C</option>
                  <option value="C#">C#</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="Swift">Swift</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={updateLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LeetCode Stats Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="text-yellow-500 dark:text-yellow-400 text-2xl">⚡</span>
            <span className="text-yellow-600 dark:text-yellow-400">LeetCode</span>
            <span className="text-gray-700 dark:text-gray-300">Stats</span>
          </h3>

          {!user.leetcodeUsername ? (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-6xl mb-4">🔗</div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                No LeetCode username set
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add your LeetCode username to see your coding stats
              </p>
            </div>
          ) : leetcodeLoading ? (
            <LeetCodeStatsLoader />
          ) : leetcodeError ? (
            <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-lg text-red-600 dark:text-red-400 mb-2">
                {leetcodeError}
              </p>
              <button
                onClick={() => {
                  setLeetcodeError(null);
                  // Trigger refetch by updating the user state
                  setUser(prev => ({ ...prev }));
                }}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline"
              >
                Try again
              </button>
            </div>
          ) : leetcodeStats ? (
            <>
              {/* Profile Info */}
              {leetcodeStats.profile && (
                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-4">
                    {leetcodeStats.profile.userAvatar && (
                      <img 
                        src={leetcodeStats.profile.userAvatar} 
                        alt="LeetCode Avatar" 
                        className="w-16 h-16 rounded-full border-2 border-yellow-400"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {leetcodeStats.profile.realName || leetcodeStats.username}
                      </h4>
                      {leetcodeStats.profile.company && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {leetcodeStats.profile.company}
                        </p>
                      )}
                      {leetcodeStats.profile.ranking && (
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          Ranking: #{leetcodeStats.profile.ranking}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {leetcodeStats.totalSolved}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Total Solved</span>
                </div>
                
                <div className="flex flex-col items-center bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {leetcodeStats.acceptanceRate}%
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Acceptance Rate</span>
                </div>

                {leetcodeStats.contestRanking?.globalRanking && (
                  <div className="flex flex-col items-center bg-purple-50 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                    <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      #{leetcodeStats.contestRanking.globalRanking}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Global Ranking</span>
                  </div>
                )}

                {leetcodeStats.calendar?.streak !== undefined && (
                  <div className="flex flex-col items-center bg-orange-50 dark:bg-orange-900/50 border border-orange-200 dark:border-orange-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                    <span className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {leetcodeStats.calendar.streak}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Day Streak</span>
                  </div>
                )}
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-xl p-6 shadow-sm hover:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200">
                  <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Problems by Difficulty</h4>
                  <div className="space-y-3">
                    {["easy", "medium", "hard"].map((diff) => (
                      <div key={diff} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-3 h-3 rounded-full ${
                            diff === "easy" ? "bg-green-500 dark:bg-green-400" : 
                            diff === "medium" ? "bg-yellow-500 dark:bg-yellow-400" : 
                            "bg-red-500 dark:bg-red-400"
                          }`} />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {diff.charAt(0).toUpperCase() + diff.slice(1)}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {leetcodeStats.byDifficulty?.[diff] ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Stats */}
                {leetcodeStats.beatsStats && (
                  <div className="rounded-xl p-6 shadow-sm hover:shadow-md bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-200 dark:border-purple-700 transition-all duration-200">
                    <h4 className="font-semibold mb-4 text-purple-800 dark:text-purple-300">Performance (Beats %)</h4>
                    <div className="space-y-3">
                      {["easy", "medium", "hard"].map((diff) => (
                        <div key={diff} className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{diff}</span>
                          <span className="font-semibold text-purple-700 dark:text-purple-300">
                            {leetcodeStats.beatsStats[diff] ? `${leetcodeStats.beatsStats[diff]}%` : '--'}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-purple-200 dark:border-purple-600 pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Overall</span>
                          <span className="font-bold text-purple-700 dark:text-purple-300">
                            {leetcodeStats.beatsStats.overall ? `${leetcodeStats.beatsStats.overall}%` : '--'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Topics Grid */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Problems by Topic</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                  {TOPICS.map((topic) => (
                    <div
                      key={topic}
                      className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 w-full min-h-[100px] group"
                    >
                      <span className="font-semibold text-gray-700 dark:text-gray-300 leading-snug text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {topic}
                      </span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {leetcodeStats.byTopic?.[topic] ?? 0}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Solved
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Submissions */}
              {leetcodeStats.recentSubmissions && leetcodeStats.recentSubmissions.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Submissions</h4>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Problem
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {leetcodeStats.recentSubmissions.slice(0, 5).map((submission, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {submission.title}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(submission.timestamp)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Contest Ranking */}
              {leetcodeStats.contestRanking && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contest Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {leetcodeStats.contestRanking.attendedContests}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Contests Attended</div>
                    </div>
                    
                    {leetcodeStats.contestRanking.rating && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                          {Math.round(leetcodeStats.contestRanking.rating)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Contest Rating</div>
                      </div>
                    )}
                    
                    {leetcodeStats.contestRanking.topPercentage && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                          {leetcodeStats.contestRanking.topPercentage.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Top Percentage</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Badges */}
              {leetcodeStats.badges && leetcodeStats.badges.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Badges</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {leetcodeStats.badges.slice(0, 8).map((badge, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        {badge.icon && (
                          <img 
                            src={badge.icon} 
                            alt={badge.displayName} 
                            className="w-12 h-12 mb-2 rounded-full"
                          />
                        )}
                        <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">
                          {badge.displayName}
                        </span>
                        {badge.creationDate && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(badge.creationDate).getFullYear()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Updated Info */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-4">
                Last updated: {new Date(leetcodeStats.lastUpdated).toLocaleString()}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;