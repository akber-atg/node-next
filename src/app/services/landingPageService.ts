export async function getLandingPageContents() {
  const response = await fetch('/api/landingpage');

  if (!response.ok) {
    throw new Error('Failed to retrieve customers');
  }

  return response.json();
}

export async function getGoogleReviews() {
  const response = await fetch('/api/googlereviews');

  if (!response.ok) {
    throw new Error('Failed to retrieve Google reviews');
  }

  return response.json();
}