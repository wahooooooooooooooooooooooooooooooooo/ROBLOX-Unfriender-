# Roblox Mass Unfriend Tool

A small JavaScript script that will automatically remove every friend from your Roblox account.  
I made this because Roblox doesn’t provide any bulk unfriend option and clicking hundreds (or thousands) of times gets old fast.

---

## How it works

- Detects your own userId automatically (so you don’t have to hardcode it).
- Pulls down your full friend list through Roblox’s friends API.
- Grabs a CSRF token so the requests actually go through.
- Loops through each friend and calls the unfriend endpoint.
- Prints progress in the console so you can see who got removed.

---

## How to use

1. Log into [roblox.com](https://www.roblox.com) on your browser.
2. Press **F12** and go to the **Console** tab.
3. Copy the script from `script.js` into the console and press **Enter**.
4. The script will show how many friends you have, then start removing them one by one.

That’s it. It’ll keep going until your list is empty.
