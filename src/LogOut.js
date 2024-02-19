

export function LogOut(){                             // Step: 2
    localStorage.removeItem("studentToken");
    localStorage.removeItem("id");
    localStorage.removeItem("roleId");
    alert("👋😃 Good Bye")
    window.location.href="/"
}