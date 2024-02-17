

export function LogOut(){                             // Step: 2
    localStorage.removeItem("studentToken");
    window.location.href="/"
}