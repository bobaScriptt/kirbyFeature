import { Application } from "https://cdn.skypack.dev/@splinetool/runtime";

// Get the loading screen element
const loadingScreen = document.getElementById("load");

// Array to hold all the model loading promises
let modelPromises = [];

const kirbyTextCanvas = document.getElementById('kirbyTextCanvas');
const kirbyTextApp = new Application(kirbyTextCanvas);
// Push the model loading promise into the array
modelPromises.push(kirbyTextApp.load('https://prod.spline.design/eYLgTQKZtcEOjReL/scene.splinecode'));

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
      // Enable scrolling on the elements
      elements.forEach(element => {
         element.style.display = '';
       });

      // room for scroll triggers/etc go here.
      console.log('Models are loading. Will take about 10 seconds.');
   }, 10000);
});





