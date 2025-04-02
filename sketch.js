let imgData;
let imgData2;
let imgData3;
let currentImage = 1; // Start with the first image
let revealedCount = 0;

function preload() {
  imgData = loadImage('image.jpg', img => console.log('Image 1 loaded'), () => console.error('Failed to load image 1'));
  imgData2 = loadImage('image2.jpg', img => console.log('Image 2 loaded'), () => console.error('Failed to load image 2'));
  imgData3 = loadImage('image3.jpg', img => console.log('Image 3 loaded'), () => console.error('Failed to load image 3'));
}

function setup() {
  let newWidth = imgData.width / 5;
  let newHeight = imgData.height / 6;
  imgData.resize(newWidth, newHeight);
  imgData2.resize(newWidth, newHeight);
  imgData3.resize(newWidth, newHeight);

  console.log({newWidth})
  console.log({newHeight})

  createCanvas(newWidth, newHeight);
  background(128);
  noStroke();
  image(imgData, 0, 0);

  console.log('Setup complete');
}

function draw() {
  // No draw needed
}

function mouseDragged() {
  let numSplatter = 10; // Number of splatter particles
  for (let i = 0; i < numSplatter; i++) {
    let brushSize = random(5, 20); // Random size for splatter particles
    let offsetX = random(-brushSize, brushSize);
    let offsetY = random(-brushSize, brushSize);
    let x = constrain(mouseX + offsetX, 0, width - 1);
    let y = constrain(mouseY + offsetY, 0, height - 1);

    // Draw the current image where the mouse is dragged with splatter effect
    if (currentImage === 1) {
      copy(imgData2, x, y, brushSize, brushSize, x, y, brushSize, brushSize);
    } else if (currentImage === 2) {
      copy(imgData3, x, y, brushSize, brushSize, x, y, brushSize, brushSize);
    } else {
      copy(imgData, x, y, brushSize, brushSize, x, y, brushSize, brushSize);
    }

    revealedCount++;
  }

  checkSwitch();
}

function checkSwitch() {
  let totalPixels = 50000;

  console.log(`Revealed pixels: ${revealedCount} / ${totalPixels}`);

  if (revealedCount >= totalPixels) {
    // Switch images
    if (currentImage === 1) {
      currentImage = 2;
      console.log("Switched to second image");
    } else if (currentImage === 2) {
      currentImage = 3;
      console.log("Switched to third image");
    } else {
      currentImage = 1;
      console.log("Switched to first image");
    }

    revealedCount = 0; // Reset revealed count
    background(128); // Clear the canvas
    // Draw the new image
    if (currentImage === 1) {
      image(imgData, 0, 0);
    } else if (currentImage === 2) {
      image(imgData2, 0, 0);
    } else {
      image(imgData3, 0, 0);
    }
  }
}

