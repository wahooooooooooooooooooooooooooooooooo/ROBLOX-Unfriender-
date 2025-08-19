const delay = 1000; // 1 second

function getid() {
  if (window.Roblox && Roblox.UserId) return Roblox.UserId;

  let link = document.querySelector('a[href*="/users/"][href*="/profile"]');
  if (link) {
    let match = link.href.match(/\/users\/(\d+)\//);
    if (match) return match[1];
  }
  throw new Error("login for it to work");
}

async function gettoken() {
  let res = await fetch("https://auth.roblox.com/v2/logout", {
    method: "POST",
    credentials: "include"
  });
  return res.headers.get("x-csrf-token");
}

async function getfriends(userId) {
  let friends = [];
  let cursor = "";
  do {
    let res = await fetch(`https://friends.roblox.com/v1/users/${userId}/friends?cursor=${cursor}`, { credentials: "include" });
    let data = await res.json();
    friends.push(...data.data.map(f => ({ id: f.id, name: f.name })));
    cursor = data.nextPageCursor;
  } while (cursor);
  return friends;
}

async function removefriend(user, token) {
  let res = await fetch(`https://friends.roblox.com/v1/users/${user.id}/unfriend`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token
    }
  });
  console.log(res.ok ? `removed ${user.name} (${user.id})` : `failed ${user.name} (${user.id}) → ${res.status}`);
}

async function unfriendall() {
  const userId = getid();
  console.log("detected userid:", userId);

  const token = await gettoken();
  console.log("got csrf token:", token);

  const friends = await getfriends(userId);
  console.log(`found ${friends.length} skids`);

  for (let user of friends) {
    await removefriend(user, token);
    await new Promise(r => setTimeout(r, delay));
  }
  console.log("remove skids");
}

unfriendall();
