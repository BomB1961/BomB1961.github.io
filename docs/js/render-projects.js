(function () {
  'use strict';

  var container = document.getElementById('projects-list');
  if (!container) return;

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildMetaLine(p) {
    var parts = [];
    if (p.engine) parts.push(p.engine);
    if (Array.isArray(p.platform) && p.platform.length) parts.push(p.platform.join(' · '));
    if (p.genre) parts.push(p.genre);
    if (p.period) parts.push(p.period);
    if (p.role) parts.push(p.role);
    return parts.map(escapeHtml).join(' · ');
  }

  function buildLinks(p) {
    var links = [];
    if (p.playable) links.push('<a href="' + escapeHtml(p.playable) + '" target="_blank" rel="noopener">Play</a>');
    if (p.video) links.push('<a href="' + escapeHtml(p.video) + '" target="_blank" rel="noopener">Video</a>');
    if (p.github) links.push('<a href="' + escapeHtml(p.github) + '" target="_blank" rel="noopener">GitHub</a>');
    if (p.stores && p.stores.google_play) links.push('<a href="' + escapeHtml(p.stores.google_play) + '" target="_blank" rel="noopener">Google Play</a>');
    if (p.stores && p.stores.app_store) links.push('<a href="' + escapeHtml(p.stores.app_store) + '" target="_blank" rel="noopener">App Store</a>');
    return links.join('');
  }

  function buildThumb(p) {
    var alt = escapeHtml((p.title || '') + ' 썸네일');
    if (p.thumbnail) {
      var inner = '<img src="' + escapeHtml(p.thumbnail) + '" alt="' + alt + '" loading="lazy" />';
      if (p.video) {
        return '<a href="' + escapeHtml(p.video) + '" target="_blank" rel="noopener" class="project__thumb">' + inner + '</a>';
      }
      return '<div class="project__thumb">' + inner + '</div>';
    }
    return '<div class="project__thumb project__thumb--empty">NO IMAGE</div>';
  }

  function renderProject(p) {
    var contribs = Array.isArray(p.contributions) ? p.contributions : [];
    var techs = Array.isArray(p.tech) ? p.tech : [];

    var html = '';
    html += '<article class="project">';
    html += buildThumb(p);
    html += '<div class="project__body">';
    html += '<h3 class="project__title">' + escapeHtml(p.title || '') + '</h3>';
    html += '<p class="project__meta">' + buildMetaLine(p) + '</p>';
    if (p.summary) {
      html += '<p class="project__summary">' + escapeHtml(p.summary) + '</p>';
    }
    if (contribs.length) {
      html += '<ul class="project__contributions">';
      contribs.forEach(function (c) {
        html += '<li>' + escapeHtml(c) + '</li>';
      });
      html += '</ul>';
    }
    if (techs.length) {
      html += '<ul class="project__tech">';
      techs.forEach(function (t) {
        html += '<li>' + escapeHtml(t) + '</li>';
      });
      html += '</ul>';
    }
    var linksHtml = buildLinks(p);
    if (linksHtml) {
      html += '<div class="project__links">' + linksHtml + '</div>';
    }
    html += '</div>';
    html += '</article>';
    return html;
  }

  fetch('data/projects.json', { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('projects.json fetch failed');
      return res.json();
    })
    .then(function (list) {
      if (!Array.isArray(list) || list.length === 0) {
        container.innerHTML = '<p class="loading">등록된 프로젝트가 없습니다.</p>';
        return;
      }
      container.innerHTML = list.map(renderProject).join('');
    })
    .catch(function () {
      container.innerHTML = '<p class="loading">프로젝트 데이터를 불러오지 못했습니다.</p>';
    });
})();
