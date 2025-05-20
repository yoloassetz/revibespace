// components/SubmitReviewForm.tsx

export default function SubmitReviewForm() {
    return (
      <section id="submit" className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-6">Submit Your Review</h3>
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Product Name</label>
              <input type="text" className="w-full border px-4 py-2 rounded-md" />
            </div>
            <div>
              <label className="block mb-2">Upload Review (Video/Image)</label>
              <input type="file" className="w-full" />
            </div>
            <div>
              <label className="block mb-2">Your Feedback</label>
              <textarea className="w-full border px-4 py-2 rounded-md" rows={4} />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
    );
  }