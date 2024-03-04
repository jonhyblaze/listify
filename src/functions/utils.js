function generateUID() {
  // Combine timestamp with random number and base conversions
  const timestamp = Date.now().toString(36); // Base 36 for shorter string
  const randomString = Math.random().toString(36).substring(2, 15); // Substring to avoid leading zeroes
  return timestamp + randomString;
}

export { generateUID };
