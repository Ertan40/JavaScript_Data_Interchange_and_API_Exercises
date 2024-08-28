// This exercise demonstrates how to:

// Fetch data from an external API
// Transform that data into a different structure
// Handle nested objects
// Process dates
// Select and rename fields

// Function to fetch data from the Random User API
async function fetchRandomUsers(count = 5) {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
    return data.results;
  }

  // Function to transform user data for desired format
  function transformUserInformation(user) {
    return {
      clientId: user.login.uuid,
      name: {
        first: user.name.first,
        last: user.name.last,
        title: user.name.title
      },
      contactInfo: {
        email: user.email,
        phone: user.phone,
        cell: user.cell
      },
      address: {
        street: `${user.location.street.number} ${user.location.street.name}`,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode
      },
      dateOfBirth: new Date(user.dob.date).toISOString().split('T')[0],
      registrationDate: new Date(user.registered.date).toISOString().split('T')[0],
      profilePicture: user.picture.large
    };
  }
  
  // Main function to fetch users and transform their data
  async function getUsers(count) {
    try {
      const users = await fetchRandomUsers(count);
      const transformedUsers = users.map(transformUserInformation);
      console.log(JSON.stringify(transformedUsers, null, 2));
      return transformedUsers;
    } catch (error) {
      console.error("Error fetching or transforming user data:", error);
    }
  }
  
  // Execute the main function
  getUsers(2);