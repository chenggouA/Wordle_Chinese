// .github/scripts/updateChangelogFromReleases.mjs
const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const { JSDOM } = require("jsdom");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = "chenggouA";
const repo = "Wordle_Chinese";

(async () => {
  const { data: releases } = await octokit.repos.listReleases({ owner, repo });

  const html = fs.readFileSync("log.html", "utf-8");
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const container = document.querySelector(".container");

  const htmlParts = releases.map((release) => {
    const version = release.tag_name;
    const date = release.published_at?.split("T")[0] ?? "未知日期";
    const bodyLines = release.body?.split("\n").map(line =>
      line.trim() ? `<li>${line}</li>` : ""
    ).join("") ?? "";

    return `
      <div class="version">
        <h2>📌 ${version} <span style="font-size: 0.9rem; color: #888;">- ${date}</span></h2>
        <ul>
          <li><a class="release-link" href="${release.html_url}" target="_blank">📄 发布详情页</a></li>
          ${bodyLines}
        </ul>
      </div>
    `;
  });

  container.innerHTML = htmlParts.join("\n");

  fs.writeFileSync("log.html", dom.serialize());
  console.log("✅ Successfully updated changelog content from all releases.");
})();
