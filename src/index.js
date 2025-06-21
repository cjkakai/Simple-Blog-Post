const BASE_URL = "http://localhost:3000";

function displayPosts() {
  fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(posts => {
        console.log(posts)
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";

      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.dataset.id = post.id;

        div.addEventListener("click", () => handlePostClick(post.id));

        const img = document.createElement("img");
        img.src = post.image;
        img.alt = post.title;
        img.width = 100;

        postList.appendChild(div);
        postList.appendChild(img);
      });
    });
}
//handle click to show post detail
function handlePostClick(postId) {
  fetch(`${BASE_URL}/posts/${postId}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <img src="${post.image}" alt="${post.title}" width="200" />
        <p>${post.content}</p>
      `;
    });
}

// Add listener for new post form
function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      author: form.author.value,
      content: form.content.value,
      image: form.image.value || "https://via.placeholder.com/150"
    };

    addPostToDOM(newPost);
    form.reset();
  });
}

// Add a new post to the DOM only
function addPostToDOM(post) {
  const postList = document.getElementById("post-list");
  const div = document.createElement("div");
  div.textContent = post.title;

  const img = document.createElement("img");
  img.src = post.image;
  img.alt = post.title;
  img.width = 100;

  div.addEventListener("click", () => {
    document.getElementById("post-detail").innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Author:</strong> ${post.author}</p>
      <img src="${post.image}" alt="${post.title}" width="200" />
      <p>${post.content}</p>
    `;
  });

  postList.appendChild(div);
  postList.appendChild(img);
}

// 5. Main entry point
function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);

