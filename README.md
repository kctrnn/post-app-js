# POST APP 😎

## 🍔 Overview

A project I build with vanilla javascript.

This website has 3 pages

- Home page: `index.html`
- Add edit post: `add-edit-post.html`
- Post detail: `post-detail.html`

### 🏢 Built with

- [axios](https://github.com/axios/axios): Working with API
- [lightbox2](https://lokeshdhakar.com/projects/lightbox2/): Viewing image

## Features

### 🏠 Home page

#### Render list of posts

- Research `Bootstrap Carousel` and add to home page.
  - Include 3 slides
  - Each slide has title and description.
  - Auto move the next slide.
- Fetch list of posts and render to UI.
- Sort list of post to show the latest post first.
- `ADVANCED`: Support pagination to be able to to fetch posts by page and limit the number of posts per page.

#### Handle event on each post item

- `Click`: Go to detail page and show detail of clicked post.
- `Edit button click`: Go to edit page and populate detail of clicked post to form.
- `Remove button click`: Show confirmation to remove? If yes, remove it. Otherwise, do nothing :P

### ➕ Add/Edit post page

- Add form validation
  - Require `title` field
  - Require `author` field

`` ADD MODE (if `postId` query param doesn't exist) ``

- Handle form submit
  - Show error if validation is failed. Stop form submit
  - Add new post with submitted values: `title`, `author`, `description` and `imageUrl`
  - If add successfully, show an alert with message `Save post successfully` and redirect to Edit page of the new post
  - If failed, show an alert with error message

`` EDIT MODE (if `postId` query param exists) ``

- Get post detail and set initial value for form
- Handle form submit
  - Do nothing if user doesn't change anything
  - Show error if validation is failed. Stop form submit
  - Update existing post with field that has changes. Don't include unchanged properties inside payload
  - If update successfully, show an alert with message `Save post successfully`
  - If failed, show an alert with error message

### 🚧 Post detail page

- Get post detail
- Update corresponding DOM: `title`, `description`, `author`, `createdAt` and `imageUrl`
- Integrate with `Lightbox` to view image when click on image

## 🚀 Post API Guide

- API_URL: https://json-server-kctrnn.herokuapp.com/api

### Get a list of posts

```sh
GET /posts
```

Supported query params:

- `_limit`: Limit the number of items per page.
- `_page`: Current page.
- `_sort`: Indicate which field should be sorted on
- `_order`: Indicate sort direction.

### To get a post detail

```sh
GET /posts/:postId
```

### To add a new post

```sh
POST /posts
```

Sample payload:

```js
{
  title: 'Some cool title',
  author: 'Po Nguyen',
  description: 'Awesome post',
  imageUrl: 'https://picsum.photos/id/580/1368/400',
}
```

### To update a post

```sh
PATCH /posts/:postId
```

Please ONLY include changes to your payload:

```js
{
  title: 'My new title',
}
```

### To remove a post

```sh
DELETE /posts/:postId
```

## Contact

- GitHub [@kctrnn](https://github.com/kctrnn)
- Twitter [@kctrnn](https://twitter.com/kctrnn)
