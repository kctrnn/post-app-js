import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

// RENDER POSTS
const renderPostItem = (post) => {
  const postItemTemplate = document.getElementById('postItemTemplate');
  const postItemElement = postItemTemplate.content.cloneNode(true);

  // Set title
  const titleElement = postItemElement.getElementById('postItemTitle');
  if (titleElement) {
    titleElement.textContent = post.title;
  }

  // Set description
  const descriptionElement = postItemElement.getElementById('postItemDesc');
  if (descriptionElement) {
    descriptionElement.textContent = post.description;
  }

  // Set image
  const imageElement = postItemElement.getElementById('postItemImg');
  if (imageElement) {
    imageElement.src = post.imageUrl;
  }

  // Set author
  const authorElement = postItemElement.getElementById('postItemAuthor');
  if (authorElement) {
    authorElement.textContent = post.author;
  }

  // Set time
  const timeElement = postItemElement.getElementById('postItemTime');
  if (timeElement) {
    const timeString = utils.formatDate(post.createdAt);
    timeElement.textContent = ` - ${timeString}`;
  }

  return postItemElement;
};

const renderPostList = (posts) => {
  const postsElement = document.querySelector('.posts-list');

  if (postsElement) {
    // Clean up current list of posts displayed on UI
    utils.resetElementNode(postsElement);

    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        const postItemElement = renderPostItem(post);

        if (postItemElement) {
          postsElement.appendChild(postItemElement);
        }
      });
    }
  } else {
    console.log("Ooops! Can't find postsList item");
  }
};

// ----------------
// MAIN
// ----------------
const init = async () => {
  try {
    const response = await postApi.getAll();
    if (response) {
      const { data: posts } = response;
      renderPostList(posts);
    }
  } catch (error) {
    console.log('Failed to fetch list of posts: ', error);
  }
};

init();
