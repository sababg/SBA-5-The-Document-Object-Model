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
const storyFormAddButton = document.getElementById("storyFormAddButton");
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

  // Check user is editing or adding
  switch (storyFormAddButton.textContent.trim()) {
    case "Add":
      {
        const story = {
          id: Date.now(),
          title: storyTitleInput.value,
          story: storyTextTextarea.value,
        };
        storyList.push(story);
      }
      break;
    case "Edit":
      {
        const index = +storyTitleInput.dataset.originalId;
        if (index >= 0) {
          storyList[storyList.findIndex((id) => id.id === index)] = {
            id: index,
            title: storyTitleInput.value,
            story: storyTextTextarea.value,
          };
        }
        storyFormAddButton.textContent = "Add";
      }
      break;
    default:
      console.warn("Unexpected button text:", storyFormAddButton.textContent);
      break;
  }
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
  storyList.forEach((element) => {
    createStoryRow(element); // Create story list
  });
};

const createStoryRow = (element) => {
  // Create List
  const list = document.createElement("li");
  list.className = "story-li";

  // Create article
  const listArticle = document.createElement("article");
  listArticle.className = "story-list-article";

  // Create article text container
  const listArticleText = document.createElement("div");
  listArticleText.className = "story-list-article-text";

  // Create article title
  const articleTitle = document.createElement("h2");
  articleTitle.className = "article-title";
  articleTitle.textContent = element.title;

  // Create article story
  const articleText = document.createElement("p");
  articleText.className = "article-text";
  articleText.textContent = element.story;
  // Create menu container
  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";

  const articleMoreOption = document.createElement("img");
  articleMoreOption.className = "article-more-option";
  articleMoreOption.src = "/images/icon/more-vertical.svg";

  // Create dropdown menu
  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu hide";

  // Add menu items
  const editOption = document.createElement("button");
  editOption.className = "menu-item";
  editOption.textContent = "Edit";

  // Edit button click
  editOption.addEventListener("click", () => {
    storyTitleInput.value = element.title;
    storyTextTextarea.value = element.story;
    storyFormAddButton.textContent = "Edit";
    storyTitleInput.dataset.originalId = element.id;
    addNEwStory();
  });

  const deleteOption = document.createElement("button");
  deleteOption.className = "menu-item";
  deleteOption.textContent = "Delete";
  deleteOption.addEventListener("click", () => {
    // removeItem(element);
    console.log("Delete clicked for:", element.title);
    dropdownMenu.classList.add("hide");
  });

  dropdownMenu.appendChild(editOption);
  dropdownMenu.appendChild(deleteOption);

  // Toggle menu on icon click
  articleMoreOption.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling

    // Close all other open menus
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      if (menu !== dropdownMenu) {
        menu.classList.add("hide");
      }
    });
    // Toggle current menu
    dropdownMenu.classList.toggle("hide");
  });
  menuContainer.appendChild(articleMoreOption);
  menuContainer.appendChild(dropdownMenu);
  listArticleText.appendChild(articleTitle);
  listArticleText.appendChild(articleText);
  listArticle.appendChild(listArticleText);
  listArticle.appendChild(menuContainer);
  list.appendChild(listArticle);
  storyUltContainer.appendChild(list);
};

// Close dropdown menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-container")) {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.add("hide");
    });
  }
});

// Close dropdown on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.add("hide");
    });
  }
});

// Delete story

// const removeItem=(element)=>{
// cont
// }
