export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.02em] text-white sm:text-[26px] ${className}`}>
      Markmontage
      <span className="ml-1.5 text-[0.6em] font-bold tracking-[0.08em] text-moss">BEAB</span>
    </span>
  );
}
