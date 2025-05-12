//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let allImages = [];
let selectedIndices = [];

const message = document.createElement("h3");
message.id = "h";
message.innerText = "Please click on the identical tiles to verify that you are not a robot.";
document.querySelector("main").prepend(message);

const resultPara = document.createElement("p");
resultPara.id = "para";
document.querySelector("main").appendChild(resultPara);

const resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.innerText = "Reset";
resetBtn.style.display = "none";
document.querySelector("main").appendChild(resetBtn);

const verifyBtn = document.createElement("button");
verifyBtn.id = "verify";
verifyBtn.innerText = "Verify";
verifyBtn.style.display = "none";
document.querySelector("main").appendChild(verifyBtn);

const container = document.createElement("div");
container.className = "flex";
document.querySelector("main").appendChild(container);

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadImages() {
  container.innerHTML = "";
  allImages = [];

  // Pick a random image to duplicate
  const duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  const imagePool = [...imageClasses.filter(cls => cls !== duplicateClass)];
  imagePool.push(duplicateClass, duplicateClass); // Add duplicate

  // Shuffle
  const shuffled = shuffleArray(imagePool);

  // Create image elements
  shuffled.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(index, imgClass, img));
    container.appendChild(img);
    allImages.push({ className: imgClass, element: img });
  });
}

function handleImageClick(index, className, imgElement) {
  if (selectedIndices.length === 2) return;

  if (selectedIndices.includes(index)) return;

  selectedIndices.push(index);
  imgElement.classList.add("selected");
  resetBtn.style.display = "inline-block";

  if (selectedIndices.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  selectedIndices = [];
  allImages.forEach(img => img.element.classList.remove("selected"));
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  resultPara.innerText = "";
});

verifyBtn.addEventListener("click", () => {
  const [first, second] = selectedIndices;
  const firstClass = allImages[first].className;
  const secondClass = allImages[second].className;

  if (firstClass === secondClass) {
    resultPara.innerText = "You are a human. Congratulations!";
  } else {
    resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

loadImages();
