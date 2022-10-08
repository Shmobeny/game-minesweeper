export default function resizeWatcher(appSelector) {
  let throttlerBody = false;

  const observer = new ResizeObserver(entries => {
    if (throttlerBody) clearTimeout(throttlerBody);
    
    throttlerBody = setTimeout(() => {
      document.body.style.minHeight = window.innerHeight + "px";
      appSelector.style.minHeight = document.body.offsetWidth < 530 ? document.documentElement.clientHeight + "px" : "auto";
      resize(appSelector);
      throttlerBody = false;
    }, 100);
    
  });

  return observer;
  
}

function resize(appSelector) {
  let initialScale = 1;
  appSelector.classList.remove("App--animated-resize");
  
  scaling(appSelector.getBoundingClientRect());
  
  appSelector.style.transform = "scale(1)";
  
  setTimeout(() => {
    appSelector.classList.add("App--animated-resize");
    appSelector.style.transform = `scale(${initialScale})`;
  }, 100);
  

  function scaling(coords) {
    initialScale = initialScale + 0.1;
    appSelector.style.transform = `scale(${initialScale})`;

    let newCoords = appSelector.getBoundingClientRect();
    
    if (newCoords.y < 20 || newCoords.x < 20) {
      initialScale = initialScale - 0.1;
      appSelector.style.transform = `scale(${initialScale})`;
      return;
    }

    if (coords.y > 20 && coords.x > 20) scaling(newCoords);
  }
}