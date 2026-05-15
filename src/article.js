document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');

  const loadingState = document.getElementById('loading');
  const errorState = document.getElementById('error-state');
  const contentContainer = document.getElementById('article-content');

  if (!articleId) {
    showError();
    return;
  }

  // Fetch data.json from public folder (real-time, not bundled)
  let MSO_LOGS = [];
  try {
    const res = await fetch('/data.json');
    MSO_LOGS = await res.json();
  } catch (err) {
    showError();
    return;
  }

  const articleData = MSO_LOGS.find(log => log.id === articleId);

  if (!articleData) {
    showError();
    return;
  }

  // Populate data
  document.getElementById('article-category').textContent = articleData.category;
  document.getElementById('article-date').textContent = articleData.date;
  document.getElementById('article-title').textContent = articleData.title;
  document.getElementById('article-snippet').textContent = articleData.snippet;
  
  // Set content. Fallback to snippet if content is somehow empty
  document.getElementById('article-body').innerHTML = articleData.content || `<p>${articleData.snippet}</p>`;

  // Update meta tags for SEO (Open Graph)
  document.title = `${articleData.title} | KING Strategy`;
  
  // Hide loading, show content
  loadingState.classList.add('hidden');
  contentContainer.classList.remove('hidden');

  // Inject JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.snippet,
    "datePublished": articleData.date,
    "author": {
      "@type": "Organization",
      "name": "KING Strategy"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KING Strategy"
    },
    "url": window.location.href
  };

  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.text = JSON.stringify(schema);
  document.head.appendChild(scriptTag);

  function showError() {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
  }
});
