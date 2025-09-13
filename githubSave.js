// githubSave.js
async function saveEmojisToGitHub(emojis) {
  const token = "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";     // your GitHub API token
  const owner = "ngkflip";  // your GitHub username/org
  const repo = "ngkperosnaltool";       // your repo name
  const path = "savedemoji.json"; // file path in repo
  const branch = "main";          // branch name

  // Get current file content & sha
  let res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers: { Authorization: `token ${token}` } }
  );
  let fileData = await res.json();

  let existing = [];
  if (fileData.content) {
    existing = JSON.parse(atob(fileData.content));
  }

  // Merge new emojis (avoid duplicates)
  let updated = [...new Set([...existing, ...emojis])];

  // Push update back to GitHub
  await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Update saved emojis",
      content: btoa(JSON.stringify(updated, null, 2)),
      sha: fileData.sha,
      branch
    })
  });
}
