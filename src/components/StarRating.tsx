import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ rating, maxStars = 5, size = 'md' }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const decimal = rating % 1;
  const hasPartialStar = decimal > 0;
  const emptyStars = maxStars - fullStars - (hasPartialStar ? 1 : 0);
  
  // Calculate percentage for partial star (more accurate than just 50%)
  const partialPercentage = Math.round(decimal * 100);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }, (_, i) => (
        <Star
          key={`full-${i}`}
          className={`${sizeClasses[size]} text-yellow-400 fill-current`}
        />
      ))}
      
      {/* Partial star */}
      {hasPartialStar && (
        <div className="relative">
          <Star
            className={`${sizeClasses[size]} text-gray-300`}
          />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${partialPercentage}%` }}>
            <Star
              className={`${sizeClasses[size]} text-yellow-400 fill-current`}
            />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${sizeClasses[size]} text-gray-300`}
        />
      ))}
    </div>
  );
};

export default StarRating;