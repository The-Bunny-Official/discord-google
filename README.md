# discord-google
Use Discord OAuth2 to authorize access to a Google Form. Due to restrictions, this is very rough and should probably only be used if you have your own domain.
Runs on Google Script. My use case is to know who is filling out your form. Since you can't make hidden fields in a form and then autofill it in the URL, I send a message to the webhook announcing that a user has used the authorization. A different script is used to send the form data to that same channel.

# How to use
Basically just fill in the blanks at the top of Code.gs and put your form embed url in FormPage.html.
Make sure POST_URL is your channel's webhook. You can also change the embed however you want and to grab whatever information you want. Using the `getUserInfo` function will give you their basic user information.

```json
{
  id: '977998058031833188',
  username: 'the._.bunny',
  avatar: '92c213ccc2f284569fed25e0d87a2a15',
  discriminator: '0',
  public_flags: 4194432,
  flags: 4194432,
  banner: null,
  accent_color: 65282,
  global_name: 'The Bunny',
  avatar_decoration_data: null,
  banner_color: '#00ff02',
  clan: null,
  mfa_enabled: true,
  locale: 'en-US',
  premium_type: 0
}
```
