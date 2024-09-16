import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [name, setName] = useState<string>('Eco Enthusiast');
  const [email, setEmail] = useState<string>('user@example.com');
  const [formError, setFormError] = useState<string | null>(null); // State to handle validation errors
  const [isSaved, setIsSaved] = useState<boolean>(false); // State for save confirmation

  const handleSave = () => {
    // Validate that both name and email are not empty
    if (!name || !email) {
      setFormError('Both name and email are required.');
      return;
    }

    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError(null); // Clear errors
    setIsSaved(true); // Indicate the profile has been saved

    console.log('Profile updated:', { name, email });
    // Implement save logic here, like sending data to backend or local storage
  };

  // Simple email validation function
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold">Your Profile</h1>
      </header>

      <section className="my-12">
        <form className="bg-white p-6 rounded-lg shadow-md">
          {/* Display validation error if any */}
          {formError && <p className="text-red-600 mb-4">{formError}</p>}

          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Save Changes
          </button>

          {/* Display save confirmation message if changes were saved */}
          {isSaved && <p className="text-green-600 mt-4">Profile successfully updated!</p>}
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
