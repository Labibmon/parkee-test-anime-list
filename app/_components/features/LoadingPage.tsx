const LoadingPage = () => {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 p-28">
      <div
        className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
          Loading...
        </span>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
