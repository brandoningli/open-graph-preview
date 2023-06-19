let tab;

function downloadPreview() {
  const ogContainer = document.getElementById('og-container');
  let canvas = document.createElement('canvas');
  canvas.width = ogContainer.offsetWidth;
  canvas.height = ogContainer.offsetHeight;
  html2canvas(ogContainer, { allowTaint: true, useCORS: true }).then(canvas => {
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `open-graph-preview.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  })

};

function handleMessage(request, sender, sendResponse, error = false) {
  document.getElementById("og_image").classList.remove('loading');
  const domain = new URL(tab.url)?.hostname?.replace(/^www\./, '');
  if (!error && request.og_image !== "") {
    document.getElementById("og_image").src = request.og_image;
  } else {
    document.getElementById("og_image").src = 'preview-image.jpg';
  }

  if (!error && domain) {
    document.getElementById("og_url").textContent = domain;
  } else {
    document.getElementById("og_url").textContent = "Error";
  }

  if (!error && request.og_title !== "") {
    document.getElementById("og_title").textContent = request.og_title;
  } else {
    document.getElementById("og_title").textContent = domain || "Error";
  }

  if (!error && request.og_description !== "") {
    document.getElementById("og_description").textContent = request.og_description;
  } else {
    document.getElementById("og_description").textContent = "";
  }
}

function reportExecuteScriptError(error) {
  console.error(`Failed to retrieve the Open Graph information : ${error.message}`);
  handleMessage({}, {}, {}, true)
}

function getOg(tab) {
  browser.tabs.sendMessage(tab.id, {
    command: "getOg"
  }).catch(reportExecuteScriptError);
}

function reportError(error) {
  console.error(`Could not retrieve og tags: ${error}`);
}

browser.runtime.onMessage.addListener(handleMessage);

browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => { tab = tabs[0] }).then(() =>
  browser.scripting.executeScript({ target: { tabId: tab.id }, files: ["/browser-polyfill.min.js"] })).then(() =>
    browser.scripting.executeScript({ target: { tabId: tab.id }, files: ["/content_scripts/opengraph-preview.js"] })).then(() =>
      getOg(tab)).catch(reportError);


document.querySelector('#download-button').onclick = downloadPreview;
document.querySelector('#contain-button').onclick = () => document.querySelector('#og_image').classList.toggle('contain')
