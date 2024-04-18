export default function Activity({ activities }) {
  console.log(activities);
  return (
    <div className="bg-gray-100 p-4 text-gray-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <h2 className="text-xl font-semibold mb-4">Explore Activities</h2>
      <p className="mb-4">
        Discover the latest activities in the world of technology and
        innovation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-100 rounded-lg shadow">
            <img
              src={activity.imageUrls[1]}
              alt={activity.title}
              className="w-full h-48 object-cover rounded-t-md mb-4"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
