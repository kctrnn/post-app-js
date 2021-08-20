import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

const fillPostData = (post) => {
  // Set SEO meta tags
  document.title = post.title;
  // document.description = utils.truncateTextlength(post.description, 120);

  // Set hero image
  const imageElement = document.getElementById('postHeroImage');
  if (imageElement) {
    imageElement.style.backgroundImage = `url(${post.imageUrl}), url(${AppConstants.DEFAULT_HERO_IMAGE_URL})`;
  }

  // Set title
  const titleElement = document.getElementById('postDetailTitle');
  if (titleElement) {
    titleElement.textContent = post.title;
  }

  // Set author
  const authorElement = document.getElementById('postDetailAuthor');
  if (authorElement) {
    authorElement.textContent = post.author;
  }

  // Set time span
  const timeSpanElement = document.getElementById('postDetailTimeSpan');
  if (timeSpanElement) {
    const timeString = utils.formatDate(post.updatedAt);
    timeSpanElement.textContent = ` - ${timeString}`;
  }

  // Set description
  const descriptionElement = document.getElementById('postDetailDescription');
  if (descriptionElement) {
    descriptionElement.textContent = post.description;
  }
};

// ---------------------------
// MAIN LOGIC
// ---------------------------
(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');

  if (postId) {
    // Fetch post detail by id
    const post = await postApi.get(postId);

    // Fill post data
    fillPostData(post);

    const loading = document.querySelector('#loadingWrapper');
    if (loading) {
      loading.style.display = 'none';
    }

    // Show view edit link
    const goToEditPageLink = document.getElementById('goToEditPageLink');
    goToEditPageLink.href = `add-edit-post.html?postId=${post.id}`;
    goToEditPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit post';
  }
})();
