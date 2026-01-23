const toggleMenuButton = document.getElementById("toggleMenuButton");
const addNewStoryButton = document.getElementById("addNewStoryButton");
const storyFormContainer = document.getElementById("storyFormContainer");
const storyListContainer = document.getElementById("storyListContainer");
const storyTitleInput = document.getElementById("storyTitle");
const storyTextTextarea = document.getElementById("storyText");
const storyTitleError = document.getElementById("storyTitleError");
const storyTextError = document.getElementById("storyTextError");
const storyForm = document.getElementById("storyForm");
const storyUltContainer = document.getElementById("storyUltContainer");
const storyFormCancelButton = document.getElementById("storyFormCancelButton");
const sidebar = document.getElementById("sidebar");
const body = document.getElementById("body");

let storyList = [];

// Toggle sidebar function
function toggleSidebar() {
  sidebar.classList.toggle("active");
  body.classList.toggle("sidebar-open");
}

const addNEwStory = () => {
  const isFormHidden = storyFormContainer.classList.contains("hide");

  storyFormContainer.classList.toggle("show", isFormHidden);
  storyFormContainer.classList.toggle("hide", !isFormHidden);

  storyListContainer.classList.toggle("show", !isFormHidden);
  storyListContainer.classList.toggle("hide", isFormHidden);
};

// Event listener for new story button
addNewStoryButton.addEventListener("click", addNEwStory);

// Event listener for new story form cancel button
storyFormCancelButton.addEventListener("click", addNEwStory);

// Event listener for toggle button
toggleMenuButton.addEventListener("click", toggleSidebar);

// Close sidebar when clicking overlay
body.addEventListener("click", (e) => {
  // Check if sidebar is open and click is on the overlay (body:: before)
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    !toggleMenuButton.contains(e.target)
  ) {
    toggleSidebar();
  }
});

// Close sidebar on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("active")) {
    toggleSidebar();
  }
});

// Optional: Close sidebar when clicking a link
const sidebarLinks = sidebar.querySelectorAll("a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) {
      toggleSidebar();
    }
  });
});

//Real-time validation for title input
const validateStoryTitle = (input) => {
  input.classList.add("error");

  if (input.validity.valueMissing) {
    storyTitleError.textContent = "This field is required.";
    return false;
  } else if (input.value.length < 3) {
    storyTitleError.textContent = "Title must be at least 3 characters long.";
    return false;
  } else {
    storyTitleError.textContent = "";
    input.classList.remove("error");
    return true;
  }
};

storyTitleInput.addEventListener("input", (e) => {
  const input = e.target;
  validateStoryTitle(input);
});

//Real-time validation for title input
const validateStoryText = (input) => {
  input.classList.add("error");

  if (input.validity.valueMissing) {
    storyTextError.textContent = "This field is required.";
    return false;
  } else if (input.value.length < 3) {
    storyTextError.textContent = "Title must be at least 3 characters long.";
    return false;
  } else if (input.value.length > 1000) {
    storyTextError.textContent = "Title must be maximum 1000 characters long.";
    return false;
  } else {
    storyTextError.textContent = "";
    input.classList.remove("error");
    return true;
  }
};

storyTextTextarea.addEventListener("input", (e) => {
  const input = e.target;
  validateStoryText(input);
});

//Final validation
const finalValidation = [
  {
    name: storyTitleInput,
    isValid: () => validateStoryTitle(storyTitleInput), // use the  document.getElementById
  },
  // **********or we can use The document.getElementById, Means we can use storyTitleInput instead of storyForm.elements.storyTitleInput**************

  {
    name: storyTextTextarea,
    isValid: () => validateStoryText(storyTextTextarea),
  },
];

//Form submission
storyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (finalValidation.find((item) => !item.isValid())) {
    finalValidation.find((item) => !item.isValid()).storyTitleInput.focus();
    return;
  }
  const story = {
    title: storyTitleInput.value,
    story: storyTextTextarea.value,
  };
  storyList.push(story);
  renderList(storyList);
  addNEwStory();
  // try {
  //   localStorage.setItem("username", username.value);
  // } catch (error) {
  //   console.warn("localStorage unavailable:", error);
  // }
  storyForm.reset();
});

const renderList = (storyList) => {
  storyUltContainer.textContent = "";
  console.log("storyList", storyList);
  storyList.forEach((element) => {
    createTableRow(element); // Create table row
  });
};

const createTableRow = (element) => {
  const list = document.createElement("li");
  list.className = "story-li";
  const listArticle = document.createElement("article");
  listArticle.className = "story-list-article";
  const articleTitle = document.createElement("h2");
  articleTitle.className = "article-title";
  articleTitle.textContent = element.title;
  const articleText = document.createElement("p");
  articleText.className = "article-text";
  articleText.textContent = element.story;
  listArticle.appendChild(articleTitle);
  listArticle.appendChild(articleText);
  list.appendChild(listArticle);
  storyUltContainer.appendChild(list);
};
