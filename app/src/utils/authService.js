import moment from "moment";

export function setLocalStorage(res) {
  const expiresAt = moment().add(Number.parseInt(res.data.expiresIn), "days");

  localStorage.setItem("id_token", res.data.token);
  localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
}

export function logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
}

export function isLoggedIn() {
  return moment().isBefore(this.getExpiration(), "second");
}

export function isLoggedOut() {
  return !this.isLoggedIn();
}

export function getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  if (expiration) {
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  } else {
    return moment();
  }
}
