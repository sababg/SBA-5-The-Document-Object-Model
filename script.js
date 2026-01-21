const toggleMenuButton = document.getElementById("toggleMenuButton");
const addNewStoryButton = document.getElementById("addNewStoryButton");
const storyFormContainer = document.getElementById("storyFormContainer");
const storyListContainer = document.getElementById("storyListContainer");
const sidebar = document.getElementById("sidebar");
const body = document.getElementById("body");

// Toggle sidebar function
function toggleSidebar() {
  const isOpen = sidebar.classList.toggle("active");
  body.classList.toggle("sidebar-open");

  // Update ARIA attribute
  toggleMenuButton.setAttribute("aria-expanded", isOpen);
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
