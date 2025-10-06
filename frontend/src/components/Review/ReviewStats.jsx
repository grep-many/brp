import { useEffect, useMemo } from 'react';
import RadialView from './Charts/RadialView';
import BarView from './Charts/BarView';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import useReview from '../../hooks/useReview';

/**
 * Props:
 * - id: bookId
 */
const ReviewStats = ({ id }) => {
  const { reviewsByBook } = useReview();
  const reviews = reviewsByBook[id] || [];

  // Count number of reviews for each rating (1-5)
  const data = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // index 0 -> 1 star, index 4 -> 5 stars

    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        counts[r.rating - 1] += 1;
      }
    });

    // Map to the format RadialView / BarView expects
    return counts
      .map((value, index) => ({
        label: `${index + 1} Star${index + 1 > 1 ? 's' : ''}`,
        value,
        color: `var(--chart-${index + 1})`,
      }))
      .reverse(); // So 5 stars appear at the top
  }, [reviews]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Stats</CardTitle>
        <CardDescription>Breakdown of ratings</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Left: Radial chart */}
          <div className="flex-1 flex justify-center md:justify-start w-full md:w-1/2">
            <RadialView data={data} />
          </div>

          {/* Right: Bar chart */}
          <div className="flex-1 w-full md:w-1/2">
            <BarView data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStats;
