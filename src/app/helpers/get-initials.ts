export const getInitials = (name: string) => {
  const ignore = ["da", "de", "do", "das", "dos"];
  const parts = name
    .trim()
    .split(" ")
    .filter((part) => !ignore.includes(part.toLowerCase()));

  if (parts.length == 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
};
