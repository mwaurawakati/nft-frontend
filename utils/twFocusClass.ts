export default function twFocusClass(hasRing = false) {
    if (!hasRing) {
      return "focus:outline-none";
    }
    return "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-0";
  }
  