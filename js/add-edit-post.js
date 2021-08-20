import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

const inputTitle = document.querySelector('#inputTitle');
const inputAuthor = document.querySelector('#inputAuthor');
const inputDescription = document.querySelector('#inputDescription');
const postHeroImg = document.querySelector('#postHeroImg');

const handleChangeImageClick = () => {
  // random a number: 1 -> 1000
  const randomId = Math.trunc(Math.random() * 1000) + 1;

  if (postHeroImg) {
    postHeroImg.style.backgroundImage = `url(https://picsum.photos/id/${randomId}/1368/400)`;
  }
};

const setPostValuesForm = (post) => {
  inputTitle.value = post.title;
  inputAuthor.value = post.author;
  inputDescription.value = post.description;
  postHeroImg.style.backgroundImage = `url(${post.imageUrl}), url(${AppConstants.DEFAULT_HERO_IMAGE_URL})`;
};

const handleSubmit = async (postId) => {
  const formValues = {
    title: inputTitle.value,
    author: inputAuthor.value,
    description: inputDescription.value,
    imageUrl: utils.getBackgroundImageByElementId('postHeroImg'),
  };

  try {
    const payload = {
      id: postId,
      ...formValues,
    };

    if (postId) {
      await postApi.updatePost(payload);
      alert('Save post successfully 🙌🙌');
    } else {
      await postApi.addPost(payload);

      alert('Add new post successfully 🙌🙌');

      // Go to home page
      window.location = `index.html`;
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');

  const isAddMode = !postId;

  if (isAddMode) {
    handleChangeImageClick();
  } else {
    // ------------Edit mode

    // Fill values into form
    const currentPost = await postApi.get(postId);
    setPostValuesForm(currentPost);

    // Show view detail link
    const goToDetailPageLink = document.getElementById('goToDetailPageLink');
    goToDetailPageLink.href = `post-detail.html?postId=${currentPost.id}`;
    goToDetailPageLink.innerHTML =
      '<i class="fas fa-eye mr-1"></i> View post detail';
  }

  // Add event for button: change post image
  const postChangeImageButton = document.getElementById('postChangeImage');
  if (postChangeImageButton) {
    postChangeImageButton.addEventListener('click', handleChangeImageClick);
  }

  // Handle submit post form
  const postForm = document.querySelector('#postForm');
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSubmit(postId);
    });
  }
})();
