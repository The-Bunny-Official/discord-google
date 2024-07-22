const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = ""
const API_ENDPOINT = 'https://discord.com/api/v10';
const POST_URL = "https://discord.com/api/webhooks/";

function getAuthorizationUrl() {
  return `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=identify&response_type=code`;
}

function sendToHook(userinfo){
  let field1 = {
    "name": "User ID",
    "value": userinfo.id,
    "inline": false
  };
  let field2 = {
    "name": "Username",
    "value": userinfo.username,
    "inline": false
  };

  const options = {
      "method": "post",
      "headers": {
          "Content-Type": "application/json",
      },
      "payload": JSON.stringify({
        "embeds": [{
          "title": "A user just authorized the staff application.",
          "fields": [field1, field2],
          "footer": {
                    "text": "Expect an application!"
                },
          "timestamp": new Date().toISOString()
        }]
      })
  };
  
  UrlFetchApp.fetch(POST_URL, options);
}

function doGet(e) {
  if (e.parameter.code) {
    const token = getAccessToken(e.parameter.code);

    const userInfo = getUserInfo(token);
    
    sendToHook(userInfo);

    return HtmlService.createHtmlOutputFromFile('FormPage')
      .setTitle('Fill the Form')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } else {
    const authUrl = getAuthorizationUrl();
    
    return HtmlService.createHtmlOutputFromFile("redirect")
    .setTitle('Authorize')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .append(`<script>window.authUrl = ${JSON.stringify(authUrl)}</script>`);
  }
}

function getAccessToken(code) {
  const payload = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI
  };

  const options = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: Object.entries(payload).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&'),
    headers: {
      Authorization: 'Basic ' + Utilities.base64Encode(`${CLIENT_ID}:${CLIENT_SECRET}`)
    }
  };

  const response = UrlFetchApp.fetch(`${API_ENDPOINT}/oauth2/token`, options);
  const token = JSON.parse(response.getContentText());
  return token.access_token;
}

function getUserInfo(accessToken) {
  const response = UrlFetchApp.fetch(`${API_ENDPOINT}/users/@me`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  console.log(JSON.parse(response.getContentText()))
  return JSON.parse(response.getContentText());
}
