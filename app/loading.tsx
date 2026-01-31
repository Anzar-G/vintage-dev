export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
      <p className="text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
        Loading page…
      </p>
    </div>
  );
}
