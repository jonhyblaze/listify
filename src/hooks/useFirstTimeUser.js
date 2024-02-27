// import { useState, useEffect } from "react";

// function getInitialValueFromLocalStorage(key, defaultValue) {
//   const storedValue = window.localStorage.getItem(key);
//   return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
// }

// function useFirstTimeUser() {
//   const [firstTimeUser, setFirstTimeUser] = useState(
//     getInitialValueFromLocalStorage("firstTimeUser", false),
//   );

//   useEffect(() => {
//     if (!getInitialValueFromLocalStorage("firstTimeUser")) {
//       // Perform onboarding logic here, e.g., display onboarding screens or show tutorial messages
//       localStorage.setItem("firstTimeUser", JSON.stringify(false));
//     }
//   }, []);

//   return { firstTimeUser, setFirstTimeUser };
// }

// export default useFirstTimeUser;
