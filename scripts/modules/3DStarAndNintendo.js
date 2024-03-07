import { Application } from "https://cdn.skypack.dev/@splinetool/runtime";

// Get the loading screen element
const loadingScreen = document.getElementById("load");

// Array to hold all the model loading promises
let modelPromises = [];

const starCanvas = document.getElementById('starCanvas');
const starApp = new Application(starCanvas);
// Push the model loading promise into the array
modelPromises.push(starApp.load('https://prod.spline.design/vsOkDyFrbJ8vRWGv/scene.splinecode'));

const starCanvas2 = document.getElementById('starCanvas2');
const starApp2 = new Application(starCanvas2);
// Push the model loading promise into the array
modelPromises.push(starApp2.load("https://prod.spline.design/rveDnJ6N6rlsRlGf/scene.splinecode"));

//map these core IDs, and hide them until the loading state is done. Prevents web scrolling until rendering is complete.
const elements = ['part1', 'part2', 'part3', 'part4', 'customFooter'].map(id => {
  const element = document.getElementById(id);
  element.style.display = 'none';
  return element;
});

// Wait for all models to load
Promise.all(modelPromises).then(() => {
    setTimeout(() => {
    // Hide the loading screen
    loadingScreen.style.display = "none";
    // show elements
    elements.forEach(element => {
      element.style.display = '';
    });

    const Group = starApp2.findObjectByName("star");

    gsap.set(Group.scale, { x: 1, y: 1, z: 1 });
    gsap.set(Group.position, { x: 0, y: 0 });

    let rotateGroup = gsap.to(Group.rotation, {
      y: "+=360", 
      x: 0,
      z: 0,
      duration: 600,  
      repeat: -1,
      ease: "none",
      paused: true 
    });

  // Add a ScrollTrigger for #part2
    gsap.timeline({
      scrollTrigger: {
        trigger: "#part2",
        start: "top 100%",
        end: "bottom bottom",
        scrub: true,
        onEnter: () => rotateGroup.resume(),
        onLeave: () => rotateGroup.pause(),
        onEnterBack: () => rotateGroup.resume(), 
        onLeaveBack: () => rotateGroup.pause() 
      }
    });

    console.log('Models are loading. Will take about 10 seconds.');
  }, 10000);
});




// Disable scrolling on the elements
document.getElementById("part1").style.display = 'none';
document.getElementById("part2").style.display = 'none';
document.getElementById("part3").style.display = 'none';
document.getElementById("part4").style.display = 'none';
document.getElementById("customFooter").style.display = 'none';