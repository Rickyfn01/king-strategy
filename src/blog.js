document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('insights-grid');
  if (!grid) return;

  // Fetch data.json from public folder (real-time, not bundled)
  let MSO_LOGS = [];
  try {
    const res = await fetch('/data.json');
    MSO_LOGS = await res.json();
  } catch (err) {
    grid.innerHTML = '<p class="text-gray-400 text-center col-span-2">Gagal memuat artikel.</p>';
    return;
  }

  let html = '';
  let schemas = [];

  MSO_LOGS.forEach((log, index) => {
    const badgeClass = log.category === 'Case Study' ? 'badge-casestudy' : 'badge-algorithm';
    
    html += `
      <article class="insight-card bg-king-gray rounded-2xl p-8 border border-white/5 flex flex-col h-full" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <meta itemprop="position" content="${index + 1}" />
        <div itemprop="item" itemscope itemtype="https://schema.org/Article">
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${badgeClass}" itemprop="articleSection">${log.category}</span>
            <time datetime="${log.date}" class="text-xs text-gray-500 font-mono" itemprop="datePublished">${log.date}</time>
          </div>
          <h2 class="text-2xl font-serif font-bold text-white mb-3" itemprop="headline">
            <a href="${log.link || `/article.html?id=${log.id}`}" class="hover:text-king-gold transition-colors" itemprop="url">${log.title}</a>
          </h2>
          <p class="text-gray-400 text-sm leading-relaxed flex-grow mb-6" itemprop="description">${log.snippet || ''}</p>
          <div class="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            <a href="${log.link || `/article.html?id=${log.id}`}" class="text-sm font-semibold text-king-gold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
              Baca Selengkapnya <i data-feather="arrow-right" class="w-4 h-4"></i>
            </a>
            <span class="text-xs text-gray-600 font-mono">${log.id}</span>
          </div>
          <meta itemprop="author" content="KING Strategy" />
          <meta itemprop="publisher" content="KING Strategy" />
        </div>
      </article>
    `;

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": log.title,
      "description": log.snippet,
      "datePublished": log.date,
      "author": {
        "@type": "Organization",
        "name": "KING Strategy"
      },
      "publisher": {
        "@type": "Organization",
        "name": "KING Strategy"
      },
      "url": "https://king-strategy.vercel.app" + log.link
    });
  });

  grid.innerHTML = html;
  if (window.feather) window.feather.replace();

  // Inject JSON-LD Schema
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.text = JSON.stringify(schemas);
  document.head.appendChild(scriptTag);
});
