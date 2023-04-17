export const getListings = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings`
  );
  return await res.json();
};

export const createListing = async ({title, price, seller, categoryid, contact, description, image, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        price,
        seller,
        categoryid,
        contact,
        description,
        image
      })
    }
  );

  return await res.json();
};

export const deleteListing = async ({id, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  return await res.json();
};