export function generateRandomEmail() {
    const uniqueNumber = Math.floor(Math.random() * 1000000);
    return `user_${uniqueNumber}@example.com`;
  }