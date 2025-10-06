const EmptyCard = ({
  img = null,
  message = 'Nothing here',
  onClick = null,
}) => {
  return (
    <div
      onClick={()=>onClick?.()}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 cursor-pointer">
      {img && (
        <img
          src={img}
          alt="Empty"
          className="w-72 md:w-96 mb-6 animate-pulse"
        />
      )}
      <p className="text-lg md:text-xl font-semibold mb-4 leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
