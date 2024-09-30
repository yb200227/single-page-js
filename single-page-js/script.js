const rootDiv = document.getElementById('root');

let userName='';
let posts=[];

function renderSignUp() {
    rootDiv.innerHTML = `
        <h1 class="text-center mb-4">Welcome to TweetXr</h1>
        <h2 class="text-center mb-4">Sign Up</h2>
        <form id="signupForm" class="mx-auto" style="max-width: 400px;">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" id="name" class="form-control" placeholder="Enter your name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" class="form-control" placeholder="Enter your email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" class="form-control" placeholder="Enter your password">
            </div>
            <button type="button" class="btn btn-primary w-100" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}



function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (nameInput && emailInput && passwordInput) {
        userName = nameInput;
        renderHomePage();
    } else {
        alert('Please fill out all fields');
    }
}



function renderHomePage() {
    rootDiv.innerHTML = `
        <header>
            <nav class="mb-4">
                <button class="btn btn-link text-white" onclick="renderHomePage()">Home</button>
                <button class="btn btn-link text-white" onclick="renderPostsPage()">Posts</button>
            </nav>
        </header>
        <div class="text-center">
            <h1>Welcome, ${userName}!</h1>
            <p>Go to the <strong>Posts</strong> section to create and manage your posts.</p>
        </div>
    `;
}



function renderPostsPage(){
    rootDiv.innerHTML=`
        <header>
            <nav class="mb-4">
                <button class="btn btn-link text-white" onclick="renderHomePage()">Home</button>
                <button class="btn btn-link text-white" onclick="renderPostsPage()">Posts</button>
            </nav>
        </header>
        <h2>Create a Post</h2>
        <textarea id="postContent" class="form-control mb-3" placeholder="What's on your mind?"></textarea>
        <div class="mb-3">
            <label for="imageUpload" class="form-label">Upload Image:</label>
            <input type="file" id="imageUpload" class="form-control">
        </div>
        <button type="button" class="btn btn-success mb-3" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList" class="list-group"></ul>
    `;
    renderPostList();
}



function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;
    const imageInput = document.getElementById('imageUpload').files[0];

    if (postContent || imageInput) {
        let postImage = '';
        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                postImage = e.target.result;
                posts.push({ content: postContent, image: postImage });
                renderPostList();
            };
            reader.readAsDataURL(imageInput);
        } else {
            posts.push({ content: postContent, image: '' });
            renderPostList();
        }
    } else {
        alert('Post content or image is required');
    }
}



function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';
    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'flex-column');
        postItem.innerHTML = `
            <span>${post.content}</span>
            ${post.image ? `<img src="${post.image}" class="post-image" alt="Post Image">` : ''}
            <div class="mt-2">
                <button class="btn btn-warning btn-sm me-2" onclick="handleEditPost(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="handleDeletePost(${index})">Delete</button>
            </div>
        `;
        postListElement.appendChild(postItem);
    });
}



function handleEditPost(index){
    const newContent = prompt("Edit your post:", posts[index].content);
    if (newContent !== null){
        posts[index].content =newContent;
        renderPostList();
    }
}



function handleDeletePost(index){
    posts.splice(index,1)
    renderPostList();
}



renderSignUp();