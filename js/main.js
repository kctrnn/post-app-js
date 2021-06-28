import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import queryString from './lib/queryString.js';
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

const getPageList = (pagination) => {
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  // Return -1 if invalid page detected
  if (_page < 1 || _page > totalPages) return [0, -1, -1, -1, 0];

  let prevPage = -1;

  // Calculate prev page
  if (_page === 1) prevPage = 1;
  else if (_page === totalPages) prevPage = _page - 2 > 0 ? _page - 2 : 1;
  else prevPage = _page - 1;

  const currPage = prevPage + 1 > totalPages ? -1 : prevPage + 1;
  const nextPage = prevPage + 2 > totalPages ? -1 : prevPage + 2;

  return [
    _page === 1 ? 0 : _page - 1,
    prevPage,
    currPage,
    nextPage,
    _page === totalPages ? 0 : _page + 1,
  ];
};

const renderPostsPagination = (pagination) => {
  const postPagination = document.getElementById('postPagination');
  if (postPagination) {
    const pageList = getPageList(pagination);

    const { _page, _limit } = pagination;

    const pageItems = postPagination.querySelectorAll('.page-item');

    if (pageItems.length === 5) {
      pageItems.forEach((pageItem, index) => {
        switch (pageList[index]) {
          case -1:
            pageItem.setAttribute('hidden', '');
            break;

          case 0:
            pageItem.classList.add('disabled');
            break;
          default: {
            const pageLink = pageItem.querySelector('.page-link');

            if (pageLink) {
              pageLink.href =
                pageList[index] !== 1
                  ? `?_page=${pageList[index]}&_limit=${_limit}`
                  : '/';

              if (index > 0 && index < 4) {
                pageLink.textContent = pageList[index];
              }
            }

            if (index > 0 && index < 4 && pageList[index] === _page) {
              pageItem.classList.add('active');
            }
          }
        }
      });
    }
  }
};

// ----------------
// MAIN
// ----------------
const init = async () => {
  try {
    let search = location.search;
    // Remove beginning question mark
    search = search ? search.substring(1) : '';

    const { _page, _limit } = queryString.parse(search);

    const params = {
      _page: _page || AppConstants.DEFAULT_PAGE,
      _limit: _limit || AppConstants.DEFAULT_LIMIT,
      _sort: 'updatedAt',
      _order: 'desc',
    };

    const response = await postApi.getAll(params);

    if (response) {
      const { data: posts, pagination } = response;

      renderPostList(posts);
      renderPostsPagination(pagination);
    }
  } catch (error) {
    console.log('Failed to fetch list of posts: ', error);
  }
};

init();
