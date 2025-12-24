// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDCD-PcGnAkooKggeBO1QqogXVGamWGLzQ",
    authDomain: "team-prospect.firebaseapp.com",
    projectId: "team-prospect",
    storageBucket: "team-prospect.firebasestorage.app",
    messagingSenderId: "404693088242",
    appId: "1:404693088242:web:4c7e9896dbd1057138dd6b",
    measurementId: "G-EP679BDDR7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// ================= LOGIN LOGIC =================

let selectedRole = "student";

// Role selection
document.querySelectorAll(".role-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Role button clicked:", btn.dataset.role); // ✅ Debug
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRole = btn.dataset.role;
  });
});

// Check if form exists
const loginForm = document.getElementById("loginForm");
console.log("Form found:", loginForm); // ✅ Check if form exists

if (loginForm) {
  // Login submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // ✅ Check if submit works

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email); // ✅ Check values
    console.log("Password length:", password.length); // ✅ Don't log actual password
    console.log("Selected role:", selectedRole);

    // Add loading feedback
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;

    console.log("Attempting Firebase login..."); // ✅ Before Firebase call

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login successful!", userCredential.user); // ✅ Success
        
        // Redirect based on role
        if (selectedRole === "student") {
          console.log("Redirecting to student page...");
          window.location.href = "https://google.com";
        } else if (selectedRole === "faculty") {
          console.log("Redirecting to faculty page...");
          window.location.href = "faculty.html";
        } else {
          console.log("Redirecting to admin page...");
          window.location.href = "admin.html";
        }
      })
      .catch((error) => {
        console.error("Login error:", error); // ✅ Full error
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // Reset button on error
        loginBtn.textContent = "Login";
        loginBtn.disabled = false;
        
        // Show user-friendly error messages
        let errorMessage = "Login failed. Please try again.";
        
        if (error.code === "auth/invalid-credential") {
          errorMessage = "Invalid email or password.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please try again later.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email format.";
        }
        
        alert(errorMessage);
      });
  });
} else {
  console.error("LOGIN FORM NOT FOUND!"); // ✅ Critical error
}