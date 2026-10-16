function ReviewSummary({ average = 0, total = 0, breakdown = [] }) {
  return (
    <div className="flex gap-6 rounded-xl bg-white p-5 border border-gray-300">
      <div className="flex flex-col shrink-0 items-center justify-center">
        <span className="font-serif text-2xl font-bold">{average}</span>
        <div className="my-1 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(average)
                  ? "fill-orange-700"
                  : "fill-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-gray-600">out of 5</span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        {breakdown.map(({ stars, count }) => {
          const percent = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={stars} className="flex items-center">
              <span>{stars}</span>
              <svg
                className="h-3 w-3 fill-amber-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-orange-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewCard({ name, avatar, rating, date, text }) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-5 flex flex-col gap-1">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <img
            src={avatar}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{name}</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= rating ? "fill-orange-700" : "fill-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <span>{date}</span>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default function ReviewSection({ average = 0, total = 0, breakdown = [], reviews = [] }) {
  return (
    <section className="max-w-7xl w-full mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Customer Reviews{" "}
        <span className="text-gray-500 font-semibold">{total} reviews</span>
      </h2>

      <ReviewSummary average={average} total={total} breakdown={breakdown} />

      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
}
