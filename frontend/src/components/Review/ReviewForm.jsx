import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ReviewForm = ({
  onSubmit,
  initialRating = 0,
  initialText = '',
  submitting = false,
  onCancel, // optional (for edit mode)
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState(initialText);

  // Ensure initial props sync when switching edit mode
  useEffect(() => {
    setRating(initialRating);
    setText(initialText);
  }, [initialRating, initialText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    onSubmit({ rating, reviewText: text });
    if (!initialRating && !initialText) {
      // Reset only if it's a new review (not editing)
      setRating(0);
      setText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded-lg bg-card shadow-sm transition"
    >
      {/* --- Rating stars --- */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRating(r)}
            onMouseEnter={() => setHoverRating(r)}
            onMouseLeave={() => setHoverRating(0)}
            className={`text-2xl transition-colors ${
              r <= (hoverRating || rating)
                ? 'text-yellow-400'
                : 'text-muted-foreground'
            }`}
            aria-label={`Rate ${r} star${r > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
        <span className="text-sm ml-2">{rating}/5</span>
      </div>

      {/* --- Textarea --- */}
      <Textarea
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="resize-none"
      />

      {/* --- Buttons --- */}
      <div className="flex justify-between items-center gap-2">
        <Button
          type="submit"
          disabled={submitting || !rating }
        >
          {submitting
            ? 'Submitting...'
            : initialRating
            ? 'Update Review'
            : 'Submit Review'}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
