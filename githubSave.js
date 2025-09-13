// githubSave.js
async function saveEmojisToGitHub(emojis) {
  const token = "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";     // your GitHub API token
  const owner = "ngkflip";        // your GitHub username/org
  const repo = "ngkperosnaltool"; // your repo name
  const path = "savedemoji.json"; // file path in repo
  const branch = "main";          // branch name

  // STEP 1: Get current file content & sha
  let fileData = {};
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      { headers: { Authorization: `token ${token}` } }
    );
    if (res.ok) {
      fileData = await res.json();
    }
  } catch (err) {
    console.warn("No existing file found, will create new:", err);
  }

  let existing = [];
  if (fileData && fileData.content) {
    try {
      existing = JSON.parse(atob(fileData.content));
    } catch (err) {
      console.error("Failed to parse existing JSON:", err);
    }
  }

  // STEP 2: Merge new emojis (avoid duplicates)
  let updated = [...new Set([...existing, ...emojis])];

  // STEP 3: Push update back to GitHub
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Update saved emojis",
      content: btoa(unescape(encodeURIComponent(JSON.stringify(updated, null, 2)))),
      sha: fileData.sha || undefined, // required if file exists
      branch
    })
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("GitHub save failed:", err);
    throw new Error(err.message || "GitHub save failed");
  }

  console.log("✅ Emojis saved to GitHub:", updated);
}
