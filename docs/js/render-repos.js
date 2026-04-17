(function () {
  'use strict';

  var container = document.getElementById('repos-list');
  if (!container) return;

  // GitHub language colors (subset commonly used in Unity/game dev)
  var LANG_COLORS = {
    'C#': '#178600',
    'C++': '#f34b7d',
    'C': '#555555',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Python': '#3572A5',
    'HLSL': '#aace60',
    'ShaderLab': '#222c37',
    'GDScript': '#355570',
    'Lua': '#000080'
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '.' + m + '.' + day;
  }

  function renderRepo(r) {
    var color = LANG_COLORS[r.language] || '#8a8680';
    var html = '';
    html += '<article class="repo">';
    html += '<div class="repo__main">';
    html += '<a href="' + escapeHtml(r.html_url) + '" target="_blank" rel="noopener" class="repo__name">' + escapeHtml(r.name);
    if (r.pinned) {
      html += '<span class="repo__pinned">PINNED</span>';
    }
    html += '</a>';
    if (r.description) {
      html += '<p class="repo__desc">' + escapeHtml(r.description) + '</p>';
    }
    html += '</div>';
    html += '<div class="repo__side">';
    if (r.language) {
      html += '<span class="repo__lang"><span class="repo__lang-dot" style="background:' + color + '"></span>' + escapeHtml(r.language) + '</span>';
    }
    if (typeof r.stargazers_count === 'number' && r.stargazers_count > 0) {
      html += '<span>★ ' + r.stargazers_count + '</span>';
    }
    if (r.updated_at) {
      html += '<span>' + formatDate(r.updated_at) + '</span>';
    }
    html += '</div>';
    html += '</article>';
    return html;
  }

  fetch('data/repos.json', { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('repos.json fetch failed');
      return res.json();
    })
    .then(function (list) {
      if (!Array.isArray(list) || list.length === 0) {
        container.innerHTML = '<p class="loading">저장소 데이터가 비어 있습니다. scripts/fetch-repos.js를 실행해서 채워주세요.</p>';
        return;
      }
      // Filter: no forks, no archived, must have description
      var filtered = list.filter(function (r) {
        return !r.fork && !r.archived && r.description && r.description.trim().length > 0;
      });
      // Sort: pinned first, then updated_at desc
      filtered.sort(function (a, b) {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        var at = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        var bt = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return bt - at;
      });
      if (filtered.length === 0) {
        container.innerHTML = '<p class="loading">표시할 저장소가 없습니다. 저장소에 description을 추가하거나 pinned 설정을 확인해 주세요.</p>';
        return;
      }
      container.innerHTML = filtered.map(renderRepo).join('');
    })
    .catch(function () {
      container.innerHTML = '<p class="loading">저장소 데이터를 불러오지 못했습니다.</p>';
    });
})();
