function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-neutral-800 ${className}`}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
