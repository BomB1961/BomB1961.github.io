#!/usr/bin/env node
/**
 * GitHub 공개 저장소 목록을 가져와 docs/data/repos.json 으로 저장합니다.
 *
 * 사용법 (터미널에서 프로젝트 루트 폴더에 진입한 뒤):
 *   node scripts/fetch-repos.js
 *
 * 필요사항: Node.js 18 이상 (기본 fetch 내장)
 *
 * 특정 저장소를 상단 고정(pinned)하고 싶다면
 * 이 스크립트 상단의 PINNED_REPOS 배열에 저장소 이름을 추가하세요.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const USERNAME = 'BomB1961';
const OUTPUT = path.join(__dirname, '..', 'data', 'repos.json');

// ▼ 상단에 고정하고 싶은 저장소 이름을 정확히 적어주세요. 대소문자 주의.
// 예) const PINNED_REPOS = ['my-game-project', 'unity-shader-study'];
const PINNED_REPOS = [];

async function main() {
  const url = 'https://api.github.com/users/' + USERNAME + '/repos?per_page=100&sort=updated';
  console.log('Fetching:', url);

  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });

  if (!res.ok) {
    console.error('GitHub API error:', res.status, res.statusText);
    process.exit(1);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error('Unexpected response shape.');
    process.exit(1);
  }

  const simplified = data.map(function (r) {
    return {
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      updated_at: r.updated_at,
      fork: r.fork,
      archived: r.archived,
      pinned: PINNED_REPOS.indexOf(r.name) !== -1
    };
  });

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(simplified, null, 2) + '\n', 'utf8');
  console.log('Saved ' + simplified.length + ' repositories to:');
  console.log('  ' + OUTPUT);
  var pinnedCount = simplified.filter(function (r) { return r.pinned; }).length;
  console.log('Pinned: ' + pinnedCount);
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
