const fs = require("fs");
const { JSDOM } = require("jsdom");

const release = require(process.env.GITHUB_EVENT_PATH).release;
const version = release.tag_name;
const body = release.body;
const date = release.published_at.split("T")[0];
const repo = process.env.GITHUB_REPOSITORY;
const releaseUrl = `https://github.com/${repo}/releases/tag/${version}`;

const html = fs.readFileSync("log.html", "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

const container = document.querySelector(".container");

const newBlock = document.createElement("div");
newBlock.className = "version";

newBlock.innerHTML = `
  <h2>📌 ${version} <span style="font-size: 0.9rem; color: #888;">- ${date}</span></h2>
  <ul>
    <li><a class="release-link" href="${releaseUrl}" target="_blank">📄 发布详情页</a></li>
    ${body
      .split("\n")
      .map((line) => line.trim() ? `<li>${line}</li>` : '')
      .join("")}
  </ul>
`;

container.insertBefore(newBlock, container.firstChild);

fs.writeFileSync("log.html", dom.serialize());
console.log(`✅ changelog updated for ${version}`);
