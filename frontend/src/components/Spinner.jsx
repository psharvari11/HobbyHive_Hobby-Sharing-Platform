const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizes[size]} border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin`} />
  );
};

export default Spinner;