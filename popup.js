document.addEventListener("DOMContentLoaded", async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: extractProductInfo,
    },
    (result) => {
      if (chrome.runtime.lastError || !result[0]) {
        console.error("Failed to execute script or retrieve result");
        return;
      }

      const productInfo = result[0].result;
      if (productInfo) {
        document.getElementById("product-name").innerText =
          productInfo.name || "N/A";
        document.getElementById("product-price").innerText =
          productInfo.price || "N/A";
        document.getElementById("product-image").src =
          productInfo.imageUrl || "";
      }
    }
  );
});

function extractProductInfo() {
  const name = document.querySelector("h1.product-name")?.innerText;
  const price = document.querySelector("span.product-price")?.innerText;
  const imageUrl = document.querySelector("img.product-image")?.src;

  return {
    name,
    price,
    imageUrl,
  };
}
