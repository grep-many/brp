import { Star, StarHalf } from 'lucide-react';

const RatingStars = ({ rating = 0, size = 18 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        if (rating >= star) {
          // full star
          return (
            <Star
              key={star}
              size={size}
              className="text-yellow-400 fill-yellow-400"
            />
          );
        } else if (rating >= star - 0.5) {
          // half star (outlined + filled stacked)
          return (
            <div
              key={star}
              className="relative"
              style={{ width: size, height: size }}
            >
              {/* Base outline */}
              <Star
                size={size}
                className="text-muted-foreground absolute top-0 left-0"
              />
              {/* Half star fill overlay */}
              <StarHalf
                size={size}
                className="text-yellow-400 fill-yellow-400 absolute top-0 left-0"
              />
            </div>
          );
        } else {
          // empty star
          return (
            <Star key={star} size={size} className="text-muted-foreground" />
          );
        }
      })}
    </div>
  );
};

export default RatingStars;