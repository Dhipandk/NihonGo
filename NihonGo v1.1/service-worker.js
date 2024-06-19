chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.action.onClicked.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      return;
    }
    // Use the token to authenticate with your backend
    fetch('https://nihon-go-five.vercel.app/api/auth', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('User logged in:', data);
      // Handle the logged-in user
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
  });
});
